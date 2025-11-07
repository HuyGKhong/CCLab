let scale = []
let clouds = []

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  for (let i = 0; i < 10; i++) {
    clouds.push(new Cloud(random(width), random(height), random(60, 120)))
  }

}

function draw() {
  background(150, 125, 255);

  for (let i = 0; i < clouds.length; i++) {
    clouds[i].display()
  }
  console.log(clouds)
}

function mousePressed() {
  clouds.push(new Cloud(mouseX, mouseY, random(40, 100)))
}

class Cloud {
  constructor(cloudX, cloudY, scale) {
    this.x = cloudX
    this.y = cloudY
    this.s = scale
  }

  display() {
    push()
    translate(this.x, this.y)
    rotate(frameCount * 0.05)
    noStroke()
    fill(200, 220, 150)
    circle(0, 0, this.s)

    for (let a = 0; a < 2 * PI; a += PI / 4) {
      push();
      rotate(a);
      circle(this.s * 0.4, this.s * 0.1, this.s * 0.5);
      pop();
    }

    // blushes
    noStroke()
    fill(255, 10, 255, 100)
    ellipse(0 - this.s / 4, 0 + this.s / 20, this.s / 8, this.s / 10)
    ellipse(0 + this.s / 4, 0 + this.s / 20, this.s / 8, this.s / 10)

    // eyes
    noStroke();
    fill(0);
    circle(0 - this.s / 5, 0, this.s / 10);
    circle(0 + this.s / 5, 0, this.s / 10);

    stroke(0)
    noFill()
    strokeWeight(this.s / 20)
    arc(0, 0 + this.s / 10, this.s / 5, this.s / 10, 0, PI)
    pop()

  }
}