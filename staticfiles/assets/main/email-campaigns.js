var payload = [], count = 0;
async function table(payload){
    document.getElementById("campaigns") && new gridjs.Grid({
        columns: [{
            name: "Sr. No",
            width: "75px",
            formatter: function(e) {
                return gridjs.html('<span class="fw-semibold">' + e + "</span>")
            }
        }, {
            name: "Campaign ID",
            width: "130px",
            formatter: function(e) {
                return gridjs.html(`<a href="campaign-details.html?campaignid=${e}">` + e + "</a>")
            }
        }, {
            name: "Campaign Name",
            width: "170px"
        }, {
            name: "Sender",
            width: "180px"
        }, {
            name: "Sender Name",
            width: "170px"
        }, {
            name: "Useremail",
            width: "180px"
        }, {
            name: "Datetime",
            width: "100px"
        }, {
            name: "Count",
            width: "70px"
        }, {
            name: "Actions",
            width: "80px",
            formatter: function(e) {
                return gridjs.html(`<a href='campaign-details.html?campaignid=${e}' class='text-reset text-decoration-underline'>Details</a>`)
            }
        }],
        pagination: {
            limit: 10
        },
        sort: !0,
        search: !0,
        data: payload
    }).render(document.getElementById("campaigns"))
}

const params = new URLSearchParams(window.location.search);
const campaignid = params.get('campaignid');
async function tabledata() {
    await storage("techmark", "get");
    if(campaignid){
        document.getElementById("subject").innerHTML = cache.data["email-campaigns"][campaignid]["subject"];
        document.getElementById("from").innerHTML = cache.data["email-campaigns"][campaignid]["from"];
        document.getElementById("name").innerHTML = cache.data["email-campaigns"][campaignid]["fullname"];
        document.getElementById("user-email").innerHTML = cache.data["email-campaigns"][campaignid]["useremail"];
        document.getElementById("cc").innerHTML = cache.data["email-campaigns"][campaignid]["cc"];
        document.getElementById("bcc").innerHTML = cache.data["email-campaigns"][campaignid]["bcc"];
        document.getElementById("replyto").innerHTML = cache.data["email-campaigns"][campaignid]["replyto"];
        if(cache.data["email-credentials"][cache.data["email-campaigns"][campaignid]["from"]].domain != "@gmail.com"){
            document.getElementById("domain-name").innerHTML = cache.data["email-credentials"][cache.data["email-campaigns"][campaignid]["from"]]["data"]["domaininfo"]["whoisinfo"]["domain_name"];
            document.getElementById("created-on").innerHTML = cache.data["email-credentials"][cache.data["email-campaigns"][campaignid]["from"]]["data"]["domaininfo"]["whoisinfo"]["creation_date"];
            document.getElementById("expire-on").innerHTML = cache.data["email-credentials"][cache.data["email-campaigns"][campaignid]["from"]]["data"]["domaininfo"]["whoisinfo"]["expiration_date"];
            document.getElementById("nameservers").innerHTML = cache.data["email-credentials"][cache.data["email-campaigns"][campaignid]["from"]]["data"]["domaininfo"]["whoisinfo"]["name_servers"];
            document.getElementById("registerer").innerHTML = cache.data["email-credentials"][cache.data["email-campaigns"][campaignid]["from"]]["data"]["domaininfo"]["whoisinfo"]["registrar"];
            document.getElementById("ipaddress").innerHTML = cache.data["email-credentials"][cache.data["email-campaigns"][campaignid]["from"]]["data"]["domaininfo"]["ipinfo"]["ip"];
            document.getElementById("a").innerHTML = cache.data["email-credentials"][cache.data["email-campaigns"][campaignid]["from"]]["data"]["domaininfo"]["dnsinfo"]["A"];
            document.getElementById("mx").innerHTML = cache.data["email-credentials"][cache.data["email-campaigns"][campaignid]["from"]]["data"]["domaininfo"]["dnsinfo"]["MX"];
            document.getElementById("ns").innerHTML = cache.data["email-credentials"][cache.data["email-campaigns"][campaignid]["from"]]["data"]["domaininfo"]["dnsinfo"]["NS"];
            document.getElementById("txt").innerHTML = cache.data["email-credentials"][cache.data["email-campaigns"][campaignid]["from"]]["data"]["domaininfo"]["dnsinfo"]["TXT"];
            document.getElementById("organization").innerHTML = cache.data["email-credentials"][cache.data["email-campaigns"][campaignid]["from"]]["data"]["domaininfo"]["ipinfo"]["org"];
            document.getElementById("location").innerHTML = cache.data["email-credentials"][cache.data["email-campaigns"][campaignid]["from"]]["data"]["domaininfo"]["ipinfo"]["city"] + " " + cache.data["email-credentials"][cache.data["email-campaigns"][campaignid]["from"]]["data"]["domaininfo"]["ipinfo"]["postal"] + " " + cache.data["email-credentials"][cache.data["email-campaigns"][campaignid]["from"]]["data"]["domaininfo"]["ipinfo"]["region"] + " " + cache.data["email-credentials"][cache.data["email-campaigns"][campaignid]["from"]]["data"]["domaininfo"]["ipinfo"]["timezone"];
        }else{
            document.getElementById("dnsinfo").innerHTML = "";
            document.getElementById("ipinfo").innerHTML = "";
        }

        cache.data.campaignid = [];
        cache.data.campaignid.recipients = [];
        for (const key in cache.data["email-campaigns"][campaignid]["payload"]) {
            if ((cache.data["email-tracking"][campaignid]) && (cache.data["email-tracking"][campaignid]).hasOwnProperty(key)) {
                payload.push([++count, key, cache.data["email-campaigns"][campaignid]["payload"][key]["datetime"], cache.data["email-campaigns"][campaignid]["payload"][key]["status"], cache.data["email-tracking"][campaignid][key]["datetime"], key]);
            }else{
                payload.push([++count, key, cache.data["email-campaigns"][campaignid]["payload"][key]["datetime"], cache.data["email-campaigns"][campaignid]["payload"][key]["status"], false, key]);
            }
            if((cache.data["email-campaigns"][campaignid]["from"].split("@"))[1] != "gmail.com"){
                if(cache.data["email-campaigns"][campaignid]["payload"][key]["status"] == "PENDING" || cache.data["email-campaigns"][campaignid]["payload"][key]["status"] == "False" || cache.data["email-campaigns"][campaignid]["payload"][key]["status"] == "Error"){
                    cache.data.campaignid.recipients.push(key);
                    document.getElementById("resend_emails").style = ``;
                }
            }
        }
        document.getElementById("campaign-detail") && new gridjs.Grid({
            columns: [{
                name: "Sr. No",
                width: "80px",
                formatter: function(e) {
                    return gridjs.html('<span class="fw-semibold">' + e + "</span>")
                }
            }, {
                name: "To",
                width: "150px"
            }, {
                name: "Sent on",
                width: "140px"
            }, {
                name: "Status",
                width: "80px",
                formatter: function(e) {
                    if(e == "True"){
                        return gridjs.html(`<span class="badge bg-success">SENT</span>`)
                    }
                    if(e == "False"){
                        return gridjs.html(`<span class="badge bg-danger">FAILED</span>`)
                    }
                    if(e == "Error"){
                        return gridjs.html(`<span class="badge bg-warning">ERROR</span>`)
                    }else{
                        return gridjs.html(`<span class="badge bg-info">${e}</span>`)
                    }
                }
            }, {
                name: "Tracking",
                width: "80px",
                formatter: function(e) {
                    if(e){
                        return gridjs.html(`<span class="badge bg-success">${e}</span>`)
                    }else{
                        return gridjs.html(`<span class="badge bg-warning">Unseen</span>`)
                    }
                }
            }, {
                name: "Content",
                width: "80px",
                formatter: function(e) {
                    return gridjs.html(`<button type="button" onclick="view_email(this)" id="${e}" data-bs-toggle="modal" data-bs-target=".exampleModalFullscreen" class="btn btn-ghost-dark waves-effect waves-light">View</button>`)
                }
            }],
            pagination: {
                limit: 10
            },
            sort: !0,
            search: !0,
            data: payload
        }).render(document.getElementById("campaign-detail"))
    }else{
        for (const key in cache.data["email-campaigns"]) {
            payload.push([++count, key, cache.data["email-campaigns"][key]["subject"], cache.data["email-campaigns"][key]["from"], cache.data["email-campaigns"][key]["fullname"], cache.data["email-campaigns"][key]["useremail"], `${key.slice(0, 2)}-${key.slice(2, 4)}-${key.slice(4, 8)} ${key.slice(8, 10)}:${key.slice(10, 12)}:${key.slice(12, 14)}`,Object.keys(cache.data["email-campaigns"][key]["payload"]).length, key]);
        }
        table(payload);
    }
}

