const snakeCanvas = document.getElementById('sssnake');
snakeCanvas.width = '600';
snakeCanvas.height = '600';
snakeCanvas.setAttribute('style', 'background-color: black;');
const ctx = snakeCanvas.getContext('2d')

let scl = 15;
let x = 10 * scl;
let y = 10 * scl;
let width = scl;
let height = scl;


document.addEventListener('keydown', function(e) {
    const keyName = e.key;
    if (keyName === 'ArrowDown') {
        snk.dir(0, 1);
    } else if (keyName === 'ArrowUp') {
        snk.dir(0, -1);
    } else if (keyName === 'ArrowLeft') {
        snk.dir(-1, 0);
    } else if (keyName === 'ArrowRight') {
        snk.dir(1, 0);
    }
})

function Snake(x, y) {
    this.x = x;
    this.y = y;
    this.width = scl;
    this.height = scl;
    this.dx = 1;
    this.dy = 0;


    this.draw = function () {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'cyan';
        ctx.fill();
    }

    this.dir = function (x, y) {
        this.dx = x;
        this.dy = y;
    }

    this.update = function() {
        this.x += this.dx;
        this.y += this.dy;

    }
}

const snk = new Snake(x, y);

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    snk.draw();
    snk.update();
}
animate()
// function animate() {
//     ctx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);
//     snk.draw();
//     snk.update();
// }
// setInterval(animate, 1000/60);
