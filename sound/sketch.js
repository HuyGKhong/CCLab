let mySound;
function preload() {           //make sure file is properly downloaded
  mySound = loadSound("assets/song.mp3");
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
}

function draw() {
  background(220);
}

function mousePressed() {
  if (mySound.isPlaying() == false) {
    musound.play();
  } else {
    mySound.stop();            // .pause() to continue at the stopped point
  }
}