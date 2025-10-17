/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/
let xPos = 400;
let yPos = 250;
let targetX = 100;
let targetY = 450;

let toggle = false;

let foodPositions = [];    
let currentFoodIndex = null;

let chaseSpeed = 3;            // chasing
let eatRadius = 8;             // distance eat
let pickChance = 0.01; 

let xoff = 0;             
let yoff = 1000; 

let scaleFactor = 1;      
let growRate = 0.0005; 

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  for (let i = 0; i < 100; i++) {
    let x = random(10, width - 10);
    let y = random(10, height - 10);
    foodPositions.push({ x, y });
  }

  mousePressed(); 
}

function draw() {
  
  if (toggle == true){
  background(27, 202, 246);
    drawFood()
    drawSun(100, 50, 1.5)
  }
    else{
      background(27, 50, 246);
      drawFood()
      drawMoon(100, 50, 1.5)
    }
  
  
  scaleFactor += growRate;
  
  drawHabitat(100,450,2) 
  
    // movement
  if (toggle) {
    let noiseX = noise(xoff) * width;
    let noiseY = noise(yoff) * height;
    xPos = lerp(xPos, noiseX, 0.02);
    yPos = lerp(yPos, noiseY, 0.02);
    xoff += 0.005;
    yoff += 0.005;

    // occational pick food
    if (currentFoodIndex === null && random(1) < pickChance && foodPositions.length > 0) {
      currentFoodIndex = floor(random(foodPositions.length));
    }

    // locked in food
    if (currentFoodIndex !== null && foodPositions[currentFoodIndex]) {
      let f = foodPositions[currentFoodIndex];

      // getting the distance
      let dx = f.x - xPos;
      let dy = f.y - yPos;
      let d = sqrt(dx * dx + dy * dy);

      if (d > 0.001) {
        let step = min(chaseSpeed, d);
        xPos += (dx / d) * step;        //unit vector math @@
        yPos += (dy / d) * step;
      }

      // After ate actions
      if (d <= eatRadius) {
        foodPositions.splice(currentFoodIndex, 1); // remove food
        currentFoodIndex = null;                   // no target
        scaleFactor += 0.02;                       // grow biger
      }
    }

  } else {
    // go home
    xPos = lerp(xPos, targetX, 0.02);
    yPos = lerp(yPos, targetY, 0.02);
    currentFoodIndex = null; // safety: stop chasing when returning home
  }

  drawCreature(xPos, yPos);
}

function drawCreature(bodyX, bodyY) {
  push();
  translate(bodyX, bodyY);
  fill(250);
  ellipse(0, 0, 10 * scaleFactor, 20 * scaleFactor);
  pop();

  drawLegs(bodyX - 5 * scaleFactor, bodyY - 5 * scaleFactor);    
  drawTail(bodyX, bodyY + 10 * scaleFactor);    
  drawBeak(bodyX, bodyY - 10 * scaleFactor);
  drawEyes(bodyX, bodyY - 7 * scaleFactor, scaleFactor);
}

function drawLegs(legX, legY) {
  push();
  strokeWeight(2);
  translate(legX, legY);
  line(0, 10 * scaleFactor, -2 * scaleFactor, 12 * scaleFactor);
  line(10 * scaleFactor, 10 * scaleFactor, 12 * scaleFactor, 12 * scaleFactor);
  line(0, 0, -2 * scaleFactor, -2 * scaleFactor);
  line(10 * scaleFactor, 0, 12 * scaleFactor, -2 * scaleFactor);
  pop();
}

function drawTail(tailX, tailY) {
  push();
  fill(250);
  translate(tailX, tailY);
  triangle(0, 0, -3 * scaleFactor, 5 * scaleFactor, 3 * scaleFactor, 5 * scaleFactor);
  pop();
}

function drawBeak(beakX, beakY) {
  push();
  translate(beakX, beakY);
  beginShape();
  fill("orange");
  arc(0, 0, 5 * scaleFactor, 10 * scaleFactor, 0, PI);
  arc(0, 0, 5 * scaleFactor, 7 * scaleFactor, PI, 2 * PI);
  endShape();
  pop();
}

function drawEyes(eyeX, eyeY) {
  push();
  translate(eyeX, eyeY);
  fill(0);
  noStroke();
  ellipse(-2 * scaleFactor, 4 * scaleFactor, 2 * scaleFactor, 2 * scaleFactor);  
  ellipse(2 * scaleFactor, 4 * scaleFactor, 2 * scaleFactor, 2 * scaleFactor); 
  pop();
}

function mousePressed() {
  toggle = !toggle;
  if (!toggle) {               
    targetX = 100;
    targetY = 450;
    currentFoodIndex = null; // go home no seek food
  }
}

function drawHabitat(x, y,s) {
  push();
  translate(x, y);
  noStroke();
  fill(117, 47, 0, 200); // dark brown with opacity
  scale(s)
  ellipse(0, 0, 60, 60);
  ellipse(30, 10, 50, 50);
  ellipse(-30, 10, 50, 50);
  ellipse(10, -10, 50, 50);
  ellipse(-10, -10, 50, 50);
  pop();
}

function drawMoon(x, y, s) {
  push();
  translate(x, y);
  scale(s);
  noStroke();

  fill(200); // big cirlce
  ellipse(0, 0, 100, 100);

  fill(180); // small circle
  ellipse(-20, -10, 15, 15);
  ellipse(15, -20, 10, 10);
  ellipse(-10, 20, 8, 8);
  ellipse(20, 10, 6, 6);

  pop();
}

function drawSun(x, y, s) {
  push();
  translate(x, y);
  scale(s);
  noStroke();

  fill("yellow");
  ellipse(0, 0, 100, 100); // sun 

  fill("white");
  for (let i = 0; i < 6; i++) {
    rotate(TWO_PI / 6); // 360° / 6
    triangle(50, -10, 80, 0, 50, 10); // simple triangle ray
  }

  pop();
}

function drawFood(){
  fill("orange");
  for (let i = 0; i < foodPositions.length; i++) {
    circle(foodPositions[i].x, foodPositions[i].y, 6);
  }
}

