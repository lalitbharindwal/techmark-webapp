function datetime(){
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

function getid(){
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${day}${month}${year}${hours}${minutes}${seconds}`;
}

async function save_template(){
    await storage('techmark', 'get')
    document.getElementById("editor-button").innerHTML = `<button class="fs-16 btn btn-light" type="button"><i class="fs-17 bx bx-save"></i> Saving...</button>`;
    const text = editor1.getPlainText();
    const html = editor1.getHTMLCode();
    const templatename = document.getElementById("templatename").value;
    const templateid =  getid();
    const createdon = datetime();
    var condition_expression = "#useremail = :value1";
    var update_expression = "SET #emailtemplates.#templateid = :value2";
    var expression_attribute_names = {"#useremail": "email", "#emailtemplates": "email-templates" ,"#templateid": templateid};
    var expression_attribute_values = {":value1": cache.data.email, ":value2": {"template-name": templatename, "text-content": text, "html-content": html, "datetime": createdon}};
    let headers = new Headers();
    headers.append('Origin', '*');
    await fetch("https://vtipzz6d5e.execute-api.us-east-1.amazonaws.com/techmark-aws/", {
    mode: 'cors',
    headers: headers,
    "method": "POST",
    "body": JSON.stringify({
        "service": "dynamodb",
        "method": "update",
        "table_name": "techmark-solutions",
        "primary_key": {"email": cache["data"]["email"]},
        "condition_expression": condition_expression,
        "update_expression": update_expression,
        "expression_attribute_names": expression_attribute_names,
        "expression_attribute_values": expression_attribute_values
    })
    }).then(response => {
        if (!response.ok) {
            location = "auth-offline.html";
        }
        return response.json()
    }).then(data => {
        if(JSON.parse(data["body"])["error"] == "true"){
            location = "auth-500.html";
            //console.log(data)
        }else{
            document.getElementById("editor-button").innerHTML = `<button class="fs-16 btn btn-light" type="button"><i class="fs-17 bx bx-save"></i> Template Saved</button>`;
        }
    }).catch(error => {
        //console.log(error)
        location = "auth-offline.html";
    });

    cache.data["email-templates"][templateid] = {"template-name": templatename, "text-content": text, "html-content": html, "datetime": createdon};
    await storage({"techmark": "techmark", "cache": customBase64Encode(JSON.stringify(cache))}, "update");
    location = "templates.html";
}

var payload = [];
var count = 0;
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
async function tabledata() {
    await storage("techmark", "get");
    if(id){
        editor1.setHTMLCode(cache.data["email-templates"][id]["html-content"]);
        document.getElementById("templatename").value = cache.data["email-templates"][id]["template-name"]
        document.getElementById("editor-button").innerHTML = `<button class="fs-16 btn btn-light" onclick="update_template()" type="button"><i class="fs-17 bx bx-save"></i> Update</button>`;
    }else{
        for (const key in cache.data["email-templates"]) {
            payload.push([++count, key, cache.data["email-templates"][key]["template-name"], cache.data["email-templates"][key]["datetime"], key]);
        }
        await storage({"techmark": "techmark", "cache": customBase64Encode(JSON.stringify(cache))}, "update");
        table(payload);
    }
}

async function templateedit() {
    await storage("techmark", "get");
    if(id){
        editor1.setHTMLCode(cache.data["email-templates"][id]["html-content"]);
        document.getElementById("templatename").value = cache.data["email-templates"][id]["template-name"]
        document.getElementById("add-campaign").href = `add-campaign.html?templateid=${id}`;
        document.getElementById("editor-button").innerHTML = `<button class="fs-16 btn btn-light" onclick="update_template()" type="button"><i class="fs-17 bx bx-save"></i> Update</button>`;
    }
}

async function table(payload){
    document.getElementById("templates") && new gridjs.Grid({
        columns: [{
            name: "Sr. No",
            width: "75px",
            formatter: function(e) {
                return gridjs.html('<span class="fw-semibold">' + e + "</span>")
            }
        }, {
            name: "Template ID",
            width: "140px",
            formatter: function(e) {
                return gridjs.html(`<a href="template-editor.html?id=${e}">` + e + "</a>")
            }
        }, {
            name: "Template Name",
            width: "170px"
        }, {
            name: "Created On",
            width: "190px"
        }, {
            name: "Actions",
            width: "150px",
            formatter: function(e) {
                return gridjs.html(`<a href='template-editor.html?id=${e}' class='text-reset text-decoration-underline'>View</a>`)
            }
        }],
        pagination: {
            limit: 10
        },
        sort: !0,
        search: !0,
        data: payload
    }).render(document.getElementById("templates"))
}

async function update_template(){
    document.getElementById("editor-button").innerHTML = `<button class="fs-16 btn btn-light" type="button"><i class="fs-17 bx bx-save"></i> Updating...</button>`;
    const text = editor1.getPlainText();
    const html = editor1.getHTMLCode();
    const templatename = document.getElementById("templatename").value;
    const templateid =  id;
    const createdon = datetime();
    var condition_expression = "#useremail = :value1";
    var update_expression = "SET #emailtemplates.#templateid = :value2";
    var expression_attribute_names = {"#useremail": "email", "#emailtemplates": "email-templates" ,"#templateid": templateid};
    var expression_attribute_values = {":value1": cache.data.email, ":value2": {"template-name": templatename, "text-content": text, "html-content": html, "datetime": createdon}};
    let headers = new Headers();
    headers.append('Origin', '*');
    await fetch("https://vtipzz6d5e.execute-api.us-east-1.amazonaws.com/techmark-aws/", {
    mode: 'cors',
    headers: headers,
    "method": "POST",
    "body": JSON.stringify({
        "service": "dynamodb",
        "method": "update",
        "table_name": "techmark-solutions",
        "primary_key": {"email": cache["data"]["email"]},
        "condition_expression": condition_expression,
        "update_expression": update_expression,
        "expression_attribute_names": expression_attribute_names,
        "expression_attribute_values": expression_attribute_values
    })
    }).then(response => {
        if (!response.ok) {
            location = "auth-offline.html";
        }
        return response.json()
    }).then(data => {
        if(JSON.parse(data["body"])["error"] == "true"){
            location = "auth-500.html";
            //console.log(data)
        }else{
            document.getElementById("editor-button").innerHTML = `<button class="fs-16 btn btn-light" type="button"><i class="fs-17 bx bx-save"></i> Template Updated</button>`;
        }
    }).catch(error => {
        //console.log(error)
        location = "auth-offline.html";
    });

    cache.data["email-templates"][templateid] = {"template-name": templatename, "text-content": text, "html-content": html, "datetime": createdon};
    await storage({"techmark": "techmark", "cache": customBase64Encode(JSON.stringify(cache))}, "update");
    location = "templates.html";
}

async function delete_template(){
    const templateid =  id;
    document.getElementById("editor-button").innerHTML = `<button class="fs-16 btn btn-danger" type="button">Deleting...</button>`;
    var condition_expression = "#useremail = :value1";
    var update_expression = "REMOVE #emailtemplates.#templateid";
    var expression_attribute_names = {"#useremail": "email", "#emailtemplates": "email-templates" ,"#templateid": templateid};
    var expression_attribute_values = {":value1": cache.data.email};
    let headers = new Headers();
    headers.append('Origin', '*');
    await fetch("https://vtipzz6d5e.execute-api.us-east-1.amazonaws.com/techmark-aws/", {
    mode: 'cors',
    headers: headers,
    "method": "POST",
    "body": JSON.stringify({
        "service": "dynamodb",
        "method": "update",
        "table_name": "techmark-solutions",
        "primary_key": {"email": cache["data"]["email"]},
        "condition_expression": condition_expression,
        "update_expression": update_expression,
        "expression_attribute_names": expression_attribute_names,
        "expression_attribute_values": expression_attribute_values
    })
    }).then(response => {
        if (!response.ok) {
            location = "auth-offline.html";
        }
        return response.json()
    }).then(data => {
        console.log(data)
        if(JSON.parse(data["body"])["error"] == "true"){
            location = "auth-500.html";
            //console.log(data)
        }else{
            document.getElementById("editor-button").innerHTML = `<button class="fs-16 btn btn-danger" type="button"><i class="fs-17 bx bx-save"></i> Template Deleted</button>`;
        }
    }).catch(error => {
        //console.log(error)
        location = "auth-offline.html";
    });

    delete cache.data["email-templates"][templateid];
    await storage({"techmark": "techmark", "cache": customBase64Encode(JSON.stringify(cache))}, "update");
}

document.getElementById("sa-params") && document.getElementById("sa-params").addEventListener("click", function() {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        confirmButtonClass: "btn btn-primary w-xs me-2 mt-2",
        cancelButtonClass: "btn btn-danger w-xs mt-2",
        buttonsStyling: false,
        showCloseButton: true
    }).then(function(result) {
        if (result.value) {
            delete_template();
            Swal.fire({
                title: "Deleted!",
                text: "Your Template has been deleted.",
                icon: "success",
                confirmButtonClass: "btn btn-primary w-xs mt-2",
                buttonsStyling: false
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // User clicked "No, cancel!" or clicked outside the dialog
            Swal.fire({
                title: "Cancelled",
                text: "",
                icon: "error",
                confirmButtonClass: "btn btn-primary mt-2",
                buttonsStyling: false
            });
        }
    });
});


function MyTemplate(template){
    editor1.setHTMLCode(templates[template])
  }

function template_gallery(){
    var emailTemplates = ``;
    Object.keys(templates).forEach(key => {
        emailTemplates +=
        `<div class="element-item col-xxl-4 col-xl-4 col-sm-6">
            <div class="gallery-box card">
                <div class="gallery-container" onclick="MyTemplate('${key}')" id="template-image">
                    <img class="gallery-img" src="assets/images/templates/${key}/${key}.jpg" height="400" alt="" />
                    <div class="gallery-overlay">
                        <h5 class="overlay-caption">${key}</h5>
                    </div>
                </div>
            </div>
        </div>`;
    });

    document.getElementById("email-templates").innerHTML = emailTemplates;
}


const templates = {
    "template1": 
`<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <title></title>
        <style type="text/css">
            @media only screen and (min-width: 620px) {
                .u-row {
                    width: 600px !important;
                }

                .u-row .u-col {
                    vertical-align: top;
                }

                .u-row .u-col-38p67 {
                    width: 232.02px !important;
                }

                .u-row .u-col-61p33 {
                    width: 367.98px !important;
                }

                .u-row .u-col-100 {
                    width: 600px !important;
                }
            }

            @media only screen and (max-width: 620px) {
                .u-row-container {
                    max-width: 100% !important;
                    padding-left: 0px !important;
                    padding-right: 0px !important;
                }

                .u-row {
                    width: 100% !important;
                }

                .u-row .u-col {
                    display: block !important;
                    width: 100% !important;
                    min-width: 320px !important;
                    max-width: 100% !important;
                }

                .u-row .u-col > div {
                    margin: 0 auto;
                }

                .u-row .u-col img {
                    max-width: 100% !important;
                }
            }

            body {
                margin: 0;
                padding: 0;
            }

            table, tr, td {
                vertical-align: top;
                border-collapse: collapse;
            }

            p {
                margin: 0;
            }

            .ie-container table, .mso-container table {
                table-layout: fixed;
            }

            * {
                line-height: inherit;
            }

            a[x-apple-data-detectors='true'] {
                color: inherit !important;
                text-decoration: none !important;
            }

            table, td {
                color: #000000;
            }

            #u_body a {
                color: #0000ee;
                text-decoration: underline;
            }

            @media (max-width: 480px) {
                #u_content_heading_2 .v-container-padding-padding {
                    padding: 30px 20px 10px !important;
                }

                #u_content_heading_2 .v-text-align {
                    text-align: center !important;
                }

                #u_content_text_4 .v-container-padding-padding {
                    padding: 0px 20px 10px !important;
                }

                #u_content_text_4 .v-text-align {
                    text-align: center !important;
                }

                #u_content_social_1 .v-container-padding-padding {
                    padding: 10px 0px 10px 80px !important;
                }

                #u_content_heading_3 .v-container-padding-padding {
                    padding: 15px 10px 10px !important;
                }

                #u_content_heading_3 .v-text-align {
                    text-align: center !important;
                }

                #u_content_image_2 .v-container-padding-padding {
                    padding: 20px 10px !important;
                }
            }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Arvo&display=swap" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css">
    </head>
    <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ecf0f1;color: #000000">
        <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ecf0f1;width:100%" cellpadding="0" cellspacing="0">
            <tbody>
                <tr style="vertical-align: top">
                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="height: 100%;width: 100% !important;">
                                            <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:arial,helvetica,sans-serif;" align="left">
                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                    <tr>
                                                                        <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
                                                                            <img align="center" border="0" src="https://techmark.solutions/assets/images/templates/template1/images/image-6.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 600px;" width="600"/>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="background-color: #aa50ef;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                            <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 10px solid #ffffff;border-right: 10px solid #ffffff;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px 30px;font-family:arial,helvetica,sans-serif;" align="left">
                                                                <h1 class="v-text-align" style="margin: 0px; color: #ffffff; line-height: 130%; text-align: left; word-wrap: break-word; font-family: Arvo; font-size: 24px; font-weight: 400;">
                                                                    <span style="line-height: 28.6px;">
                                                                        Ready to Share<br/>Your Insights on Our Podcast?
                                                                    </span>
                                                                </h1>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 50px 10px 30px;font-family:arial,helvetica,sans-serif;" align="left">
                                                                <div class="v-text-align" style="font-family: 'Raleway',sans-serif; font-size: 14px; color: #e7e7e7; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                    <p style="line-height: 140%;">Lorem ipsum dolor sit amet, con sectetur adip iscing elit, sed do eiusmod into tempor incididunt ut labore et dolore magna aliqua.</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px 30px;font-family:arial,helvetica,sans-serif;" align="left">
                                                                <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                    <tbody>
                                                                        <tr style="vertical-align: top">
                                                                            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                                <span>&#160;</span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 50px 0px 30px;font-family:arial,helvetica,sans-serif;" align="left">
                                                                <div class="v-text-align" style="font-family: Arvo; font-size: 24px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word;">
                                                                    <p style="line-height: 140%;">Lorem ipsum </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 50px 40px 30px;font-family:arial,helvetica,sans-serif;" align="left">
                                                                <div class="v-text-align" style="font-family: 'Raleway',sans-serif; font-size: 14px; color: #e7e7e7; line-height: 170%; text-align: left; word-wrap: break-word;">
                                                                    <ul>
                                                                        <li style="line-height: 23.8px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                                                                        <li style="line-height: 23.8px;">Quis ipsum suspen disse ultrices gravida. Risus commodo viverra dolor sit amet suspen disse ultrices</li>
                                                                        <li style="line-height: 23.8px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                                                                        <li style="line-height: 23.8px;">Quis ipsum suspen disse ultrices gravida. Risus commodo viverra dolor sit amet suspen disse ultrices</li>
                                                                    </ul>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                                        <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                            <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                <table id="u_content_heading_2" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px 35px;font-family:arial,helvetica,sans-serif;" align="left">
                                                                <h1 class="v-text-align" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 22px; font-weight: 400;">
                                                                    <span data-metadata="&lt;!--(figmeta)eyJmaWxlS2V5IjoiMlBQSXNjNFd3Q2ZlU0tINFZVMlBXeiIsInBhc3RlSUQiOjk3MDc2NDM4NywiZGF0YVR5cGUiOiJzY2VuZSJ9Cg==(/figmeta)--&gt;"></span>
                                                                    <span>Thanks for the support! 😍</span>
                                                                </h1>
                                                                <!--[if mso]></td></tr></table><![endif]-->
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table id="u_content_text_4" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 60px 10px 35px;font-family:arial,helvetica,sans-serif;" align="left">
                                                                <div class="v-text-align" style="font-size: 13px; line-height: 170%; text-align: left; word-wrap: break-word;">
                                                                    <p style="line-height: 170%;">
                                                                        <span data-metadata="&lt;!--(figmeta)eyJmaWxlS2V5IjoiMlBQSXNjNFd3Q2ZlU0tINFZVMlBXeiIsInBhc3RlSUQiOjE5NDM5MjkyMjcsImRhdGFUeXBlIjoic2NlbmUifQo=(/figmeta)--&gt;" style="line-height: 22.1px;"></span>
                                                                        <span style="line-height: 22.1px;">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut laboreet. Sed ut perspiciatis unde omnis iste natus error sit.</span>
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 35px;font-family:arial,helvetica,sans-serif;" align="left">
                                                                <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #d3d3d3;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                    <tbody>
                                                                        <tr style="vertical-align: top">
                                                                            <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                                                <span>&#160;</span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <table id="u_content_social_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 10px 35px;font-family:arial,helvetica,sans-serif;" align="left">
                                                                <div align="left">
                                                                    <div style="display: table; max-width:167px;">
                                                                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <a href="" title="Facebook" target="_blank">
                                                                                            <img src="https://techmark.solutions/assets/images/templates/template1/images/image-4.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <a href="" title="LinkedIn" target="_blank">
                                                                                            <img src="https://techmark.solutions/assets/images/templates/template1/images/image-5.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <a href="" title="Instagram" target="_blank">
                                                                                            <img src="https://techmark.solutions/assets/images/templates/template1/images/image-1.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!--[if (mso)|(IE)]></td><![endif]-->
                                                                        <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                                                                        <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                                                                            <tbody>
                                                                                <tr style="vertical-align: top">
                                                                                    <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                                                                        <a href="" title="X" target="_blank">
                                                                                            <img src="https://techmark.solutions/assets/images/templates/template1/images/image-2.png" alt="X" title="X" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                                                                        </a>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="u-row-container" style="padding: 0px;background-color: transparent">
                            <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                                    <div class="u-col u-col-61p33" style="max-width: 320px;min-width: 367.98px;display: table-cell;vertical-align: top;">
                                        <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                            <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                <table id="u_content_heading_3" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:15px 10px 10px 35px;font-family:arial,helvetica,sans-serif;" align="left">
                                                                <h1 class="v-text-align" style="margin: 0px; color: #7a7a7a; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 12px; font-weight: 400;">
                                                                    <span data-metadata="&lt;!--(figmeta)eyJmaWxlS2V5IjoiMlBQSXNjNFd3Q2ZlU0tINFZVMlBXeiIsInBhc3RlSUQiOjE0NjY5NzY4OTQsImRhdGFUeXBlIjoic2NlbmUifQo=(/figmeta)--&gt;"></span>
                                                                    <span>UNSUBSCRIBE    |    PRIVACY POLICY    |    WEB</span>
                                                                </h1>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="u-col u-col-38p67" style="max-width: 320px;min-width: 232.02px;display: table-cell;vertical-align: top;">
                                        <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                            <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                                <table id="u_content_image_2" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                                                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                                    <tr>
                                                                        <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
                                                                            <img align="center" border="0" src="https://techmark.solutions/assets/images/templates/template1/images/image-3.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 166px;" width="166"/>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </body>
