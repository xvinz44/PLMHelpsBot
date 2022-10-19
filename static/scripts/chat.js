// Collapsible
var coll = document.getElementsByClassName("collapsible");
var code = 'qLs-kHwJo70.eyb_Mi-Wi4lh9q09oEt2hnb92jLMgnKSJZJHq55WVg4';
for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

    });
}
function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}
function firstBotMessage() {
    let firstMessage = "Hi! How can I help you?"
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    $("#chat-timestamp").append(time);
    $("#time").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}
async function convo(){
    var url = "https://directline.botframework.com/v3/directline/conversations";
    const response = await fetch(url, {
        method: 'POST', // or 'PUT'
        headers:{
            "Authorization": "Bearer qLs-kHwJo70.eyb_Mi-Wi4lh9q09oEt2hnb92jLMgnKSJZJHq55WVg4",
            'Content-Type': 'application/json'
        }
    });

    const json = await response.json();
    code = json.conversationId;
    console.log(json);

    
    firstBotMessage() 
    flow(json.streamUrl);
}

async function flow(url){
    let socket = new WebSocket(url);
    socket.onmessage = await function(event) {
        try{
            let resp = JSON.parse(event.data);
            console.log(resp)
            if (resp.watermark != '0'){
                let y = resp.activities[0]
                let chat = ''
                if (y.recipient) {
                    chat = '<p class="userText"><span>' + y.text + '</span></p>';
                }
                else {
                    chat = '<p class="botText"><span>' + y.text + '</span></p>';
                } 
                $("#chatbox").append(chat);
                document.getElementById("chat-bar-bottom").scrollIntoView(true);
            }
        }
        catch(err){
            let resp = event.data;
            console.log(resp);

        }
        

    };
}

convo()

// Gets the first message

//Gets the text text from the input box and processes it
async function sendToBot() {

    var mes = $("#textInput").val();
    $("#textInput").val("");
    var id = code;
    var url = "https://directline.botframework.com/v3/directline/conversations/"+id+"/activities";
    var data = {
        "locale": "en-EN",
        "type": "message",
        "from": {
            "id": "user1"
        },
        "text":  mes
    }
    console.log(id, url, mes, data);
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            "Authorization": "Bearer qLs-kHwJo70.eyb_Mi-Wi4lh9q09oEt2hnb92jLMgnKSJZJHq55WVg4",
            'Content-Type': 'application/json'
        }
    });
    
}


function sendButton() {
    
    sendToBot();
}

// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        sendToBot();
    }
});
