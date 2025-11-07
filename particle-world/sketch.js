// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 10; // Decide the initial number of particles.
let MAX_OF_PARTICLES = 150; // Decide the maximum number of particles.
let vibrations = [];

let interA

let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  let from = color(10, 49, 79); //background color
  let to = color(78, 159, 229);
  interA = lerpColor(from, to, 0.33);

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(0);
  noStroke();
  let from = color(10, 49, 79);
  let to = color(78, 159, 229);

  // consider generating particles in draw(), using Dynamic Array
  let numRects = 100;
  for (let i = 0; i < numRects; i++) {
    let inter = map(i, 0, numRects - 1, 0, 1); // blend factor from 0→1
    let c = lerpColor(to, from, inter); // top to bottom
    fill(c);
    let y = map(i, 0, numRects, 0, height);
    rect(0, y, width, height / numRects + 1);
  }
  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }

  if (mouseIsPressed) {
    particles.push(new Particle(mouseX, mouseY))
  }

  // limit the number of particles
  if (particles.length > MAX_OF_PARTICLES) {
    particles.splice(0, 1); // remove the first (oldest) particle
  }
  // delete out of range
  for (let i = particles.length - 1; i >= 0; i--) {
    let byeParticle = particles[i]
    if (byeParticle.isOutOfFrame) {
      particles.splice(i, 1)
    }
    console.log(particles)
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = random(10, 30);

    this.speedX = random(-3, 3);
    this.speedY = random(-1, -3);
  }
  // methods (functions): particle's behaviors
  update() {
    // (add) 
    this.x += this.speedX;
    this.y += this.speedY;

    this.speedX += random(-0.1, 0.1)

    this.speedY -= 0.01
  }
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    fill(238, 253, 255)
    circle(0, 0, this.dia);

    pop();
  }
  edgeDetection() {
    if (this.x > width || this.x < 0 || this.y > height || this.y < 0) {
      this.isOutOfFrame = true
    }
  }

}
