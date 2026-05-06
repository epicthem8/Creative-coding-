// Player position
var characterX = 250;
var characterY = 520;
var characterSize = 25;

// Key codes
var w = 87;
var s = 83;
var a = 65;
var d = 68;

// Moving obstacles
var obstacles = [];

// Game variables
var score = 0;
var highScore = 0;
var gameOver = false;
var difficultyTimer = 0;
var playerSpeed = 4;

// ---------------- FUNCTIONS ----------------

// Setup canvas and create obstacles
function setup() {
    createCanvas(500, 600);
    resetGame();
}

// Restart the game
function resetGame() {
    characterX = 250;
    characterY = 520;
    score = 0;
    gameOver = false;
    difficultyTimer = 0;
    obstacles = [];
    createObstacles();
}

// Create player
function createPlayer() {
    fill(255);
    circle(characterX, characterY, characterSize);
}

// Move player with keyboard
function movePlayer() {
    if (gameOver) {
        return;
    }

    if (keyIsDown(w)) {
        characterY -= playerSpeed;
    } else if (keyIsDown(s)) {
        characterY += playerSpeed;
    }

    if (keyIsDown(a)) {
        characterX -= playerSpeed;
    } else if (keyIsDown(d)) {
        characterX += playerSpeed;
    }

    keepPlayerOnScreen();
}

// Keep player inside the canvas
function keepPlayerOnScreen() {
    characterX = constrain(characterX, characterSize / 2, width - characterSize / 2);
    characterY = constrain(characterY, characterSize / 2, height - characterSize / 2);
}

// Create obstacles
function createObstacles() {
    for (let i = 0; i < 5; i++) {
        addObstacle();
    }
}

// Add one obstacle
function addObstacle() {
    obstacles.push({
        x: random(width),
        y: random(-300, -20),
        size: random(20, 50),
        color: color(random(255), random(255), random(255)),
        speedY: random(2, 5) + score / 300,
        speedX: random(-2, 2)
    });
}

// Wrap obstacles around screen
function wrapObstacle(o) {
    if (o.y > height) {
        o.y = random(-200, -20);
        o.x = random(width);
        o.speedY = random(2, 5) + score / 300;
    }

    if (o.x > width) o.x = 0;
    if (o.x < 0) o.x = width;
}

// Draw obstacles
function drawObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        let o = obstacles[i];

        fill(o.color);
        rect(o.x, o.y, o.size, o.size);

        if (!gameOver) {
            o.x += o.speedX;
            o.y += o.speedY;
            wrapObstacle(o);
        }
    }
}

// Check if player hits an obstacle
function checkCollisions() {
    for (let i = 0; i < obstacles.length; i++) {
        let o = obstacles[i];

        let closestX = constrain(characterX, o.x, o.x + o.size);
        let closestY = constrain(characterY, o.y, o.y + o.size);

        let distanceToObstacle = dist(characterX, characterY, closestX, closestY);

        if (distanceToObstacle < characterSize / 2) {
            gameOver = true;

            if (score > highScore) {
                highScore = score;
            }
        }
    }
}

// Make the game harder as score goes up
function increaseDifficulty() {
    if (gameOver) {
        return;
    }

    difficultyTimer++;

    if (difficultyTimer > 180) {
        addObstacle();
        difficultyTimer = 0;
    }
}

// Update score
function updateScore() {
    if (!gameOver) {
        score++;
    }
}

// Draw score text
function drawScore() {
    fill(255);
    textSize(20);
    text("Score: " + score, 20, 30);
    text("High Score: " + highScore, 20, 55);
}

// Create border
function drawBorder() {
    stroke(255);
    noFill();
    rect(0, 0, width, height);
    noStroke();
}

// Display instructions
function displayInstructions() {
    fill(255);
    textSize(16);
    text("Use WASD to dodge the blocks", 150, 585);
}

// Display game over message
function displayGameOver() {
    if (gameOver) {
        fill(255);
        textSize(36);
        text("Game Over", 155, 270);

        textSize(20);
        text("Final Score: " + score, 185, 310);
        text("Press SPACE to restart", 150, 345);
    }
}

// ---------------- DRAW LOOP ----------------

function draw() {
    background(120, 45, 78);

    updateScore();
    increaseDifficulty();

    createPlayer();
    movePlayer();
    drawObstacles();
    checkCollisions();
    drawBorder();
    drawScore();
    displayInstructions();
    displayGameOver();
}

// Press space to restart
function keyPressed() {
    if (keyCode === 32 && gameOver) {
        resetGame();
    }
}