function view_email(obj){
    editor1.setHTMLCode(generate_html_template(obj.id));
}

async function refresh(){
    let headers = new Headers();
    headers.append('Origin', '*');
    await fetch("https://vtipzz6d5e.execute-api.us-east-1.amazonaws.com/techmark-aws/", {
      mode: 'cors',
      headers: headers,
      "method": "POST",
      "body": JSON.stringify({
        "service": "dynamodb",
        "method": "get",
        "table_name": "techmark-solutions",
        "primary_key": {
            "email": cache.data.email
        }
      })
    }).then(response => {
        if (!response.ok) {
          location = "auth-offline.html";
        }
        return response.json();
    }).then(data => {
        if(JSON.parse(data["body"])["error"] == "true"){
            location = "auth-500.html";
        }else{
            cache.data["email-tracking"] = JSON.parse(data.body)["data"]["email-tracking"];
        }
    }).catch(error => {
        //console.log(error)
        location = "auth-offline.html";
    });

    await storage({"techmark": "techmark", "cache": customBase64Encode(JSON.stringify(cache))}, "update");
    window.location.reload();
}


document.getElementById("resend_emails") && document.getElementById("resend_emails").addEventListener("click", function() {
    Swal.fire({
        title: "Do you want to Resend campaign?",
        showDenyButton: !1,
        showCancelButton: !0,
        confirmButtonText: "Start",
        //confirmButtonClass: "btn btn-success w-xs me-2",
        //cancelButtonClass: "btn btn-danger w-xs",
        //denyButtonClass: "btn btn-info w-xs me-2",
        buttonsStyling: !0,
        //denyButtonText: "Don't save",
        showCloseButton: !0
    }).then(function(t) {
        if(t.isConfirmed){
            if((cache.data.todaysmailsquota-cache.data.campaignid.recipients.length) <= 0){
                alert("Quota Limit Excedding");
                return
            }
            var logmodel = new bootstrap.Modal(document.querySelector('.bs-example-modal-xl1'), {
                backdrop: 'static', // Disable closing by clicking outside the modal
                keyboard: false     // Disable closing with the Esc key
            });
            logmodel.show();
            document.getElementById("retry").innerHTML = `<button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target=".bs-example-modal-xl1">SENDING LOG <i class="ri-send-plane-2-fill fs-10"></i></button>`;
            document.getElementById("log-title").innerHTML = cache.data["email-campaigns"][campaignid]["subject"];
            document.getElementById("log-from").innerHTML = cache.data["email-campaigns"][campaignid]["from"];
            document.getElementById("log-subject").innerHTML = cache.data["email-campaigns"][campaignid]["subject"];
            document.getElementById("log-name").innerHTML = cache.data["email-campaigns"][campaignid]["fullname"];
            document.getElementById("log-cc").innerHTML = cache.data["email-campaigns"][campaignid]["cc"];
            document.getElementById("log-bcc").innerHTML = cache.data["email-campaigns"][campaignid]["bcc"];
            document.getElementById("log-replyto").innerHTML = cache.data["email-campaigns"][campaignid]["replyto"];
            document.getElementById("log-status").innerHTML = "Starting Connection...";
            cache.data.todaysmailsquota = cache.data.todaysmailsquota-cache.data.campaignid.recipients.length;
            cache.data.campaignid.flag = 0;
            send_email(cache.data.campaignid.flag);
        }
    })
})

