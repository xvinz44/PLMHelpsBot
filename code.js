
$("#chat").hide();
$("#info").hide();
$("body").append(
    "<section class='aes'></section><embed src='https://www.plm.edu.ph' class = 'plm' id = 'plm'>"
);

window.onload = function() {
    $("#chat").show();
    $('#chat-button').click();
    //animate bg here
    $("#info").show();


    convo();
    
};



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
    //let firstMessage = "Hi! How can I help you?"
    //document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    $("#chat-timestamp").append(time);
    $("#time").append(time);
    document.getElementById("userInput").scrollIntoView(false);

    // Gets the first message
}
async function convo(){
    var url = "https://directline.botframework.com/v3/directline/conversations";
    const response = await fetch(url, {
        method: 'POST', // or 'PUT'
        headers:{
            "Authorization": "Bearer ",
            'Content-Type': 'application/json'
        }
    });


    const json = await response.json();
    id = json.conversationId;
    console.log(json);

    firstBotMessage() 
    flow(json.streamUrl);

}
function bubbling(){
    var bubble = document.createElement('div');
    bubble.type = "div";
    bubble.setAttribute('class', 'chat-bubble')

    for (var x; x < 3; x++){
        var dot = document.createElement('div');
        dot.setAttribute('class', 'dot')
        bubble.appendChild(inputElement);
    }
    

}

async function flow(url){

    var typing = ' <div class="typing" id = "typing"> <div class="dot"></div> <div class="dot"></div> <div class="dot"></div> </div>';
    
    let socket = new WebSocket(url);
    $("#chatbox").append(typing);
    sendToBot('event', 'startConversation');
    
    socket.onmessage = await function(event) {

        let resp = JSON.parse(event.data);
        let y = resp.activities[0]
        
        if (y.type == 'message'){
            console.log(y)
            var chat = '';
            var attach = [chat];
            let from = '';
            if (y.recipient) {
                $('#typing').remove();
                from = "userText";
                attach[1] = typing;
                
            }
            else {
                $('#typing').remove();
                from = "botText";
                if (y.attachments.length > 0){
                    for (x in y.attachments[0].content.buttons){
                        var choice = y.attachments[0].content.buttons[x].value;
                        var inputElement = document.createElement('span');
                        inputElement.type = "span";
                        inputElement.innerText= choice;
                        inputElement.addEventListener('click', function(){
                            sendToBot('message',this.innerText);
                        });
    
                        var p = document.createElement('p');
                        p.appendChild(inputElement);
                        p.setAttribute('class', 'cards')
                        attach.push(p);
                        //$("#chatbox").append(p);
                    } 

                    if (attach.length == 1 && from == 'botText'){
                        attach[0] = '<p class="'+from+'"><span>' + y.attachments[0].content.text+'<br></span></p>';
                        
                    }
                    
                }
                document.getElementById("chat-bar-bottom").scrollIntoView(true);


            
            } 
            if (attach[0] == ''){
                attach[0] = '<p class="'+from+'"><span>' + y.text+ '<br></span></p>';
            }
            if (from == "botText" && y.text == 'Hello and Welcome'){
                var hey = "Hello, how may I help you? I can answer any questions relating to:";
                attach[0] = '<p class="'+from+'"><span>' + hey+ '<br></span></p>';
                
                var options = [
                    "Freshmen application admission and Enrollment",
                    "Courses offered",
                    "General information regarding PLM"
                ]
                options.forEach(option => {
                    var inputElement = document.createElement('span');
                    inputElement.type = "span";
                    inputElement.innerText= option;
                    inputElement.addEventListener('click', function(){
                        sendToBot('message',this.innerText);
                    });
    
                    var p = document.createElement('p');
                    p.appendChild(inputElement);
                    p.setAttribute('class', 'cards')
                    attach.push(p);
                });
                attach.push('<p class="'+from+'"><span>Or you can ask any question and I will try my best to provide an answer.<br></span></p>')
                

            }

            attach.forEach(e => {
                $("#chatbox").append(e);
                console.log(e)
            });

            document.getElementById("chat-bar-bottom").scrollIntoView(true);

        }

    };
}









//Gets the text text from the input box and processes it
async function sendToBot(type, message) {

    var url = "https://directline.botframework.com/v3/directline/conversations/"+id+"/activities";
    var data = {
        "type": type,
        "from": {
            "id": "user1"
        },
        "text":  message
    }
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            "Authorization": "Bearer ",
            'Content-Type': 'application/json'
        }
    }); 
}


function send() {
    var mes = $("#textInput").val();
    if (mes != ''){
        $("#textInput").val("");
        sendToBot('message',mes);
    }
}
function sendButton() {
    send()
}
// Press enter to send a message
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        send();
    }
});







var coll = document.getElementsByClassName("collapsible");
var id = '';
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
var coll = document.getElementsByClassName("try");
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
