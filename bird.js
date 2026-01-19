// GAME //
let canvas;
let ctx;
let canvasWidth = 360;
let canvasHeight = 640;
let veloctiyY = 0;
let score = 0;
let highScore = 0;
let gameOver = false;
let gravity = 0.4;
let backgroundImg = new Image;
backgroundImg.src = "flappybirdbg.png";

// bird //
let birdImg = new Image;
birdImg.src = "flappybird.png";
let birdWidth = 25;
let birdHeight = 25;
let birdX = canvasWidth / 9;
let birdY = canvasHeight / 9;
let bird = {
    img: birdImg,
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
};




// pipe //
let pipeArray = [];
let topPipeImg = new Image;
topPipeImg.src = "toppipe.png";
let bottomPipeImg = new Image;
bottomPipeImg.src = "bottompipe.png";
let pipeWidth = 64;
let pipeHeight = 512;
let pipeX = canvasWidth;
let randomPipeY;
let gap = 150;



window.onload = ()  => {
    if (gameOver) return;
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;


    requestAnimationFrame(update);
    addEventListener("keydown", move);
    setInterval(setPipes, 1500);
};


function update() {
    if (gameOver) return;
    requestAnimationFrame(update);
    // draw canvas //
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);


    // draw bird //
    bird.y = Math.max(bird.y + veloctiyY, 0);
    veloctiyY += gravity;
    ctx.drawImage(bird.img, bird.x, bird.y, bird.width, bird.height);

    // draw bird //
    for (let i = 0; i < pipeArray.length; i++) {
        const pipe = pipeArray[i];
        pipe.x -= 2;
        ctx.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
        
        if (detectCollission(bird, pipe)) {
            endGame();
        };

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            pipe.passed = true;
            score += 0.5;        
        };
    };

    if (bird.y + bird.height >= canvas.height + 5) {
        endGame();
    };



    ctx.fillStyle = "green";
    ctx.font = "bold 17px Arial";
    ctx.fillText("Score: " + score, 5, 20);

    highScore = parseFloat(localStorage.getItem("highScore")) || [0];
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
    };


    ctx.fillStyle = "red";
    ctx.font = "bold 17px Arial";
    ctx.fillText("Highscore: " + highScore, 240, 20);

};


function move(e) {
    if (gameOver) return;
    if (e.code == "Space") {
        veloctiyY = -6;
    };
};

function setPipes() {
    if (gameOver) return;
    randomPipeY = -pipeHeight / 4 - Math.random() * (pipeHeight / 2);
    let toppipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    } 
    pipeArray.push(toppipe);

    let bottompipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + gap,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(bottompipe);
};

function detectCollission(a, b) {
    return          a.x < b.x + b.width &&
                    a.x + a.width > b.x &&
                    a.y < b.y + b.height &&
                    a.y + a.height > b.y
};

function endGame() {
    gameOver = true;
    alert("!!Game_OVER!!");
    location.reload();
};