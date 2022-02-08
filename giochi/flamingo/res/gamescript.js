const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    constructor(x, y, lato, color, velocity) {
        this.x = x;
        this.y = y;
        this.l = lato;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        context.beginPath();
        context.save();
        context.fillStyle = this.color;
        context.fillRect(this.x,this.y, this.l, this.l);
        context.restore();
    }

    update() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

const playerColor = 'blue';
const playerDimensions = 30;
let playerVelocity = {x: 0, y: 0};
const velocityValue = 10;

const player = new Player(canvas.width / 2, canvas.height / 2, playerDimensions, playerColor, playerVelocity);


function animate() {
    requestAnimationFrame(animate);
    context.fillStyle = 'rgba (0, 0, 0, 0.1)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'w') {
        player.velocity.y = velocityValue * -1;
    }
    if (event.key === 's') {
        player.velocity.y = velocityValue;
    }
    if (event.key === 'd') {
        player.velocity.x = velocityValue;
    }
    if (event.key === 'a') {
        player.velocity.x = velocityValue * -1;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 's' || event.key === 'w') {
        player.velocity.y = 0;
    }
    if (event.key === 'd' || event.key === 'a') {
        player.velocity.x = 0;
    }
});

animate();