var sent = 0, failed = 0, error = 0, sendingCount = 0;
async function display_log(mail){
    sendingCount++;
    if(cache["data"]["email-campaigns"][campaignid]["payload"][mail]["status"] == "True"){
       sent++;
       document.getElementById("log-status").innerHTML = `Sent to ${mail} successfully`;
       document.getElementById("emaillog").innerHTML += 
        `<tr class="table-success">
            <td data-label="Sr No.">${sendingCount}</td>
            <td data-label="From">${cache.data["email-campaigns"][campaignid]["from"]}</td>
            <td data-label="To">${mail}</td>
            <td data-label="Datetime">${cache["data"]["email-campaigns"][campaignid]["payload"][mail]["datetime"]}</td>
            <td data-label="Status"><span class="badge bg-success">Sent</span></td>
        </tr>`;
        // progressbar
        updateProgressBars(sent, failed, error);
    }

    if(cache["data"]["email-campaigns"][campaignid]["payload"][mail]["status"] == "False"){
       failed++;
       document.getElementById("log-status").innerHTML = `Failed to send ${mail}`;
       document.getElementById("emaillog").innerHTML += 
        `<tr class="table-danger">
            <td data-label="Sr No.">${sendingCount}</td>
            <td data-label="From">${cache.data["email-campaigns"][campaignid]["from"]}</td>
            <td data-label="To">${mail}</td>
            <td data-label="Datetime">${cache["data"]["email-campaigns"][campaignid]["payload"][mail]["datetime"]}</td>
            <td data-label="Status"><span class="badge bg-danger">Failed</span></td>
        </tr>`;
        // progressbar
        updateProgressBars(sent, failed, error);
        document.getElementById("log-status").innerHTML = `Failed to send ${mail}: ${cache["data"]["email-campaigns"][campaignid]["payload"][mail]["response"]}`;
        return
    }

    if(cache["data"]["email-campaigns"][campaignid]["payload"][mail]["status"] == "Error"){
        error++;
        document.getElementById("log-status").innerHTML = `Error to send ${mail}`;
        document.getElementById("emaillog").innerHTML +=
         `<tr class="table-warning">
             <td data-label="Sr No.">${sendingCount}</td>
             <td data-label="From">${cache.data["email-campaigns"][campaignid]["from"]}</td>
             <td data-label="To">${mail}</td>
             <td data-label="Datetime">${cache["data"]["email-campaigns"][campaignid]["payload"][mail]["datetime"]}</td>
             <td data-label="Status"><span class="badge bg-warning">Error</span></td>
         </tr>`;
        // progressbar
        updateProgressBars(sent, failed, error);
     }
}