</html>`,

    "template2": 
`<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title></title>
    <style type="text/css">
      @media only screen and (min-width: 620px) {
        .u-row {
          width: 600px !important;
        }

        .u-row .u-col {
          vertical-align: top;
        }

        
        .u-row .u-col-100 {
            width: 600px !important;
        }
          
      }

      @media only screen and (max-width: 620px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }

        .u-row {
          width: 100% !important;
        }

        .u-row .u-col {
          display: block !important;
          width: 100% !important;
          min-width: 320px !important;
          max-width: 100% !important;
        }

        .u-row .u-col > div {
          margin: 0 auto;
        }


        .u-row .u-col img {
          max-width: 100% !important;
        }
}
    
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

@media (max-width: 480px) {
            .hide-mobile {
              
              max-height: 0px;
              overflow: hidden;
    
              display: none !important;
            }
          }

table, td { color: #000000; } #u_body a { color: #f1c40f; text-decoration: underline; } #u_content_text_5 a { color: #0000ee; } @media (max-width: 480px) { #u_row_1 .v-row-background-image--inner { background-position: 50% 15% !important; background-repeat: no-repeat !important; } #u_row_1 .v-row-background-image--outer { background-position: 50% 15% !important; background-repeat: no-repeat !important; } #u_row_1.v-row-background-image--outer { background-position: 50% 15% !important; background-repeat: no-repeat !important; } #u_content_image_1 .v-container-padding-padding { padding: 60px 10px 10px !important; } #u_content_image_1 .v-src-width { width: auto !important; } #u_content_image_1 .v-src-max-width { max-width: 90% !important; } #u_content_heading_1 .v-font-size { font-size: 26px !important; } #u_content_heading_1 .v-line-height { line-height: 120% !important; } #u_content_text_4 .v-container-padding-padding { padding: 10px 10px 0px !important; } #u_content_text_5 .v-container-padding-padding { padding: 10px 10px 40px !important; } #u_content_heading_2 .v-container-padding-padding { padding: 40px 10px 0px !important; } #u_content_text_1 .v-container-padding-padding { padding: 5px 10px 0px !important; } #u_content_button_2 .v-size-width { width: 65% !important; } #u_content_text_2 .v-container-padding-padding { padding: 40px 10px 10px !important; } #u_content_menu_1 .v-padding { padding: 5px 10px !important; } }
    </style>
<link href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@500&display=swap" rel="stylesheet" type="text/css">
</head>
<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ecf0f1;color: #000000">
  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ecf0f1;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
<div id="u_row_1" class="u-row-container v-row-background-image--outer" style="padding: 0px;background-image: url('https://techmark.solutions/assets/images/templates/template2/images/image-5.png');background-repeat: no-repeat;background-position: center top;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div class="v-row-background-image--inner" style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;">
<div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
  
<table id="u_content_image_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:100px 10px 10px;font-family:'Raleway',sans-serif;" align="left">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      <img align="center" border="0" src="https://techmark.solutions/assets/images/templates/template2/images/image-6.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 70%;max-width: 406px;" width="406" class="v-src-width v-src-max-width"/>
    </td>
  </tr>
</table>
      </td>
    </tr>
  </tbody>
</table>
<table id="u_content_heading_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 0px;font-family:'Raleway',sans-serif;" align="left">
    <h1 class="v-line-height v-font-size" style="margin: 0px; line-height: 130%; text-align: center; word-wrap: break-word; font-family: Epilogue; font-size: 30px; font-weight: 400;"><span style="line-height: 31.2px;"><span style="line-height: 31.2px;"><span style="line-height: 31.2px;"><strong>Maximize Your</strong><br /><strong>Reach with Our PR Expertise!</strong></span></span></span></h1>
      </td>
    </tr>
  </tbody>
</table>
<table id="u_content_text_4" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px 50px;font-family:'Raleway',sans-serif;" align="left">
  <div class="v-line-height v-font-size" style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="line-height: 140%;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspen disse ultrices gravida. Risus commodo viverra dolor sit amet.</p>
  </div>
      </td>
    </tr>
  </tbody>
</table>
<table id="u_content_text_5" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px 50px 40px;font-family:'Raleway',sans-serif;" align="left">
  <div class="v-line-height v-font-size" style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="line-height: 140%;"><strong><a rel="noopener" href="" target="_blank">Read More</a></strong></p>
  </div>
      </td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</div>
    </div>
  </div>
  </div>
<div class="u-row-container v-row-background-image--outer" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div class="v-row-background-image--inner" style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #7b7385;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
<div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
<table id="u_content_heading_2" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Raleway',sans-serif;" align="left">
    <h1 class="v-line-height v-font-size" style="margin: 0px; color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 22px; font-weight: 400;"><span><span><strong>Need any Help?</strong></span></span></h1>
      </td>
    </tr>
  </tbody>
</table>
<table id="u_content_text_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px 50px 10px;font-family:'Raleway',sans-serif;" align="left">
  <div class="v-line-height v-font-size" style="font-size: 14px; color: #dddfea; line-height: 140%; text-align: center; word-wrap: break-word;">
    <p style="line-height: 140%;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </div>
      </td>
    </tr>
  </tbody>
</table>
<table id="u_content_button_2" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 40px;font-family:'Raleway',sans-serif;" align="left">
  <div align="center">
  <a href="" target="_blank" class="v-button v-size-width v-font-size" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #000000; background-color: #dddfea; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:35%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
      <span class="v-line-height v-padding" style="display:block;padding:10px 20px;line-height:120%;"><span style="line-height: 16.8px;">Contact Us</span></span>
    </a>
</div>
      </td>
    </tr>
  </tbody>
</table>
</div>
</div>
</div>
  </div>
  </div>
<div class="u-row-container v-row-background-image--outer" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #9a3960;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <table id="u_content_text_2" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 80px 10px;font-family:'Raleway',sans-serif;" align="left">
        
  <div class="v-line-height v-font-size" style="font-size: 14px; color: #ffffff; line-height: 160%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;">if you have any questions, please email us at <a rel="noopener" href="" target="_blank">customer.success@techmark.solutions</a> or visit our FAQS, you can also chat with a reel live human during our operating hours. They can answer questions about your account</p>
  </div>
      </td>
    </tr>
  </tbody>
</table>
<table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 0px;font-family:'Raleway',sans-serif;" align="left">
        
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>
      </td>
    </tr>
  </tbody>
</table>
<table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Raleway',sans-serif;" align="left">
        
<div align="center">
  <div style="display: table; max-width:187px;">
 <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
      <tbody><tr style="vertical-align: top"><td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="" title="Facebook" target="_blank">
          <img src="https://techmark.solutions/assets/images/templates/template2/images/image-4.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
     <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
      <tbody><tr style="vertical-align: top"><td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="" title="LinkedIn" target="_blank">
          <img src="https://techmark.solutions/assets/images/templates/template2/images/image-2.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
   <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
      <tbody><tr style="vertical-align: top"><td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="" title="Instagram" target="_blank">
          <img src="https://techmark.solutions/assets/images/templates/template2/images/image-1.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
<table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
      <tbody><tr style="vertical-align: top"><td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="" title="X" target="_blank">
          <img src="https://techmark.solutions/assets/images/templates/template2/images/image-3.png" alt="X" title="X" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
  </div>
</div>
      </td>
    </tr>
  </tbody>
</table>
<table id="u_content_menu_1" style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Raleway',sans-serif;" align="left">
        
<div class="menu" style="text-align:center;">
    <a href="" target="_self" style="padding:5px 15px;display:inline-block;color:#ffffff;font-size:14px;text-decoration:none"  class="v-padding v-font-size">
      Home
    </a>
    <span style="padding:5px 15px;display:inline-block;color:#ffffff;font-size:14px;" class="v-padding v-font-size hide-mobile">
      |
    </span>
    <a href="" target="_self" style="padding:5px 15px;display:inline-block;color:#ffffff;font-size:14px;text-decoration:none"  class="v-padding v-font-size">
      Page
    </a>
    <span style="padding:5px 15px;display:inline-block;color:#ffffff;font-size:14px;" class="v-padding v-font-size hide-mobile">
      |
    </span>
    <a href="" target="_self" style="padding:5px 15px;display:inline-block;color:#ffffff;font-size:14px;text-decoration:none"  class="v-padding v-font-size">
      About Us
    </a>
    <span style="padding:5px 15px;display:inline-block;color:#ffffff;font-size:14px;" class="v-padding v-font-size hide-mobile">
      |
    </span>
    <a href="" target="_self" style="padding:5px 15px;display:inline-block;color:#ffffff;font-size:14px;text-decoration:none"  class="v-padding v-font-size">
      Contact US
    </a>
</div>
      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 40px;font-family:'Raleway',sans-serif;" align="left">
        
  <div class="v-line-height v-font-size" style="font-size: 14px; color: #ffffff; line-height: 160%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;">you have received this email as a registered user of <a rel="noopener" href="" target="_blank">techmark.solutions</a></p>
<p style="font-size: 14px; line-height: 160%;">can <a rel="noopener" href="" target="_blank">unsubscribe</a> from these emails here.</p>
<p style="font-size: 14px; line-height: 160%;"> </p>
<p style="font-size: 14px; line-height: 160%;">2261 Market Street #4667 San Francisco, CA 94114 All rights reserved</p>
  </div>
      </td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</div>
    </div>
  </div>
  </div>
    </td>
  </tr>
  </tbody>
  </table>
</body>
</html>`,

    "template3": 
`<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title></title>
    <style type="text/css">
      @media only screen and (min-width: 620px) {
        .u-row {
          width: 600px !important;
        }

        .u-row .u-col {
          vertical-align: top;
        }
            .u-row .u-col-36p67 {
              width: 220.02px !important;
            }

            .u-row .u-col-50 {
              width: 300px !important;
            }
          

            .u-row .u-col-63p33 {
              width: 379.98px !important;
            }
          

            .u-row .u-col-100 {
              width: 600px !important;
            }
          
      }

      @media only screen and (max-width: 620px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }

        .u-row {
          width: 100% !important;
        }

        .u-row .u-col {
          display: block !important;
          width: 100% !important;
          min-width: 320px !important;
          max-width: 100% !important;
        }

        .u-row .u-col > div {
          margin: 0 auto;
        }


        .u-row .u-col img {
          max-width: 100% !important;
        }
}
    
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

