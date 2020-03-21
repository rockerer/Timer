// init stuff here
let canv;
let running = false;
let started = false;
let timeStart, timeLeft;

const timeStep = 100;
let canvH = 400;
let canvW = 400;

let intervalFunction;

loadFinished = () => {
  _canv = document.getElementById('canvas');
  canv = _canv.getContext('2d');
  canvH = _canv.height;
  canvW = _canv.width;

  canv.font = "40px sans-serif";
}

/**
 * This function sets up the timer and starts it. <br>
 * The Value is directly gotten from the html-form. <br>
 * Could be better, but for now it works...
 */
function startTimer() {
  // clear all running stuff
  clear();

  // get timer value
  let getValue = parseInt(document.getElementById('time').value);
  if (isNaN(getValue)) {
    alert("Something went wrong...");
    return;
  }
  if (1 > getValue || 60 < getValue) {
    alert("Value not fitting!");
    return;
  }

  // set up timer
  timeStart = getValue;
  // timeLeft = left time in ms
  timeLeft = timeStart * 60 * 1000;
  timeStart = timeLeft;


  intervalFunction = setInterval(update, timeStep);
  started = true;
  running = true;

}

function pause() {
  if(started && running) {
    clearInterval(intervalFunction);
    running = false;
  }
}

function resume() {
  if(started && !running) {
  intervalFunction = setInterval(update, timeStep);
  running = true;
  }
}

function clear() {
  clearInterval(intervalFunction)
  running = false;
  timeLeft = undefined;
  timeStart = undefined;
}

function update() {
  // console.log(timeLeft);
  timeLeft -= (timeStep);
  if (timeLeft <= 0) {
    clearInterval(intervalFunction);
    canv.clearRect(0,0,canvW, canvH);
    alert("Fertig");
    return;
  }
  render();
}

function render() {
  // clear rect
  canv.clearRect(0, 0, canvH, canvW);


  // draw rectangle for remaining time
  let edge = canvW * (timeLeft / timeStart);
  percTime = timeLeft/timeStart;


  canv.fillStyle = "#ccdddd";
  drawPartCirc(150, (150 + percTime * 240)%360)


  g = Math.floor(255*percTime);
  gs = (g<16 ? "0"+g.toString(16) : g.toString(16));
  r = Math.floor(255*(1 - percTime));
  rs = (r<16 ? "0"+r.toString(16) : r.toString(16));
  s = "#" + rs + gs+ "00"
  canv.fillStyle = "#" + rs + gs +"00";
  drawPartCirc((150 + percTime * 240)%360, 30)

  canv.fillText(getTimeString(timeLeft/1000), canvW /2 - 50 , canvH/2)
  canv.strokeStyle="#000000";
  canv.strokeText(getTimeString(timeLeft/1000), canvW /2 - 50 , canvH/2)
}

function getTimeString(time) {
  min = Math.floor(time/60);
  if (min<10) {
    res = "0" + min.toString();
  } else {
    res = min.toString();
  }

  sec = Math.floor(time%60);
  if (sec<10) {
    res += ":0" + sec.toFixed();
  } else {
    res += ":" + sec.toFixed();
  }

  return res;
}

function drawPartCirc(beginAngle, endAngle) {
  canv.beginPath();
  canv.moveTo(
    canvW/2 - (canvW/5 * Math.cos((180 - beginAngle) / 360 * 2 * Math.PI)),
    canvH/2 + (canvH/5 * Math.sin((180 - beginAngle) / 360 * 2 * Math.PI))
  );
  canv.lineTo(
    canvW/2 - (canvW/4 * Math.cos((180-beginAngle) / 360 * 2 * Math.PI)),
    canvH/2 + (canvH/4 * Math.sin((180-beginAngle) / 360 * 2 * Math.PI))
  );
  canv.arc(canvW/2, canvH/2, canvW/4,
    (beginAngle / 360) * 2 * Math.PI,
    (endAngle / 360) * 2 * Math.PI);
  canv.lineTo(
    canvW/2 + (canvW/5 * Math.cos(endAngle / 360 * 2 * Math.PI)),
    canvH/2 + (canvH/5 * Math.sin(endAngle / 360 * 2 * Math.PI))
  );
  canv.arc(canvW/2, canvH/2, canvW/5,
    (endAngle / 360) * 2 * Math.PI,
    (beginAngle / 360) * 2 * Math.PI, true);
  canv.fill();
  canv.stroke();
}

function test() {
  canv.moveTo(canvW/2,0)
  canv.lineTo(canvW/2, canvH)
  canv.stroke();

}