function updateProgressBars(sent, failed, error) {
    // Calculate total sum of all values
    const total = sent + failed + error;
    const inprogress = cache.data.campaignid.recipients.length - total;
    // Calculate width percentages
    const successPercentage = (sent / total) * 100;
    const inprogressPercentage = (inprogress / total) * 100;
    const failurePercentage = (failed / total) * 100;
    const errorPercentage = (error / total) * 100;

    document.getElementById("log-sent").innerHTML = `<i class="mdi text-success fs-18 align-middle me-2">${sent} Sent</i>`;
    document.getElementById("log-inprogress").innerHTML = `<i class="mdi text-info fs-18 align-middle me-2">${inprogress} In Progress</i>`;
    document.getElementById("log-failed").innerHTML = `<i class="mdi text-danger fs-18 align-middle me-2">${failed} Failed</i>`;
    document.getElementById("log-error").innerHTML = `<i class="mdi text-warning fs-18 align-middle me-2">${error} Error</i>`;
    // Update the progress bars
    document.querySelector('.progress-bar.bg-success').style.width = `${successPercentage}%`;
    document.querySelector('.progress-bar.bg-info').style.width = `${inprogressPercentage}%`;
    document.querySelector('.progress-bar.bg-danger').style.width = `${failurePercentage}%`;
    document.querySelector('.progress-bar.bg-warning').style.width = `${errorPercentage}%`;
}