@media (max-width: 480px) {
            .hide-mobile {
              
              max-height: 0px;
              overflow: hidden;
    
              display: none !important;
            }
          }

table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } #u_content_text_14 a { color: #fbeeb8; } @media (max-width: 480px) { #u_content_image_1 .v-src-width { width: auto !important; } #u_content_image_1 .v-src-max-width { max-width: 31% !important; } #u_content_menu_1 .v-padding { padding: 0px 9px !important; } #u_content_text_1 .v-container-padding-padding { padding: 50px 10px 30px !important; } #u_content_text_1 .v-font-size { font-size: 20px !important; } #u_content_text_1 .v-line-height { line-height: 120% !important; } #u_column_8 .v-col-border { border-top: 10px solid #ffffff !important;border-left: 10px solid #ffffff !important;border-right: 10px solid #ffffff !important;border-bottom: 0px solid transparent !important; } #u_column_9 .v-col-border { border-top: 0px solid transparent !important;border-left: 10px solid #ffffff !important;border-right: 10px solid #ffffff !important;border-bottom: 1px solid #ffffff !important; } #u_content_text_11 .v-container-padding-padding { padding: 30px 10px 5px !important; } #u_content_text_11 .v-text-align { text-align: center !important; } #u_content_text_12 .v-container-padding-padding { padding: 0px 10px 10px !important; } #u_content_text_12 .v-text-align { text-align: center !important; } #u_content_text_13 .v-container-padding-padding { padding: 10px 10px 40px !important; } #u_content_text_13 .v-text-align { text-align: center !important; } #u_column_6 .v-col-border { border-top: 0px solid transparent !important;border-left: 10px solid #ffffff !important;border-right: 10px solid #ffffff !important;border-bottom: 0px solid transparent !important; } #u_content_text_8 .v-container-padding-padding { padding: 40px 10px 5px !important; } #u_content_text_8 .v-text-align { text-align: center !important; } #u_content_text_9 .v-container-padding-padding { padding: 0px 10px 10px !important; } #u_content_text_9 .v-text-align { text-align: center !important; } #u_content_text_10 .v-container-padding-padding { padding: 10px 10px 30px !important; } #u_content_text_10 .v-text-align { text-align: center !important; } #u_column_7 .v-col-border { border-top: 0px solid transparent !important;border-left: 10px solid #ffffff !important;border-right: 10px solid #ffffff !important;border-bottom: 1px solid #ffffff !important; } #u_column_4 .v-col-border { border-top: 0px solid transparent !important;border-left: 10px solid #ffffff !important;border-right: 10px solid #ffffff !important;border-bottom: 0px solid transparent !important; } #u_column_5 .v-col-border { border-top: 0px solid transparent !important;border-left: 10px solid #ffffff !important;border-right: 10px solid #ffffff !important;border-bottom: 10px solid #ffffff !important; } #u_content_text_5 .v-container-padding-padding { padding: 30px 10px 5px !important; } #u_content_text_5 .v-text-align { text-align: center !important; } #u_content_text_6 .v-container-padding-padding { padding: 0px 10px 10px !important; } #u_content_text_6 .v-text-align { text-align: center !important; } #u_content_text_7 .v-container-padding-padding { padding: 10px 10px 40px !important; } #u_content_text_7 .v-text-align { text-align: center !important; } #u_content_heading_1 .v-container-padding-padding { padding: 40px 10px 10px !important; } #u_content_heading_1 .v-text-align { text-align: center !important; } #u_content_text_14 .v-container-padding-padding { padding: 10px 40px 0px !important; } #u_content_text_14 .v-text-align { text-align: center !important; } #u_content_social_1 .v-container-padding-padding { padding: 30px 0px 20px 75px !important; } #u_content_text_15 .v-container-padding-padding { padding: 10px 0px !important; } #u_content_text_15 .v-font-size { font-size: 13px !important; } #u_content_text_15 .v-text-align { text-align: center !important; } #u_content_image_7 .v-container-padding-padding { padding: 20px 0px !important; } #u_content_image_7 .v-src-width { width: auto !important; } #u_content_image_7 .v-src-max-width { max-width: 49% !important; } #u_content_image_7 .v-text-align { text-align: center !important; } }
    </style>
