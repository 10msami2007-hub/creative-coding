// City & Landscape Generator
// p5.js

let buildings = [];
let stars = [];

function setup() {
  createCanvas(1000, 600);

  generateStars();
  generateCity();
}

function draw() {

  drawSky();
  drawMoon();
  drawStarsLayer();
  drawMountains();
  drawGround();

  // Draw all buildings
  for (let b of buildings) {
    b.display();
  }
}

// ---------- SKY ----------
function drawSky() {

  for (let y = 0; y < height; y++) {

    let inter = map(y, 0, height, 0, 1);

    let c = lerpColor(
      color(10, 10, 35),
      color(70, 20, 80),
      inter
    );

    stroke(c);
    line(0, y, width, y);
  }
}

// ---------- MOON ----------
function drawMoon() {

  noStroke();

  fill(255, 240, 200);
  ellipse(820, 120, 100);

  fill(220, 220, 220, 120);
  ellipse(790, 100, 20);

  ellipse(850, 140, 15);
}

// ---------- STARS ----------
function generateStars() {

  for (let i = 0; i < 150; i++) {

    stars.push({
      x: random(width),
      y: random(height / 2),
      s: random(1, 4)
    });
  }
}

function drawStarsLayer() {

  for (let s of stars) {

    fill(255);
    noStroke();

    ellipse(s.x, s.y, s.s);
  }
}

// ---------- MOUNTAINS ----------
function drawMountains() {

  noStroke();

  fill(40, 40, 70);

  beginShape();

  vertex(0, height);

  for (let x = 0; x <= width; x += 20) {

    let y = map(
      noise(x * 0.005),
      0,
      1,
      220,
      420
    );

    vertex(x, y);
  }

  vertex(width, height);

  endShape(CLOSE);
}

// ---------- GROUND ----------
function drawGround() {

  fill(25, 80, 40);
  rect(0, 500, width, 100);
}

// ---------- CITY ----------
function generateCity() {

  let x = 0;

  while (x < width) {

    let type = floor(random(3));

    let w = random(60, 120);

    let h = random(120, 320);

    buildings.push(
      new Building(x, 500 - h, w, h, type)
    );

    x += w + random(10, 25);
  }
}

// ---------- BUILDING CLASS ----------
class Building {

  constructor(x, y, w, h, type) {

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;
  }

  display() {

    // TYPE 1 — Modern Tower
    if (this.type == 0) {

      fill(60, 80, 120);

      rect(this.x, this.y, this.w, this.h);

      this.windows();
    }

    // TYPE 2 — Apartment Block
    else if (this.type == 1) {

      fill(120, 80, 80);

      rect(this.x, this.y, this.w, this.h);

      fill(80);

      rect(
        this.x + this.w * 0.35,
        this.y + this.h * 0.75,
        this.w * 0.3,
        this.h * 0.25
      );

      this.windows();
    }

    // TYPE 3 — Skyscraper
    else {

      fill(90, 90, 140);

      rect(this.x, this.y, this.w, this.h);

      triangle(
        this.x,
        this.y,
        this.x + this.w,
        this.y,
        this.x + this.w / 2,
        this.y - 40
      );

      this.windows();
    }
  }

  windows() {

    fill(255, 220, 100);

    for (
      let wx = this.x + 10;
      wx < this.x + this.w - 10;
      wx += 20
    ) {

      for (
        let wy = this.y + 10;
        wy < this.y + this.h - 10;
        wy += 25
      ) {

        // Random lights
        if (random() > 0.3) {

          rect(wx, wy, 10, 15);
        }
      }
    }
  }
}

// ---------- CLICK TO GENERATE NEW CITY ----------
function mousePressed() {

  buildings = [];
  generateCity();
}