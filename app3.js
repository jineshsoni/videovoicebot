const speechPitch = 1.2;
const speechRate = 1.0;
const apiClient = new ApiAi.ApiAiClient({accessToken: '6b07a0d9841143c7b923a43449624bd9'});
var msg = new SpeechSynthesisUtterance('Hi, Welcome to Toshiba. How may I help you?  Are you looking for mobile devices, memory devices or hard drives?');
var recognizedText = null;
var voices=[];
msg.lang='en-US';

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

  $("#imgperson").attr('src',"person4.gif");
 // const d = new Date();
  //const s = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  //const appContent = document.querySelector(".app-content");
  //appContent.innerHTML += '<div class="d-flex justify-content-start mb-4"><div class="img_cont_msg"><img src="img/bot.jpg" class="rounded-circle user_img_msg"></div><div class="msg_cotainer">' + text + '<span class="msg_time">'+s+'</span></div></div>';
  //appContent.scrollTop = appContent.scrollHeight; // scroll to bottom

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
  msg = new SpeechSynthesisUtterance(speech);
  msg.voice = speechSynthesis.getVoices()[1];
  //msg.voiceURI =  "Microsoft David Desktop - English (United States)";
  //msg.name =  "Microsoft David Desktop - English (United States)";
  msg.lang='en-US';
  msg.rate = speechRate; 		// 0.1 to 1
  msg.pitch = speechPitch;
  msg.text = speech;
  
  addBotItem(speech);
  
  msg.addEventListener("end", function(ev) {
    //window.clearTimeout(timer);
    //startListening();
  });
  msg.addEventListener("error", function(ev) {
    //window.clearTimeout(timer);
    //startListening();
  });
  msg.lang='en-US';
  if (/webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    textSpeech(speech);
  }
  else if(isChrome())
    textSpeech(speech);
  else
    textSpeech(speech);

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

  $("#imgperson").attr('src',"person4.png");
  gotoListeningState();
  recognition.start();
}


function testy() {
  //textSpeech("Hi, Welcome to Toshiba. How may I help you?  Are you looking for mobile devices, memory devices or hard drives?");
  displayCurrentTime();

  // Initial feedback message.

  /*msg.volume=1;
  voices = speechSynthesis.getVoices();
  
  if (voices.length !== 0) {
      msg = new SpeechSynthesisUtterance("Hi, Welcome to Toshiba. How may I help you?  Are you looking for mobile devices, memory devices or hard drives?");
      msg.lang='en-US';
      msg.voice = speechSynthesis.getVoices()[1];
      msg.volume=1;
      msg.lang='en-US';
      msg.rate = speechRate;		// 0.1 to 1
      msg.pitch =  speechPitch; 		//0 to 2
      msg.lang='en-US';
      if (/webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        textSpeech("Hi, Welcome to Toshiba. How may I help you?  Are you looking for mobile devices, memory devices or hard drives?");
      }
      else if(isChrome())
        textSpeech("Hi, Welcome to Toshiba. How may I help you?  Are you looking for mobile devices, memory devices or hard drives?");
      else
        textSpeech("Hi, Welcome to Toshiba. How may I help you?  Are you looking for mobile devices, memory devices or hard drives?");
  }*/
  
  speech = "Hi, Welcome to Toshiba. How may I help you?";

  addBotItem(speech);

  var timer = window.setTimeout(function() { 
  addBotItem("Are you looking for <a id='suggest1' href='#'>mobile devices</a>, <a id='suggest3' href='#'>memory devices</a> or <a id='suggest3' href='#'>hard drives</a>?");
  }, 4000);

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
    $("#imgperson").attr('src',"person4.png");
  };

function textSpeech(speech){

  responsiveVoice.speak(speech,"UK English Male", {onend: OnFinishedPlaying});
  /*msg1 = new SpeechSynthesisUtterance(speech);
 
    var voices=[];
    var timer1 = setTimeout(function() {
      voices = speechSynthesis.getVoices();
      console.log(voices);

      if (voices.length !== 0) {
        msg1 = new SpeechSynthesisUtterance();
        msg1.lang = 'en-US';
        msg1.voice = speechSynthesis.getVoices()[1];
        speechSynthesis.speak(msg1);
        clearTimeout(timer1);
      }
    }, 200);

    //timer.start();
    //msg1.voice=voices[2];
    msg1.lang = 'en-US';
    msg1.voice = speechSynthesis.getVoices()[1];

    speechSynthesis.speak(msg1);*/
}