<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css2?family=Arvo&display=swap" rel="stylesheet" type="text/css">
</head>
<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #8dd7c8;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  
<table id="u_content_image_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 15px;font-family:arial,helvetica,sans-serif;" align="left">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
      <img align="center" border="0" src="https://techmark.solutions/assets/images/templates/template3/images/image-1.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 16%;max-width: 92.8px;" width="92.8" class="v-src-width v-src-max-width"/>
    </td>
  </tr>
</table>
      </td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</div>
    </div>
  </div>
  </div>
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #8dd7c8;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 1px solid #000000;border-left: 1px solid #000000;border-right: 1px solid #000000;border-bottom: 1px solid #000000;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table id="u_content_menu_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
<div class="menu" style="text-align:center;">
    <a href="" target="_self" style="padding:10px 23px 10px 24px;display:inline-block;color:#000000;font-family:'Montserrat',sans-serif;font-size:12px;text-decoration:none"  class="v-padding v-font-size">
      Home
    </a>
    <span style="padding:10px 23px 10px 24px;display:inline-block;color:#000000;font-family:'Montserrat',sans-serif;font-size:12px;" class="v-padding v-font-size hide-mobile">
      |
    </span>
    <a href="" target="_self" style="padding:10px 23px 10px 24px;display:inline-block;color:#000000;font-family:'Montserrat',sans-serif;font-size:12px;text-decoration:none"  class="v-padding v-font-size">
      Page
    </a>
    <span style="padding:10px 23px 10px 24px;display:inline-block;color:#000000;font-family:'Montserrat',sans-serif;font-size:12px;" class="v-padding v-font-size hide-mobile">
      |
    </span>
    <a href="" target="_self" style="padding:10px 23px 10px 24px;display:inline-block;color:#000000;font-family:'Montserrat',sans-serif;font-size:12px;text-decoration:none"  class="v-padding v-font-size">
      About Us
    </a>
    <span style="padding:10px 23px 10px 24px;display:inline-block;color:#000000;font-family:'Montserrat',sans-serif;font-size:12px;" class="v-padding v-font-size hide-mobile">
      |
    </span>
    <a href="" target="_self" style="padding:10px 23px 10px 24px;display:inline-block;color:#000000;font-family:'Montserrat',sans-serif;font-size:12px;text-decoration:none"  class="v-padding v-font-size">
      Contact Us
    </a>
