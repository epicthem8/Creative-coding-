// Animation variables
let armSpeedL, armSpeedR, armAmp;
let eyeSpeedL, eyeSpeedR, eyeAmp;
let hairSpeedX, hairSpeedY, hairAmp;
let baseTitleSize = 20;
let titleStep = 1;
let titleDir = 1;
let titleTick = 0;

function setup() {
  createCanvas(400, 400);
  background(220);

  armSpeedL = random(0.02, 0.07);
  armSpeedR = random(0.02, 0.09);
  armAmp = random(10, 200);

  eyeSpeedL = random(0.03, 0.08);
  eyeSpeedR = random(0.02, 0.06);
  eyeAmp = random(6, 200);

  hairSpeedX = random(0.015, 0.06);
  hairSpeedY = hairSpeedX; 
  hairAmp = random(6, 200);
}

function draw() {
  background(220);

  titleTick++;
  if (titleTick > 12) { 
    titleStep += titleDir;
    if (titleStep >= 5) titleDir = -1;
    if (titleStep <= 1) titleDir = 1;
    titleTick = 0;
  }
  textSize(baseTitleSize * titleStep);
  fill(0);
  text("Simple  Portrait", 80, 30);

  // Face 
  fill(255, 220, 180);
  ellipse(200, 200, 150, 180);

  // Eyes 
  let eyeYOffsetL = sin(frameCount * eyeSpeedL) * eyeAmp;
  let eyeYOffsetR = sin((frameCount + 40) * eyeSpeedR) * eyeAmp; // phase offset

  fill(255);
  ellipse(170, 180 + eyeYOffsetL, 30, 20);
  ellipse(230, 180 + eyeYOffsetR, 30, 20);

  // Pupils
  fill(0);
  ellipse(170, 180 + eyeYOffsetL, 10, 10);
  ellipse(230, 180 + eyeYOffsetR, 10, 10);

  // Nose 
  noStroke();
  fill(255, 200, 150);
  triangle(190, 220, 210, 220, 200, 180);

  // Mouth
  stroke(0);
  strokeWeight(2);
  line(170, 250, 230, 250);

  // Body 
  noStroke();
  fill(100, 150, 200);
  rect(150, 290, 100, 80);

  // Arms 
  stroke(0);
  let armOffsetL = sin(frameCount * armSpeedL) * armAmp;
  let armOffsetR = sin((frameCount + 60) * armSpeedR) * armAmp;
  line(150 + armOffsetL, 300, 120 + armOffsetL, 260);
  line(250 + armOffsetR, 300, 280 + armOffsetR, 260);

  // Hair 
  noStroke();
  fill(50);
  let hairOX = sin(frameCount * hairSpeedX) * hairAmp;
  let hairOY = sin(frameCount * hairSpeedY) * hairAmp; // no phase offset => diagonal motion

  triangle(125 + hairOX, 130 + hairOY, 275 + hairOX, 130 + hairOY, 200 + hairOX, 70 + hairOY);
  triangle(140 + hairOX, 130 + hairOY, 180 + hairOX, 130 + hairOY, 160 + hairOX, 90 + hairOY);
  triangle(220 + hairOX, 130 + hairOY, 260 + hairOX, 130 + hairOY, 240 + hairOX, 90 + hairOY);

  // Signature
  noStroke();
  textSize(14);
  fill(0);
  text("By: Reily Keith", 280, 380);
}