const apiClient = new ApiAi.ApiAiClient({accessToken: '6b07a0d9841143c7b923a43449624bd9'});
var recognizedText = null;
var voices=[];

function isChrome() {
  var isChromium = window.chrome,
    winNav = window.navigator,
    vendorName = winNav.vendor,
    isOpera = winNav.userAgent.indexOf("OPR") > -1,
    isIEedge = winNav.userAgent.indexOf("Edge") > -1,
    isIOSChrome = winNav.userAgent.match("CriOS");

  if(isIOSChrome){
    return true;
  } else if(isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
    return true;
  } else {
    return false;
  }
}

function gotoListeningState() {
  const micListening = document.querySelector(".mic .listening");
  const micReady = document.querySelector(".mic .ready");
}

function gotoReadyState() {
  const micListening = document.querySelector(".mic .listening");
  const micReady = document.querySelector(".mic .ready");
}

function addBotItem(text) {


 // const d = new Date();
  //const s = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  //const appContent = document.querySelector(".app-content");
  //appContent.innerHTML += '<div class="d-flex justify-content-start mb-4"><div class="img_cont_msg"><img src="img/bot.jpg" class="rounded-circle user_img_msg"></div><div class="msg_cotainer">' + text + '<span class="msg_time">'+s+'</span></div></div>';
  //appContent.scrollTop = appContent.scrollHeight; // scroll to bottom

  console.log(text)
  var vid = document.getElementById("myVideo");

  if(text.includes('audio')){
    vid.src = "male-audio.mp4";
  } else {
    vid.src = "male-detail.mp4";
  }


  vid.play();

}

function addUserItem(text) {
  //const d = new Date();
  //const s = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  //const appContent = document.querySelector(".app-content");
  //appContent.innerHTML += '<div class="d-flex justify-content-end mb-4"><div class="msg_cotainer_send">' + text + '<span class="msg_time_send">'+s+'</span></div><div class="img_cont_msg"><img src="img/user.png" class="rounded-circle user_img_msg"></div></div>';
  //appContent.scrollTop = appContent.scrollHeight; // scroll to bottom
}

function displayCurrentTime() {
  //const timeContent = document.querySelector(".time-indicator-content");
  //const d = new Date();
  //const s = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  //timeContent.innerHTML = s;
}

function addError(text) {
  addBotItem(text);
  const footer = document.querySelector(".app-footer");
  footer.style.display = "none";
}

function handleResponse(serverResponse) {

  const speech = serverResponse["result"]["fulfillment"]["speech"];
  // msg = new SpeechSynthesisUtterance(speech);
  // msg.voice = speechSynthesis.getVoices()[1];
  // msg.lang='en-US';
  // msg.text = speech;
  
  addBotItem(speech);
  
  // msg.addEventListener("end", function(ev) {
  //   //window.clearTimeout(timer);
  //   //startListening();
  // });
  // msg.addEventListener("error", function(ev) {
  //   //window.clearTimeout(timer);
  //   //startListening();
  // });
  // msg.lang='en-US';


  // if (/webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
  //   textSpeech(speech);
  // }
  // else if(isChrome())
  //   textSpeech(speech);
  // else
  //   textSpeech(speech);

}
function handleError(serverError) {
  console.log("Error from api.ai server: ", serverError);
}

try
{
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.onstart = function() {
  recognizedText = null;
  };
  recognition.onresult = function(ev) {
    recognizedText = ev["results"][0][0]["transcript"];

    addUserItem(recognizedText);

    let promise = apiClient.textRequest(recognizedText);

    promise
        .then(handleResponse)
        .catch(handleError);
  };

  recognition.onerror = function(ev) {
    console.log("Speech recognition error", ev);
  };
  recognition.onend = function() {
    //gotoReadyState();
  };
} catch{
  console.log("webkitSpeechRecognition api not supported")
}

function startListening() {


  gotoListeningState();
  recognition.start();
}


function testy() {
  displayCurrentTime();
  // speech = "Hi, Welcome to Toshiba. How may I help you?";

  var vid = document.getElementById("myVideo");
  vid.src = "male-intro.mp4";
  vid.play();
  
  const startButton = document.querySelector("#micicon");
  
  $("#micicon").on('tapstart', function (e, touch) {
    $("#micicon").attr('style','border-radius: 50%;background-color:#4285f4');
    //$("#bottomText").html('Tap start');
    startListening();
  }); 

  $("#micicon").on('tapend', function (e, touch) {
    $("#micicon").attr('style','border-radius: 50%;');
    //$("#bottomText").html('Tap stop');
        recognition.stop();
  }); 

  document.addEventListener("keydown", function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key == "Escape" || evt.key == "Esc");
    } else {
        isEscape = (evt.keyCode == 27);
    }
    if (isEscape) {
        recognition.abort();
    }
  });
}

function foriPhone() {

  recognizedText = $('#userMsg').val();
  $('#userMsg').val('');
  addUserItem(recognizedText);
  
  let promise = apiClient.textRequest(recognizedText);
  
  promise
      .then(handleResponse)
      .catch(handleError);
}

function textSpeech1(speech){
  //responsiveVoice.speak(speech.text,"UK English Male");
}
var OnFinishedPlaying = function () {
   
  };

function textSpeech(speech){
  responsiveVoice.speak(speech,"UK English Male", {onend: OnFinishedPlaying});

}