</div>
      </td>
    </tr>
  </tbody>
</table></div>
  </div>
</div>
    </div>
  </div>
  </div>
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #8dd7c8;height: 100%;width: 100% !important;">
  <div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
<table id="u_content_text_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:61px 10px 30px;font-family:arial,helvetica,sans-serif;" align="left">
  <div class="v-text-align v-line-height v-font-size" style="font-family: Arvo; font-size: 34px; line-height: 140%; text-align: center; word-wrap: break-word;">
  </div>
      </td>
    </tr>
  </tbody>
</table>
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:arial,helvetica,sans-serif;" align="left">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
      <img align="center" border="0" src="https://techmark.solutions/assets/images/templates/template3/images/image-2.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 519px;" width="519" class="v-src-width v-src-max-width"/>
    </td>
  </tr>
</table>
      </td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</div>
    </div>
  </div>
  </div>
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
<div id="u_column_8" class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="background-color: #ffb886;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 10px solid #ffffff;border-left: 10px solid #ffffff;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:51px 50px 50px;font-family:arial,helvetica,sans-serif;" align="left">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="left">
      <img align="left" border="0" src="https://techmark.solutions/assets/images/templates/template3/images/image-4.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 200px;" width="200" class="v-src-width v-src-max-width"/>
    </td>
  </tr>
