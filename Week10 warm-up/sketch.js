balls = []
let song, song2;
let interacted = false

function preload() {
  song = loadSound("assets/sounds/song.mp3")
  song2 = loadSound("assets/sounds/kick.mp3")
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  balls[0] = new Ball(width / 2, height / 2)
}

function mousePressed() {
  if (!interacted) {
    song.play()
    interacted = true         //so long plays only once
  } else {
    balls.push(new Ball(mouseX, mouseY))
    song2.play()
  }
}

function keyPressed() {
  balls.push(new Ball(mouseX, mouseY))
}

function draw() {
  background(0);
  textSize(24)


  if (interacted) {
    for (i = 0; i < balls.length; i++) {
      balls[i].display()
      balls[i].update()
    }

    text("number of balls: " + balls.length, 40, 40)
  } else {
    textAlign(CENTER)
    fill(255)
    text("click me to interact!", width / 2, height / 2)
  }

  for (let i = balls.length - 1; i >= 0; i--) {
    let b = balls[i]
    if (b.isDone) {
      balls.splice(i, 1)
    }
  }

}

class Ball {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.xSpeed = random(1, 3);
    this.ySpeed = random(-1, 1);
    this.size = random(20, 50)
    this.co = color(255, 56, 67)
    this.isDone = false
  }
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.checkEdges()
    this.checkMouse();
  }

  checkEdges() {
    if (this.x > width || this.x < 0) {
      this.xSpeed = -this.xSpeed
    }
    if (this.y > height || this.y < 0) {
      this.ySpeed = -this.ySpeed
    }
  }

  checkMouse() {
    let d = dist(mouseX, mouseY, this.x, this.y)
    if (d < this.size / 2) {
      //mouse is in
      if (mouseIsPressed) {
        this.isDone = true
      }
      this.co = color(255, 255, 0)
    } else {
      this.co = color(255)
    }
  }

  checkCollision(other) {
    let d = dist(other.x, other.y, this.x, this.y)
    if (d < this.size / 2 + other.size / 2) {
      // collide with other ball
      this.col = color(0, 0, 255)

    }
  }

  display() {
    push();
    translate(this.x, this.y);
    fill(this.co);
    noStroke();
    circle(0, 0, this.size)
    pop();
  }
}
