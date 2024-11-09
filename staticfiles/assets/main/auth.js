var payload;
if (!window.indexedDB) {
    alert("Sorry! Your browser does not support Techmark");
    location = "auth-500.html";
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

function sendOTP(){
    var content = "Dear "+ payload["fullname"] +",\n\nYour OTP is "+ payload["code"] +"\nDo not share it with anyone by any means.\nCode is only valid for 5 minutes\n\nRegards,\nTechMark Team"
    fetch('https://5v7v92mmsd.execute-api.us-east-1.amazonaws.com/techmark-notifications',
    {
        method: "POST",
        body: JSON.stringify({
            "name": payload["fullname"],
            "to": payload["email"],
            "subject": "Verify your Email for TechMark",
            "content": content
        })
    }).catch(error => {
        //handle error
        location = "auth-offline.html";
    });
}

function resendOTP(){
    payload["code"] = generateOTP();
    var content = "Dear "+ payload["fullname"] +",\n\nYour OTP is "+ payload["code"] +"\nDo not share it with anyone by any means.\nCode is only valid for 5 minutes\n\nRegards,\nTechMark Team"
    fetch('https://5v7v92mmsd.execute-api.us-east-1.amazonaws.com/techmark-notifications',
    {
        method: "POST",
        body: JSON.stringify({
            "name": payload["fullname"],
            "to": payload["email"],
            "subject": "Verify your Email for TechMark",
            "content": content
        })
    }).then(response => {
        alert("OTP resent on "+ payload["email"])
    }).catch(error => {
        //handle error
        location = "auth-offline.html";
    });
}

function generateOTP() {
    var string = '0123456789'; 
    let OTP = '';
    var len = string.length; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += string[Math.floor(Math.random() * len)]; 
    } 
    return OTP; 
}

function verify(code){
    if(code==payload["code"]){
        const data1 = {
            "email": payload["email"],
            "userdata": {
                "fullname": payload["fullname"],
                "password": btoa(payload["password"]),
                "created": datetime(),
                "plans": {
                    "current-plan": {
                        "plan": "free",
                        "start": "",
                        "end": ""
                    },
                    "history": {}
                }
            },
            "email-credentials": {},
            "email-templates": {},
            "email-tracking": {}
        }

        put_data("techmark-solutions", data1);
    }else{
        document.getElementById("alert").innerHTML = "Incorrect OTP";
    }
}

function put_data(table_name, items){
    let headers = new Headers();
    headers.append('Origin', '*');
    fetch("https://vtipzz6d5e.execute-api.us-east-1.amazonaws.com/techmark-aws/", {
      mode: 'cors',
      headers: headers,
      "method": "POST",
      "body": JSON.stringify({
        "service": "dynamodb",
        "method": "put",
        "table_name": table_name,
        "items": items
      })
    }).then(response => {
        if (!response.ok) {
          location = "auth-offline.html";
        }
        return response.json()
    }).then(data => {
        if(JSON.parse(data["body"])["error"] == "true"){
            location = "auth-500.html";
        }else{
            location = "auth-success.html";
        }
    }).catch(error => {
        location = "auth-offline.html";
    });
}

async function signup(){
    payload = {
        "email": document.getElementById("email").value,
        "fullname": document.getElementById("fullname").value,
        "password": document.getElementById("password").value,
        "code": generateOTP()
    };
    document.getElementById("verification-email").innerHTML = payload["email"];
    var myModal = new bootstrap.Modal(document.querySelector('.bs-example-modal-center'), {
        backdrop: 'static', // Disable closing by clicking outside the modal
        keyboard: false     // Disable closing with the Esc key
    });
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
              "email": document.getElementById("email").value
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
            if(JSON.parse(data["body"])["data"] == null){
                myModal.show();
                sendOTP();
            }else{
                alert("User Already Exists");
            }
        }
    }).catch(error => {
          //console.log(error)
          location = "auth-offline.html";
    });
}

let db;
// Open (or create) the database
function openDatabase() {
    return new Promise((resolve, reject) => {
        const dbName = "techmark";
        const dbVersion = 1;
        const request = indexedDB.open(dbName, dbVersion);
        request.onerror = function(event) {
            //console.error("Database error: " + event.target.errorCode);
            location = "auth-500.html";
            reject(event.target.errorCode);
        };

        request.onsuccess = function(event) {
            db = event.target.result;
            //console.log("Database opened successfully");
            resolve();
        };

        request.onupgradeneeded = function(event) {
            db = event.target.result;
            const objectStore = db.createObjectStore("techmark", { keyPath: "techmark", autoIncrement: true });
            //console.log("Object store created");
        };
    });
}

function addData(data) {
    const transaction = db.transaction(["techmark"], "readwrite");
    const objectStore = transaction.objectStore("techmark");
    const request = objectStore.add(data);
    request.onsuccess = function(event) {
        location = "dashboard.html";
    };

    request.onerror = function(event) {
        //console.error("Error adding data: " + event.target.errorCode);
        location = "auth-500.html";
    };
}