</table>
      </td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</div>
<div id="u_column_9" class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="background-color: #e7e7e7;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 10px solid #ffffff;border-left: 0px solid transparent;border-right: 10px solid #ffffff;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  
<table id="u_content_text_11" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:61px 10px 5px 30px;font-family:arial,helvetica,sans-serif;" align="left">
  <div class="v-text-align v-line-height v-font-size" style="font-family: Arvo; font-size: 20px; color: #000000; line-height: 140%; text-align: left; word-wrap: break-word;">
  </div>
      </td>
    </tr>
  </tbody>
</table>
<table id="u_content_text_12" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px 30px;font-family:arial,helvetica,sans-serif;" align="left">
  <div class="v-text-align v-line-height v-font-size" style="font-size: 14px; color: #000000; line-height: 140%; text-align: left; word-wrap: break-word;">
  </div>
      </td>
    </tr>
  </tbody>
</table>
<table id="u_content_text_13" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 50px 30px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div class="v-text-align v-line-height v-font-size" style="font-size: 14px; color: #000000; line-height: 140%; text-align: left; word-wrap: break-word;">
  </div>
      </td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</div>
    </div>
  </div>
  </div>
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
<div id="u_column_6" class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="background-color: #e7e7e7;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 10px solid #ffffff;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  
<table id="u_content_text_8" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:81px 10px 5px 30px;font-family:arial,helvetica,sans-serif;" align="left">
  <div class="v-text-align v-line-height v-font-size" style="font-family: Arvo; font-size: 20px; color: #000000; line-height: 140%; text-align: left; word-wrap: break-word;">
  </div>
      </td>
    </tr>
  </tbody>
