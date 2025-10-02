
let leaves = [];
let leafImg = [];
let flying = false;
let bdisplay = false;
let but;
var f;
function mousePressed() {
  flying = true;
  setTimeout(stop, 6000);
}

function stop(){
  flying = false;
  bdisplay= true;
}

function preload() {
  but = loadImage("but.png");
  f= loadFont("assets/FuturaBTforDyson-BkIt.otf")
  for (let i = 0; i < 8; i++) {
    var img = loadImage("assets/" + i + ".png"); 
    leafImg.push(img);
  }
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "+1");
  imageMode(CENTER);

  for (let i = 0; i < 100; i++) {
    leaves.push(
      new Leaf(random(width), random(height), leafImg[int(random(7))])
    );
  }
  textFont(f);
  var element = document.getElementById("m");
  element.classList.remove("hide");
}

function draw() {
  clear();
  for (let leaf of leaves) {
    leaf.update();
    leaf.show();
  }

  if (!flying && !bdisplay) {
    drawB();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Leaf {
  constructor(x, y, img) {
    this.pos = createVector(x, y);
    this.angle = random(TWO_PI);
    this.spin = random(-0.01, 0.01);
    this.offset = random(TWO_PI);
    this.speed = 0.9 + random(0.5);
    this.img = img;
  }

  update() {
    if (flying) {
      let dir = p5.Vector.sub(this.pos, createVector(width / 2, height / 2));
      dir.normalize();
      dir.mult(this.speed);
      let perp = createVector(-dir.y, dir.x);
      perp.mult(sin(frameCount * 0.05 + this.offset) * 2);
      this.pos.add(dir);
      this.pos.add(perp);
      this.angle += this.spin;
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    image(this.img, 0, 0);
    pop();
  }
}

function drawB() {
  fill(0, 100);
  rectMode(CENTER);
  stroke("#white");
  push();
    drawingContext.filter = 'blur(1px)';
  rect(width / 2, height / 2, 320, 200, 20);
  pop();
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(
    "Pulsa para descubrir todos los detalles",
    width / 2,
    height / 2 - 50, 180,150
  );
  but.resize(0, 100);
  image(but,width / 2, height / 2 + 30);
}

  
  