function getData(id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["techmark"], "readonly");
        const objectStore = transaction.objectStore("techmark");
        const request = objectStore.get(id);
        request.onsuccess = function(event) {
            const result = event.target.result;
            //console.log("Data retrieved successfully:", result);
            resolve(result);
        };

        request.onerror = function(event) {
            //console.error("Error retrieving data: " + event.target.errorCode);
            location = "auth-500.html";
            reject(event.target.errorCode);
        };
    });
}

function deleteData(data) {
    const transaction = db.transaction(["techmark"], "readwrite");
    const objectStore = transaction.objectStore("techmark");
    const request = objectStore.delete(data);
    request.onsuccess = function(event) {
        //location = "logout.html";
    };

    request.onerror = function(event) {
        //console.error(`Error deleting data with email ${email}: ${event.target.errorCode}`);
        location = "auth-500.html";
    };
}

// Open the database and then add/retrieve data
async function storage(data, method) {
    try {
        if(method == "put"){
            document.getElementById("alert").innerHTML = "Login Successfully";
            await openDatabase();
            addData(data);
        }else if(method == "get"){
            await openDatabase();
            const retrievedData = await getData(data);
            if(retrievedData != undefined){
                location = "dashboard.html";
            }
        }else if(method == "delete"){
            await openDatabase();
            deleteData(data)
        }
    } catch (error) {
        //console.error("Error in main function:", error);
        location = "auth-500.html";
    }
}

var cache;
async function get_email_campaign(object){
    document.getElementById("alert").innerHTML = "Please wait...";
    for(var i=0;i<object.length;i++){
        var key = (object[i]["Key"]).split("/");
        if(key[0] == cache["data"]["email"]){
            let headers = new Headers();
            headers.append('Origin', '*');
            await fetch("https://vtipzz6d5e.execute-api.us-east-1.amazonaws.com/techmark-aws/", {
                mode: 'cors',
                headers: headers,
                "method": "POST",
                "body": JSON.stringify({
                    "service": "s3",
                    "method": "get",
                    "bucket_name": "techmark-email-campaigns",
                    "object_name": `${cache["data"]["email"]}/${key[1]}/payload.txt`
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
                    var object = JSON.parse(data.body.toString('utf-8'));
                    object = JSON.parse(object.data.file_content);
                    // Decode base64 to binary
                    let binaryString = atob(object);
                    // Convert binary string to Uint8Array
                    let uint8Array = new Uint8Array(binaryString.length);
                    for (let i = 0; i < binaryString.length; i++) {
                        uint8Array[i] = binaryString.charCodeAt(i);
                    }
                    // Decompress using pako.js
                    let decompressedData = pako.inflate(uint8Array, { to: 'string' });
                    // Parse JSON data
                    let jsonData = JSON.parse(decompressedData);
                    cache.data["email-campaigns"][key[1]] = jsonData;
                }
            }).catch(error => {
                //console.log(error)
                location = "auth-offline.html";
            });
        }
    }
    storage({"techmark": "techmark", "cache": btoa(unescape(encodeURIComponent(JSON.stringify(cache))))}, "put");
}

async function getbuckets(data) {
    cache = data;
    cache.data["email-campaigns"] = {};
    document.getElementById("alert").innerHTML = "Authenticating...";
    let headers = new Headers();
    headers.append('Origin', '*');
    await fetch("https://vtipzz6d5e.execute-api.us-east-1.amazonaws.com/techmark-aws/", {
    mode: 'cors',
    headers: headers,
    "method": "POST",
    "body": JSON.stringify({
        "service": "s3",
        "method": "list",
        "bucket_name": "techmark-email-campaigns"
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
            var object = JSON.parse(data.body)["data"];
            get_email_campaign(object)
        }
    }).catch(error => {
        //console.log(error)
        location = "auth-offline.html";
    });
}

async function login(){
    let headers = new Headers();
    headers.append('Origin', '*');
    document.getElementById("alert").innerHTML = "Loading Application...";
    await fetch("https://vtipzz6d5e.execute-api.us-east-1.amazonaws.com/techmark-aws/", {
      mode: 'cors',
      headers: headers,
      "method": "POST",
      "body": JSON.stringify({
        "service": "dynamodb",
        "method": "get",
        "table_name": "techmark-solutions",
        "primary_key": {
            "email": document.getElementById("email").value
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
            if(JSON.parse(data["body"])["data"] == null){
                document.getElementById("alert").innerHTML = "User Not Found";
            }else{
                if(atob(JSON.parse(data["body"])["data"]["userdata"]["password"]) == document.getElementById("password").value){
                    sessionStorage.setItem("login", "true");
                    getbuckets(JSON.parse(data.body))
                }else{
                    document.getElementById("alert").innerHTML = "Incorrect Password";
                }
            }
        }
    }).catch(error => {
        //console.log(error)
        location = "auth-offline.html";
    });
}