async function saveemailpayload(email){
    let jsonString = JSON.stringify(cache.data["email-campaigns"][campaignid]);  
    let compressedData = pako.gzip(jsonString, { level: 9 });
    let compressedBase64 = btoa(String.fromCharCode.apply(null, compressedData));
    let headers = new Headers();
    headers.append('Origin', '*');
    await fetch("https://vtipzz6d5e.execute-api.us-east-1.amazonaws.com/techmark-aws/", {
        mode: 'cors',
        headers: headers,
        "method": "POST",
        "body": JSON.stringify({
            "service": "s3",
            "method": "put",
            "bucket_name": "techmark-email-campaigns",
            "file_content": compressedBase64,
            "object_name": `${cache["data"]["email"]}/${campaignid}/payload.txt`
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
            display_log(email);
        }
    }).catch(error => {
        //console.log(error)
        location = "auth-offline.html";
    });
    cache.data.campaignid.flag++;
    await storage({"techmark": "techmark", "cache": customBase64Encode(JSON.stringify(cache))}, "update");
    if(cache.data.campaignid.flag < cache.data.campaignid.recipients.length){
        send_email(cache.data.campaignid.flag);
    }else{
        document.getElementById("log-status").innerHTML = `Campaign Ended`;
    }
}

function generate_html_template(mail){
    var generated_template = cache.data["email-campaigns"][campaignid]["body_html"];
    Object.keys(cache.data["email-campaigns"][campaignid]["payload"][mail]["attributes"]).forEach(function(key) {
        generated_template = generated_template.replaceAll(`{{${key}}}`, cache.data["email-campaigns"][campaignid]["payload"][mail]["attributes"][key]);
    });
    return generated_template;
}

function generate_text_template(mail){
    var generated_template = cache.data["email-campaigns"][campaignid]["body_text"];
    Object.keys(cache.data["email-campaigns"][campaignid]["payload"][mail]["attributes"]).forEach(function(key) {
        generated_template = generated_template.replaceAll(`{{${key}}}`, cache.data["email-campaigns"][campaignid]["payload"][mail]["attributes"][key]);
    });
    return generated_template;
}

async function send_email(index){
    var email = cache.data.campaignid.recipients[index]
    document.getElementById("log-status").innerHTML = `Sending to ${email}`;
    let headers = new Headers();
    headers.append('Origin', '*');
    await fetch("https://y9iwqqz637.execute-api.us-east-1.amazonaws.com/techmarkemailapi/", {
      mode: 'cors',
      headers: headers,
      "method": "POST",
      "body": JSON.stringify({
        "action": "send_email",
        "name": cache.data["email-campaigns"][campaignid]["fullname"],
        "email": cache.data["email-campaigns"][campaignid]["from"],
        "useremail": cache.data["email-campaigns"][campaignid]["useremail"],
        "password": atob(cache["data"]["email-credentials"][cache.data["email-campaigns"][campaignid]["from"]]["password"]),
        "to": email,
        "cc": cache.data["email-campaigns"][campaignid]["cc"],
        "bcc": cache.data["email-campaigns"][campaignid]["bcc"],
        "replyto": cache.data["email-campaigns"][campaignid]["replyto"],
        "subject": cache.data["email-campaigns"][campaignid]["subject"],
        "body_text": generate_text_template(email),
        "body_html": generate_html_template(email),
        "smtp_server": cache.data["email-campaigns"][campaignid]["smtp_server"]
    })}).then(response => {
        if (!response.ok) {
          location = "auth-offline.html";
        }
        return response.json()
    }).then(data => {
        if(!data.error){
            if(data.body.status == 'success'){
                cache["data"]["email-campaigns"][campaignid]["payload"][email]["response"] = data.body;
                cache["data"]["email-campaigns"][campaignid]["payload"][email]["status"] = "True";
                cache["data"]["email-campaigns"][campaignid]["payload"][email]["datetime"] = datetime();
            }else{
                cache["data"]["email-campaigns"][campaignid]["payload"][email]["response"] = data.body;
                cache["data"]["email-campaigns"][campaignid]["payload"][email]["status"] = "False";
                cache["data"]["email-campaigns"][campaignid]["payload"][email]["datetime"] = datetime();
            }
        }

    }).catch(error => {
        cache["data"]["email-campaigns"][campaignid]["payload"][email]["response"] = error;
        cache["data"]["email-campaigns"][campaignid]["payload"][email]["status"] = "Error";
        cache["data"]["email-campaigns"][campaignid]["payload"][email]["datetime"] = datetime();
    });

    await saveemailpayload(email);
}

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