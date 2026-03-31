function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  background(220);

  // Title
  textSize(20);
  fill(0);
  text("Simple  Portrait", 80, 30);

  // Face 
  fill(255, 220, 180);
  ellipse(200, 200, 150, 180);

  // Eyes 
  fill(255);
  ellipse(170, 180, 30, 20);
  ellipse(230, 180, 30, 20);

 // Puples
  fill(0);
  ellipse(170, 180, 10, 10);
  ellipse(230, 180, 10, 10);

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
  line(150, 300, 120, 260);
  line(250, 300, 280, 260);

  // Hair 
  noStroke();
  fill(50);
  triangle(125, 130, 275, 130, 200, 70);
  triangle(140, 130, 180, 130, 160, 90);
  triangle(220, 130, 260, 130, 240, 90);


  // Signature
  noStroke();
  textSize(14);
  fill(0);
  text("By: Reily Keith", 280, 380);}