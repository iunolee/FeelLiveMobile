// socket connection
const socket = io.connect();
socket.on('connect', function() {
  console.log("Connected");
});

const joy = ["excited", "sensuous", "energetic", "cheerful", "creative"];
const trust = ["aware", "proud", "respected", "appreciated", "important", "faithful", "nurturing", "trusting", "loving", "intimate", "thoughtful", "content"];
const fear = ["confused", "rejected", "helpless", "submissive", "insecure", "anxious"];
const surprise = ["amazed", "astonished", "distracted"];
const sadness = ["tired", "lonely", "depressed", "ashamed", "guilty", "gloomy"];
const disgust = ["bored", "disliked", "loathsome"];
const anger = ["hurt", "hostile", "angry", "selfish", "hateful", "critical"];
const anticipation = ["curious", "interested", "expectant"];

let selectedWordPool = [];

function init() {

  // document.addEventListener('touchmove', function(event) {
  //       event = event.originalEvent || event;
  //       if (event.scale !== 1) {
  //          event.preventDefault();
  //       }
  //   }, false);
  //
  //
  // let lastTouchEnd = 0;
  //   document.addEventListener('touchend', function (event) {
  //     let now = (new Date()).getTime();
  //     if (now - lastTouchEnd <= 300) {
  //       event.preventDefault();
  //     }
  //     lastTouchEnd = now;
  //   }, false);

  for (let i = 1; i < 9; i++) {
    (function(i) {
      elem = document.getElementById("button" + i);
      elem.addEventListener(
        "click", send);
    }(i));
  }
}


function send() {
  //max 3 button can be activated
  $(this).toggleClass('active');
  $('button').prop('disabled', false);
  if ($('.active').length >= 3) {
    $('button:not(.active)').prop('disabled', true);

    setTimeout(textAppear, 500);
  }

  //send to socket
  let sendData = this.value;
  console.log("sent data is " + sendData);
  socket.emit('button', sendData);

  //store it to send text box in mobile
  if (sendData == '1') {
    let wordAndColor = {word : joy[Math.floor(Math.random() * joy.length)], color: "#F8C633"}
    selectedWordPool.push(wordAndColor);
  } else if (this.value == '2') {
    let wordAndColor = {word : trust[Math.floor(Math.random() * trust.length)], color: "#B2BB3A"}
    selectedWordPool.push(wordAndColor);
  } else if (this.value == '3') {
    let wordAndColor = {word : fear[Math.floor(Math.random() * fear.length)], color: "#0A6C43"}
    selectedWordPool.push(wordAndColor);
  } else if (this.value == '4') {
    let wordAndColor = {word : surprise[Math.floor(Math.random() * surprise.length)], color: "#06809D"}
    selectedWordPool.push(wordAndColor);
  } else if (this.value == '5') {
    let wordAndColor = {word : sadness[Math.floor(Math.random() * sadness.length)], color: "#763B7B"}
    selectedWordPool.push(wordAndColor);
  } else if (this.value == '6') {
    let wordAndColor = {word : disgust[Math.floor(Math.random() * disgust.length)], color: "#911E47"}
    selectedWordPool.push(wordAndColor);
  } else if (this.value == '7') {
    let wordAndColor = {word : anger[Math.floor(Math.random() * anger.length)], color: "#BA273A"}
    selectedWordPool.push(wordAndColor);
  } else if (this.value == '8') {
    let wordAndColor = {word : anticipation[Math.floor(Math.random() * anticipation.length)], color: "#D8612B"}
    selectedWordPool.push(wordAndColor);
  }
}

function textAppear() {
  // console.log($('.active').attr('id'));
  console.log(selectedWordPool);
  let finalWord1 = selectedWordPool[selectedWordPool.length-3].word;
  let finalWord2 = selectedWordPool[selectedWordPool.length-2].word;
  let finalWord3 = selectedWordPool[selectedWordPool.length-1].word;
  let finalWord1Color = selectedWordPool[selectedWordPool.length-3].color;
  let finalWord2Color = selectedWordPool[selectedWordPool.length-2].color;
  let finalWord3Color = selectedWordPool[selectedWordPool.length-1].color;

  // let finalWords = selectedWordPool.join();
  document.getElementById("descSection").innerHTML = "";
  document.getElementById("descSection").style.fontSize = "2.8em";
  document.getElementById("descSection").innerHTML = "<span style='color:" + finalWord1Color + "'>" + finalWord1 + "</span>" + ", "  + "<span style='color:" + finalWord2Color + "'>" + finalWord2 + "</span>" + ", " + "<span style='color:" + finalWord3Color + "'>" + finalWord3 + "</span>" + " ??";
  // selectedWordPool = [];
}


window.addEventListener('load', init);
