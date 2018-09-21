const canvas = document.getElementById('sssnake');
const canvasWidth = canvasHeight = 450;
const gridSize = 15;
const columnNumber = rowNumber = canvasWidth / gridSize;
const initial_x = initial_y = gridSize * 5;
const snake = new Snake(initial_x, initial_y);
const food = new Food();
let k, l, n, m, temp1, temp2;
let score = 0;
let fps = 15;
const audio = new Audio('HarryPotterPrologue.mp3');
audio.setAttribute('loop', '');

document.addEventListener('keydown', playAudio);

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight' && snake.xSpeed !== -1) {
        snake.direction(1, 0);
    } else if (event.key === 'ArrowLeft' && snake.xSpeed !== 1) {
        snake.direction(-1, 0);
    } else if (event.key === 'ArrowDown' && snake.ySpeed !== -1) {
        snake.direction(0, 1);
    } else if (event.key === 'ArrowUp' && snake.ySpeed !== 1) {
        snake.direction(0, -1);
    }
})



function setCanvas(width, height) {
    canvas.width = width;
    canvas.height = height;
    canvas.setAttribute('style', 'background-color: black;')
    ctx = canvas.getContext('2d');
}

function playAudio() {
    audio.play();
}

function showScore() {
    ctx.font = '15px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(score, 15, 15);
}

function Snake(x, y) {
    this.x = x;
    this.y = y;
    this.xSpeed = 1;//gridSize;
    this.ySpeed = 0;//gridSize;
    this.tailArr = [[this.x-gridSize, this.y], [this.x-2*gridSize, this.y], [this.x-3*gridSize, this.y], [this.x-4*gridSize, this.y]];

    this.direction = function(x, y) {
        this.xSpeed = x;
        this.ySpeed = y;
    }

    this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, gridSize - 1, gridSize - 1);
        ctx.fillStyle = 'red';
        ctx.fill();
        for (let i = 0; i < this.tailArr.length; ++i) {
            [temp1, temp2] = this.tailArr[i];
            ctx.beginPath();
            ctx.rect(temp1, temp2, gridSize - 1, gridSize - 1);
            ctx.fillStyle = 'red';
            ctx.fill();
        }
    }

    this.update = function() {
        k = this.x;
        l = this.y;
        for (let i=0; i < this.tailArr.length; ++i) {
            [n, m] = this.tailArr[i];
            this.tailArr[i] = [k, l];
            k = n;
            l = m;
        }
        if (this.x === canvasWidth - gridSize && this.xSpeed === 1) {
            this.x = -gridSize;
        } else if (this.x === 0 && this.xSpeed === -1) {
            this.x = canvasWidth;
        } else if (this.y === canvasHeight - gridSize && this.ySpeed === 1) {
            this.y = -gridSize;
        } else if (this.y === 0 && this.ySpeed === -1) {
            this.y = canvasHeight;
        }
        this.x += this.xSpeed * gridSize;
        this.y += this.ySpeed * gridSize;
    }

    this.selfHit = function() {
        let res = false;
        for (let tail of this.tailArr) {
            if (this.x === tail[0] && this.y === tail[1]) {
                res = true;
                break;
            }
        }
        return res;
    }

    this.reset = function() {
        this.x = initial_x;
        this.y = initial_y;
        this.xSpeed = 1;//gridSize;
        this.ySpeed = 0;//gridSize;
        this.tailArr = [[this.x-gridSize, this.y], [this.x-2*gridSize, this.y], [this.x-3*gridSize, this.y], [this.x-4*gridSize, this.y]];
    }
}

function Food(x, y) {
    this.x = Math.floor(Math.random() * columnNumber) * gridSize;
    this.y = Math.floor(Math.random() * rowNumber) * gridSize;

    this.draw = function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, gridSize - 1, gridSize - 1);
        ctx.fillStyle = '#84FF00';
        ctx.fill();
    }

    this.update = function() {
        this.x = Math.floor(Math.random() * columnNumber) * gridSize;
        this.y = Math.floor(Math.random() * rowNumber) * gridSize;
    }
}


function main() {
    setTimeout(function() {requestAnimationFrame(main)}, 1000 / fps);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    showScore();
    food.draw();
    snake.draw();
    if (food.x === snake.x && food.y === snake.y) {
        food.update();
        score += 1;
        snake.tailArr.push([0,0]);
        fps += 1;
    }
    snake.update();
    if (snake.selfHit()) {
        snake.reset();
        score = 0;
        fps = 15;
    }
}

setCanvas(canvasWidth, canvasHeight);
main();