</table>
<table id="u_content_text_9" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px 30px;font-family:arial,helvetica,sans-serif;" align="left">
  <div class="v-text-align v-line-height v-font-size" style="font-size: 14px; color: #000000; line-height: 140%; text-align: left; word-wrap: break-word;">
  </div>
      </td>
    </tr>
  </tbody>
</table>
<table id="u_content_text_10" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 50px 30px;font-family:arial,helvetica,sans-serif;" align="left">
  <div class="v-text-align v-line-height v-font-size" style="font-size: 14px; color: #000000; line-height: 140%; text-align: left; word-wrap: break-word;">
  </div>
      </td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</div>
<div id="u_column_7" class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="background-color: #b7db95;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 10px solid #ffffff;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:51px 50px 50px;font-family:arial,helvetica,sans-serif;" align="left">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="left">
      <img align="left" border="0" src="https://techmark.solutions/assets/images/templates/template3/images/image-3.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 200px;" width="200" class="v-src-width v-src-max-width"/>
    </td>
  </tr>
</table>
      </td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</div>
    </div>
  </div>
  </div>
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
<div id="u_column_4" class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="background-color: #341050;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 10px solid #ffffff;border-right: 0px solid transparent;border-bottom: 10px solid #ffffff;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:51px 50px 50px;font-family:arial,helvetica,sans-serif;" align="left">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="left">
      <img align="left" border="0" src="https://techmark.solutions/assets/images/templates/template3/images/image-8.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 200px;" width="200" class="v-src-width v-src-max-width"/>
    </td>
  </tr>
</table>
      </td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</div>
<div id="u_column_5" class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
  <div style="background-color: #e7e7e7;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 10px solid #ffffff;border-bottom: 10px solid #ffffff;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
<table id="u_content_text_5" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:71px 10px 5px 30px;font-family:arial,helvetica,sans-serif;" align="left">
  <div class="v-text-align v-line-height v-font-size" style="font-family: Arvo; font-size: 20px; color: #000000; line-height: 140%; text-align: left; word-wrap: break-word;">
  </div>
      </td>
    </tr>
  </tbody>
</table>
<table id="u_content_text_6" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px 30px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div class="v-text-align v-line-height v-font-size" style="font-size: 14px; color: #000000; line-height: 140%; text-align: left; word-wrap: break-word;">
  </div>
      </td>
    </tr>
  </tbody>
</table>
<table id="u_content_text_7" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 50px 30px;font-family:arial,helvetica,sans-serif;" align="left">
  <div class="v-text-align v-line-height v-font-size" style="font-size: 14px; color: #000000; line-height: 140%; text-align: left; word-wrap: break-word;">
  </div>

      </td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</div>
    </div>
  </div>
  </div>
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #000000;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
<table id="u_content_heading_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px 40px;font-family:arial,helvetica,sans-serif;" align="left">
      </td>
    </tr>
  </tbody>
</table>

<table id="u_content_text_14" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px 25px 40px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div class="v-text-align v-line-height v-font-size" style="font-size: 14px; color: #b8b8b8; line-height: 170%; text-align: left; word-wrap: break-word;">
<p style="line-height: 170%;"><span style="line-height: 23.8px;"><br />Please reach out to us if you have any thoughts, praise, or custom project to <a href="">techmark.solutions</a>. We’d love to hear from you!</span></p>
  </div>
      </td>
    </tr>
  </tbody>
</table>
<table id="u_content_social_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 20px 40px;font-family:arial,helvetica,sans-serif;" align="left">
<div align="left">
  <div style="display: table; max-width:167px;">
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="" title="Facebook" target="_blank">
          <img src="https://techmark.solutions/assets/images/templates/template3/images/image-5.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="" title="LinkedIn" target="_blank">
          <img src="https://techmark.solutions/assets/images/templates/template3/images/image-10.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="" title="Instagram" target="_blank">
          <img src="https://techmark.solutions/assets/images/templates/template3/images/image-7.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
      <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="" title="X" target="_blank">
          <img src="https://techmark.solutions/assets/images/templates/template3/images/image-6.png" alt="X" title="X" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
  </div>
</div>
      </td>
    </tr>
  </tbody>
</table>
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px;font-family:arial,helvetica,sans-serif;" align="left">
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="92%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>
      </td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</div>
    </div>
  </div>
  </div>
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
<div class="u-col u-col-63p33" style="max-width: 320px;min-width: 379.98px;display: table-cell;vertical-align: top;">
  <div style="background-color: #000000;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
<table id="u_content_text_15" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 20px 30px;font-family:arial,helvetica,sans-serif;" align="left">
  <div class="v-text-align v-line-height v-font-size" style="font-size: 14px; color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 140%;">UNSUBSCRIBE   |   PRIVACY POLICY   |   WEB</p>
  </div>
      </td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</div>
<div class="u-col u-col-36p67" style="max-width: 320px;min-width: 220.02px;display: table-cell;vertical-align: top;">
  <div style="background-color: #000000;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <div class="v-col-border" style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
<table id="u_content_image_7" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:15px 40px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="right">
      <img align="right" border="0" src="https://techmark.solutions/assets/images/templates/template3/images/image-9.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 92%;max-width: 156.42px;" width="156.42" class="v-src-width v-src-max-width"/>
    </td>
  </tr>
</table>
      </td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</div>
    </div>
  </div>
  </div>
    </td>
  </tr>
  </tbody>
  </table>
</body>
</html>`,

"template4":
`<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title></title>
    <style type="text/css">
      @media only screen and (min-width: 620px) {
        .u-row {
          width: 600px !important;
        }

        .u-row .u-col {
          vertical-align: top;
        }

        
            .u-row .u-col-100 {
              width: 600px !important;
            }
          
      }

      @media only screen and (max-width: 620px) {
        .u-row-container {
          max-width: 100% !important;
          padding-left: 0px !important;
          padding-right: 0px !important;
        }

        .u-row {
          width: 100% !important;
        }

        .u-row .u-col {
          display: block !important;
          width: 100% !important;
          min-width: 320px !important;
          max-width: 100% !important;
        }

        .u-row .u-col > div {
          margin: 0 auto;
        }


        .u-row .u-col img {
          max-width: 100% !important;
        }

}
    
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_image_3 .v-container-padding-padding { padding: 40px 0px 0px !important; } #u_content_image_3 .v-src-width { width: auto !important; } #u_content_image_3 .v-src-max-width { max-width: 100% !important; } #u_content_heading_6 .v-container-padding-padding { padding: 20px 10px 40px !important; } #u_content_heading_6 .v-font-size { font-size: 20px !important; } #u_content_text_deprecated_7 .v-container-padding-padding { padding: 30px 10px 10px !important; } #u_content_text_deprecated_8 .v-container-padding-padding { padding: 10px 10px 30px !important; } #u_content_social_4 .v-container-padding-padding { padding: 30px 10px 10px !important; } #u_content_text_deprecated_9 .v-container-padding-padding { padding: 10px 10px 20px !important; } #u_content_image_5 .v-container-padding-padding { padding: 20px 10px 30px !important; } }
    </style>
