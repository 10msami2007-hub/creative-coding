// Alternative Realtime Clock
// Cosmic Orbit Clock
// p5.js

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
}

function draw() {

  background(10, 10, 25);

  translate(width / 2, height / 2);

  // Get realtime values
  let hr = hour();
  let mn = minute();
  let sc = second();

  // Background stars
  drawStars();

  // Clock rings
  noFill();

  strokeWeight(2);

  // Seconds Ring
  stroke(0, 200, 255);
  ellipse(0, 0, 220);

  // Minutes Ring
  stroke(255, 100, 200);
  ellipse(0, 0, 320);

  // Hours Ring
  stroke(255, 200, 0);
  ellipse(0, 0, 420);

  // Convert time to angles
  let secAngle = map(sc, 0, 60, 0, 360);
  let minAngle = map(mn, 0, 60, 0, 360);
  let hrAngle = map(hr % 12, 0, 12, 0, 360);

  // Seconds Orbit
  push();
  rotate(secAngle - 90);

  fill(0, 200, 255);
  noStroke();

  ellipse(110, 0, 20);

  pop();

  // Minutes Orbit
  push();
  rotate(minAngle - 90);

  fill(255, 100, 200);
  noStroke();

  ellipse(160, 0, 30);

  pop();

  // Hours Orbit
  push();
  rotate(hrAngle - 90);

  fill(255, 200, 0);
  noStroke();

  ellipse(210, 0, 40);

  pop();

  // Center Sun
  fill(255, 150, 0);
  noStroke();
  ellipse(0, 0, 70);

  // Digital Time Display
  fill(255);
  textAlign(CENTER);
  textSize(28);

  let displayHour = nf(hr, 2);
  let displayMin = nf(mn, 2);
  let displaySec = nf(sc, 2);

  text(
    displayHour + ":" + displayMin + ":" + displaySec,
    0,
    200
  );
}

// Star field
function drawStars() {

  for (let i = 0; i < 100; i++) {

    let x = random(-width, width);
    let y = random(-height, height);

    fill(255, random(100, 255));
    noStroke();

    ellipse(x, y, random(1, 3));
  }
}
