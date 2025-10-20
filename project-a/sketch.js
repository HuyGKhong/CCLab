let xPos = 400;
let yPos = 250;
let homeX = 100;
let homeY = 450;

let toggle = true;
let toggle2 = false

let foodPosi = [];    
let currentFood = null;

let chaseSpeed = 3;            // chasing
let eatRadius = 8;             // distance eat


let xoff = 0;             
let yoff = 1000; 

let scaleFactor = 1;      
let growRate = 0.0005; 

let r = 255
let g = 255
let b = 255

function setup() {
  createCanvas(800, 500);
  

  for (let i = 0; i < 100; i++) {
    let x = random(10, width - 10);
    let y = random(10, height - 10);
    foodPosi.push({ x, y });
  }

  mousePressed(); 
  keyPressed()
}

function draw() {
  
  
  if (toggle == true){
  background(27, 202, 246);
    drawFood()
    drawSun(100, 50)
  }
    else{
      background(27, 50, 246);
      drawFood()
      drawMoon(100, 50)
    }
  
  
  scaleFactor += growRate;
  
    // movement
  if (toggle) {
    if (currentFood == null && toggle2 == false) {
    let noiseX = noise(xoff) * width;
    let noiseY = noise(yoff) * height;
    xPos = lerp(xPos, noiseX, 0.02);
    yPos = lerp(yPos, noiseY, 0.02);
    xoff += 0.007;
    yoff += 0.007;
  }
    

  if (currentFood == null && foodPosi.length > 0 && toggle2 == true) {
    let closestIndex = 0;
    let minDist = dist(xPos, yPos, foodPosi[0].x, foodPosi[0].y);
    for (let i = 1; i < foodPosi.length; i++) {
      let d = dist(xPos, yPos, foodPosi[i].x, foodPosi[i].y);
      if (d < minDist) {
        minDist = d;        //linear sorting for the min
        closestIndex = i;
      }
    }
    currentFood = closestIndex;
  }

    
    // lock in and go to food
    if (currentFood !== null && foodPosi[currentFood]) {
      let f = foodPosi[currentFood];

      let dx = f.x - xPos;
      let dy = f.y - yPos;          //taking value to cal dsitane
      let d = sqrt(dx * dx + dy * dy);

      if (d > 0.001) {
        let step = min(chaseSpeed, d);
        xPos += (dx / d) * step;    //unit vec
        yPos += (dy / d) * step;
      }
      
      // after eat
      if (d <= eatRadius) {
        foodPosi.splice(currentFood, 1); // remove food
        currentFood = null;                   // initialize
        scaleFactor += 0.1;                       // grow biger
        
        r = random(255)
        g = random(255)                            // color change
        b = random(255)
      }
    }

  } else {
    // go home
    xPos = lerp(xPos, homeX, 0.02);
    yPos = lerp(yPos, homeY, 0.02);
    currentFood = null; // initialize
  }
  
  drawCreature(xPos, yPos);
  drawHabitat(100,450) 
}

function drawCreature(bodyX, bodyY) {
  push();
  translate(bodyX, bodyY);
  fill(r,g,b);
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

  let swimMotion = sin(frameCount * 0.1) * 3 * scaleFactor;

  let distanceToHome = dist(xPos, yPos, 100, 450);
  if (distanceToHome < 10) {
    swimMotion = 0;
  }

  line(0, 10 * scaleFactor, -2 * scaleFactor + swimMotion, 12 * scaleFactor);
  line(10 * scaleFactor, 10 * scaleFactor, 12 * scaleFactor - swimMotion, 12 * scaleFactor);
  line(0, 0, -2 * scaleFactor + swimMotion, -2 * scaleFactor);
  line(10 * scaleFactor, 0, 12 * scaleFactor - swimMotion, -2 * scaleFactor);

  pop();
}
function drawTail(tailX, tailY) {
  push();
  fill(r-70, g-70, b-70);
  translate(tailX, tailY);

  let tailVibrate = sin(frameCount * 0.2) * 0.2;

  let distanceToHome = dist(xPos, yPos, 100, 450);
  if (distanceToHome < 10) {
    tailVibrate = 0;
  }

  rotate(tailVibrate);
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

  let h = map(sin(frameCount * 0.05), -1, 1, 0.2 * scaleFactor, 2 * scaleFactor);

  ellipse(-2 * scaleFactor, 4 * scaleFactor, 2 * scaleFactor, h);  
  ellipse(2 * scaleFactor, 4 * scaleFactor, 2 * scaleFactor, h); 
  pop();
}


function mousePressed() {
  toggle = !toggle;
  if (!toggle) {               
    homeX = 100;
    homeY = 450;
    currentFood = null; // go home no seek food initialize
  }
}

function keyPressed() {
  if (key === ' ') {
    toggle2 = !toggle2;
  }
}

function drawHabitat(x, y) {
  push();
  translate(x, y);
  noStroke();
  fill(117, 47, 0, 200); // dark brown with opacity
  circle(0, 0, 120);   
  circle(60, 20, 100);  
  circle(-60, 20, 100); 
  circle(20, -20, 100); 
  circle(-20, -20, 100);
  pop();
}

function drawMoon(x, y) {
  push();
  translate(x, y);
  noStroke();

  fill(200); 
  circle(0, 0, 150);

  fill(180); 
  circle(-30, -15, 22.5); 
  circle(22.5, -30, 15); 
  circle(-15, 30, 12);   
  circle(30, 15, 9);    
  pop();
}

function drawSun(x, y) {
  push();
  translate(x, y);
  noStroke();

  fill("yellow");
  circle(0, 0, 150);

  fill("white");
  for (let i = 0; i < 6; i++) {
    push();
    rotate((TWO_PI / 6) * i);
    triangle(
      50 * 1.5, -10 * 1.5,
      80 * 1.5, 0,
      50 * 1.5, 10 * 1.5
    );
    pop();
  }
  pop();
}

function drawFood(){
  fill("orange");
  for (let i = 0; i < foodPosi.length; i++) {
    circle(foodPosi[i].x, foodPosi[i].y, 6);
  }
  
  
  push()
  fill(255)
  textFont("Raleway")
  textSize(15)
  text("Current Size: " + scaleFactor.toFixed(2), 650, 475)
  pop()
}