<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css">
</head>
<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f8f8fc;color: #000000">
  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f8f8fc;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #dde7fe;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
<div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
<table id="u_content_image_3" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:25px 0px 0px;font-family:'Open Sans',sans-serif;" align="left">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      <img align="center" border="0" src="https://techmark.solutions/assets/images/templates/template4/images/image-6.png" alt="Hero Image" title="Hero Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 600px;" width="600" class="v-src-width v-src-max-width"/>
    </td>
  </tr>
</table>
      </td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</div>
    </div>
  </div>
  </div>
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #bdd1f9;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  
<table id="u_content_heading_6" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px 50px;font-family:'Open Sans',sans-serif;" align="left">
    <h1 class="v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-size: 22px; font-weight: 400;"><strong>Absence from Work Without<br />Proper Notification</strong></h1>

      </td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</div>
    </div>
  </div>
  </div>
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
<table id="u_content_text_deprecated_7" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:50px 50px 0px;font-family:'Open Sans',sans-serif;" align="left">
  <div class="v-font-size" style="font-size: 14px; line-height: 140%; text-align: justify; word-wrap: break-word;">
    <p style="line-height: 140%; font-size: 14px;"><span style="font-family: 'Open Sans', sans-serif; font-size: 16px; line-height: 22.4px;"><strong>20 Feb, 2023</strong></span></p>
<p style="line-height: 140%; font-size: 14px;"> </p>
<p style="line-height: 140%; font-size: 14px;"><span style="font-family: 'Open Sans', sans-serif; font-size: 16px; line-height: 22.4px;"><strong>Dear [Name of Employee]</strong></span></p>
<p style="line-height: 140%; font-size: 14px;"> </p>
<p style="line-height: 140%; font-size: 14px;"><span style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 19.6px;">Nam sodales sed nisi in posuere. Nulla sed nibh tincidunt, placerat nisl vel, tristique est. In vel facilisis massa. In tempus commodo sagittis. Fusce a felis at tellus pulvinar lacinia. </span></p>
<p style="line-height: 140%; font-size: 14px;"> </p>
<p style="line-height: 140%; font-size: 14px;"><span style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 19.6px;">Vivamus placerat tortor molestie, porttitor ex sit amet, rutrum mi. Suspendisse ultrices viverra tristique. Morbi gravida quam quis massa pulvinar, id dictum lectus pellentesque. Donec sit amet auctor dolor.</span></p>
<p style="line-height: 140%; font-size: 14px;"> </p>
<p style="line-height: 140%; font-size: 14px;"><span style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 19.6px;">Efficitur facilisis lorem. Sed tempor nisl ac risus viverra, et scelerisque erat sagittis viverra tristique.</span></p>
  </div>
      </td>
    </tr>
  </tbody>
</table>
<table id="u_content_text_deprecated_8" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px 50px 50px;font-family:'Open Sans',sans-serif;" align="left">
  <div class="v-font-size" style="font-size: 14px; line-height: 160%; text-align: left; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 160%;">Regards,</p>
<p style="font-size: 14px; line-height: 160%;"> </p>
<p style="font-size: 14px; line-height: 160%;"><strong>Dave Helmuth</strong></p>
<p style="font-size: 14px; line-height: 160%;">HR.</p>
  </div>
      </td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</div>
    </div>
  </div>
  </div>
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  
<table id="u_content_social_4" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:50px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
<div align="center">
  <div style="display: table; max-width:167px;">
    <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
      <tbody><tr style="vertical-align: top"><td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="" title="Facebook" target="_blank">
          <img src="https://techmark.solutions/assets/images/templates/template4/images/image-1.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
      <tbody><tr style="vertical-align: top"><td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="" title="Twitter" target="_blank">
          <img src="https://techmark.solutions/assets/images/templates/template4/images/image-4.png" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
      <tbody><tr style="vertical-align: top"><td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="" title="LinkedIn" target="_blank">
          <img src="https://techmark.solutions/assets/images/templates/template4/images/image-2.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
    <table align="center" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
      <tbody><tr style="vertical-align: top"><td align="center" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
        <a href="" title="Instagram" target="_blank">
          <img src="https://techmark.solutions/assets/images/templates/template4/images/image-3.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
        </a>
      </td></tr>
    </tbody></table>
  </div>
</div>
      </td>
    </tr>
  </tbody>
</table>
<table id="u_content_text_deprecated_9" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 100px 20px;font-family:'Open Sans',sans-serif;" align="left">
  <div class="v-font-size" style="font-size: 14px; line-height: 170%; text-align: center; word-wrap: break-word;">
    <p style="font-size: 14px; line-height: 170%;">UNSUBSCRIBE   |   PRIVACY POLICY   |   WEB</p>
<p style="font-size: 14px; line-height: 170%;"> </p>
<p style="font-size: 14px; line-height: 170%;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
  </div>
      </td>
    </tr>
  </tbody>
</table>
<table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Open Sans',sans-serif;" align="left">
  <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
    <tbody>
      <tr style="vertical-align: top">
        <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
          <span>&#160;</span>
        </td>
      </tr>
    </tbody>
  </table>
      </td>
    </tr>
  </tbody>
</table>
<table id="u_content_image_5" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 50px;font-family:'Open Sans',sans-serif;" align="left">
<table width="100%" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="padding-right: 0px;padding-left: 0px;" align="center">
      <img align="center" border="0" src="https://techmark.solutions/assets/images/templates/template4/images/image-5.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 149px;" width="149" class="v-src-width v-src-max-width"/>
    </td>
  </tr>
</table>
      </td>
    </tr>
  </tbody>
</table>
</div>
  </div>
</div>
    </div>
  </div>
  </div>
    </td>
  </tr>
  </tbody>
  </table>
</body>
</html>`
}

try{
  template_gallery()
}catch{
  
}
