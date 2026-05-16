// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COSMIC TEXT REVEAL — p5.js
// cinematic floating typography animation
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let lines = [
  "And in the quiet night",
  "the stars forgot their names,",
  "drifting slowly through",
  "the bloodstream of the sky."
];

let letters = [];
let reveal = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  textFont('Georgia');
  textAlign(CENTER, CENTER);

  let spacingY = 90;
  let startY = height / 2 - spacingY * 1.5;

  for (let l = 0; l < lines.length; l++) {

    let line = lines[l];
    textSize(52);

    let totalW = textWidth(line);
    let startX = width / 2 - totalW / 2;

    let x = startX;

    for (let c of line) {

      let targetX = x;
      let targetY = startY + l * spacingY;

      letters.push({

        char: c,

        // destination
        tx: targetX,
        ty: targetY,

        // start as stars
        x: random(width),
        y: random(height),

        size: random(2, 6),

        alpha: 0,

        revealed: false,

        angle: random(TWO_PI),

        orbit: random(20, 120),

        noiseOffset: random(1000),

        trail: []
      });

      x += textWidth(c);
    }
  }

  background(0);
}

function draw() {

  // cinematic fade
  background(0, 20);

  drawNebula();
  drawStars();

  // reveal progressively
  if (frameCount % 2 === 0 && reveal < letters.length) {
    letters[reveal].revealed = true;
    reveal++;
  }

  for (let p of letters) {

    if (p.revealed) {

      // galaxy-like swirling motion
      let t = frameCount * 0.01;

      let swirlX = cos(t + p.angle) * p.orbit;
      let swirlY = sin(t + p.angle) * p.orbit;

      let drift =
        map(
          noise(p.noiseOffset, frameCount * 0.003),
          0,
          1,
          -20,
          20
        );

      p.x = lerp(p.x, p.tx + swirlX * 0.05 + drift, 0.035);
      p.y = lerp(p.y, p.ty + swirlY * 0.05, 0.035);

      p.size = lerp(p.size, 52, 0.03);
      p.alpha = lerp(p.alpha, 255, 0.025);

      // save trails
      p.trail.push(createVector(p.x, p.y));

      if (p.trail.length > 12) {
        p.trail.shift();
      }
    }

    drawTrail(p);
    drawLetter(p);
  }
}

function drawLetter(p) {

  push();

  translate(p.x, p.y);

  let pulse = sin(frameCount * 0.03 + p.angle) * 15;

  // glowing bloom
  drawingContext.shadowBlur = 40 + pulse;
  drawingContext.shadowColor = 'rgba(180,220,255,0.9)';

  fill(255, 255, 255, p.alpha);

  noStroke();

  textSize(p.size);

  text(p.char, 0, 0);

  pop();
}

function drawTrail(p) {

  noFill();

  beginShape();

  for (let i = 0; i < p.trail.length; i++) {

    let pos = p.trail[i];

    stroke(120, 180, 255, i * 8);

    vertex(pos.x, pos.y);
  }

  endShape();
}

function drawStars() {

  for (let i = 0; i < 120; i++) {

    let x = noise(i * 10, frameCount * 0.0002) * width;
    let y = noise(i * 20, frameCount * 0.0002) * height;

    let b = noise(i * 30, frameCount * 0.01) * 255;

    fill(255, b);
    noStroke();

    circle(x, y, random(1, 3));
  }
}

function drawNebula() {

  noStroke();

  for (let i = 0; i < 6; i++) {

    let x =
      noise(i * 100, frameCount * 0.001) * width;

    let y =
      noise(i * 200, frameCount * 0.001) * height;

    let size =
      noise(i * 300, frameCount * 0.001) * 400;

    fill(
      80 + sin(frameCount * 0.01 + i) * 40,
      120,
      255,
      14
    );

    ellipse(x, y, size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}