// Player position
var characterX = 200;
var characterY = 350;

// Key codes
var w = 87; 
var s = 83;
var a = 65;
var d = 68;

// Moving obstacles
var obstacles = [];

// Mouse obstacle
var mouseShapeX = -100;
var mouseShapeY = -100;

// Exit area
var exitX = 400;
var exitY = 550;
var exitWidth = 80;
var exitHeight = 40;

function setup() {
    createCanvas(500, 600);

    // Create multiple obstacles
    for (let i = 0; i < 3; i++) {
        obstacles.push({
            x: random(width),
            y: random(height),
            size: random(20, 60),
            color: color(random(255), random(255), random(255)),
            speedX: random(1, 6),
            speedY: random(1, 6)
        });
    }
}

function draw() {
    background(120,45,78);

    // Draw exit
    fill(0,255,0);
    rect(exitX, exitY, exitWidth, exitHeight);

    // Draw player
    fill(255);
    circle(characterX, characterY, 25);

    // Move player with keyboard
    if (keyIsDown(w)) {
        characterY -= 3;
    } else if (keyIsDown(s)) {
        characterY += 3;
    }

    if (keyIsDown(a)) {
        characterX -= 3;
    } else if (keyIsDown(d)) {
        characterX += 3;
    }

    // Move and draw obstacles
    for (let i = 0; i < obstacles.length; i++) {
        let o = obstacles[i];

        fill(o.color);
        rect(o.x, o.y, o.size, o.size);

        o.x += o.speedX;
        o.y += o.speedY;

        // Wrap around screen 
        if (o.x > width) {
            o.x = 0;
        } else if (o.x < 0) {
            o.x = width;
        }

        if (o.y > height) {
            o.y = 0;
        } else if (o.y < 0) {
            o.y = height;
        }
    }

    // Draw mouse obstacle
    fill(255, 0, 0);
    rect(mouseShapeX, mouseShapeY, 40, 40);

    // Win condition 
    if (
        characterX > exitX &&
        characterX < exitX + exitWidth &&
        characterY > exitY &&
        characterY < exitY + exitHeight
    ) {
        fill(255);
        textSize(32);
        text("You Win!", 180, 300);
    }
}

// Mouse click creates obstacle
function mousePressed() {
    mouseShapeX = mouseX;
    mouseShapeY = mouseY;
}