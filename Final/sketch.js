//planet
let p = []
let d = 30

plants = ["🪐", "🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘", "🌙", "🌚", "🌝", "🌜", "🌛", "☀️", "🌞", "⭐", "🌟", "🌠", "🌌", "🚀", "🛰️", "🛸"]

//"🌍",

let earthCLicked = false;


function preload() {
  img = loadImage('Star.jpg');
}

function setup() {
  let canvas = createCanvas(900, 500);
  canvas.parent("p5-canvas-container");
  for (let y = 0; y < height; y += d) {
    for (let x = 0; x < width; x += d) {
      p.push(new Planet(x, y, d))

    }
  }
}

function draw() {

  if (!earthCLicked) {
    background(220);
    image(img, 0, 0, 900, 500)

    for (let i = 0; i < p.length; i++) {
      p[i].display()
      p[i].update()
    }
  }

  else {

  }
}

class Planet {
  constructor(x, y, s) {
    this.x = x
    this.y = y
    this.s = s

    this.accX = 0;
    this.accY = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.away = 0.3; //change this to make it go further
    this.ranPlant = plants[floor(random(23))]
    this.sizePlant = random(5, 40)

  }
  display() {
    push()
    translate(this.s / 2, this.s / 2)
    translate(this.x, this.y)
    let randomPlanets = floor(random(24))
    textSize(this.sizePlant)
    text(this.ranPlant, 0, 0)
    pop()
  }
  update() {
    let distance = dist(mouseX, mouseY, this.x, this.y);

    if (distance < d) { //radius of the circle

      this.accX = (mouseX - this.x) * -this.away;
      this.accY = (mouseY - this.y) * -this.away;
      this.speedX += this.accX;
      this.speedY += this.accY;
    }
    this.speedX = this.speedX * 0.9; // 10% less per frame
    this.speedY = this.speedY * 0.9; // 10% less per frame

    this.x += this.speedX;
    this.y += this.speedY;
  }
}

