/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new HuySkibidiDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class HuySkibidiDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    // add properties for your dancer here:
    //..
    //..
    //..
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    // let wave = sin(frameCount * 0.05) * 10
    // // this.y = height / 4 + wave
    // this.x = map(noise(frameCount * 0.015), 0, 1, -20, 20)

    // // push()
    // translate(this.x, this.y)
    // let angle = radians(30)

  }
  display() {
    // the push and pop, along with the translate 
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    let bodyMove = map(sin(frameCount * 0.1), -1, 1, -20, 20)
    let bodyMove2 = map(noise(frameCount * 0.1), 0, 1, -10, 10)
    translate(this.x + bodyMove2, this.y + bodyMove);
    fill(255, 120, 10)
    ellipse(0, 0, 100, 200);

    for (let i = -75; i < 100; i += 25) {
      strokeWeight(4)
      line(-50, i, 50, i);
    }

    //Hat
    strokeWeight(1)
    fill(0, 255, 0)
    let hatMove = map(sin(frameCount * 0.1), -1, 1, -5, 5)
    triangle(-10, -100 + hatMove, -50, -70 + hatMove, -52, -95 + hatMove)
    triangle(10, -100 + hatMove, 50, -70 + hatMove, 52, -95 + hatMove)
    triangle(-20, -100 + hatMove, 0, -50 + hatMove, +20, -100 + hatMove)
    noStroke()
    rect(-20, -150, 40, 50 + hatMove)

    //eyes
    fill(255)
    circle(-20, -20, 20)
    circle(20, -20, 20)
    //black eyes
    fill(0)
    let toggling = map(sin(frameCount * 0.1), -1, 1, -1, 5)
    let toggling2 = map(cos(frameCount * 0.1), -1, 1, -3, 4)
    circle(-20 + toggling, -17 + toggling2, 15)
    circle(20 + toggling2, -23 + toggling, 15)

    //mouth
    strokeWeight(2)
    stroke(0)
    fill(255, 0, 0)
    let shaking = map(sin(frameCount * 0.1), -1, 1, -1, 5)
    arc(0, 1 + shaking, 35, 40, 0, PI)

    //upper leg
    stroke(255)
    strokeWeight(5)
    let danceLeg = map(sin(frameCount * 0.1), -1, 1, -50, 50)
    line(-50, -25, -125 + danceLeg, -75)
    line(50, -25, 125 + danceLeg, -75)

    //lower leg
    let danceLeg2 = map(sin(frameCount * 0.1), -1, 1, -15, 15)
    line(-35, 75, -125, 150 + danceLeg2)
    line(35, 75, 125, 150 + danceLeg2)

    // ******** //
    // ⬇️ draw your dancer from here ⬇️






    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.


    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/