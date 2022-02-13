const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

function percentage(value, percentage){
    return (value * percentage) / 100;
}

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
        wallCollision();
        this.x = this.x + this.velocity.posx + this.velocity.negx;
        this.y = this.y + this.velocity.posy + this.velocity.negy;
    }
}

class Enemy {
    constructor(x, y, lato, color, velocity) {
        this.x = x;
        this.y = y;
        this.l = lato;
        this.color = color;
        this.velocity = velocity;
        this.aware = false;
    }

    draw() {
        context.beginPath();
        context.save();
        context.fillStyle = this.color;
        context.fillRect(this.x,this.y, this.l, this.l);
        context.restore();
    }

    update() {
        //this.draw();
        if (detection() == true){
            followPlayer();
        }else{
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

class Wall {
    constructor (x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(){
        context.beginPath();
        context.save();
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.restore();
    }

}
const playerColor = 'blue';
const playerDimensions = 30;
let playerVelocity = {posx: 0, posy: 0, negx: 0, negy: 0};
const velocityValue = 10;

let enemyVelocity = {x : 0, y: 0};

const player = new Player(canvas.width / 2, canvas.height / 2, playerDimensions, playerColor, playerVelocity);
const enemy = new Enemy (20, 20, playerDimensions, 'red', enemyVelocity);
const wall = new Wall (100, 100, 500, 20);

function animate() {
    requestAnimationFrame(animate);
    context.fillStyle = 'rgba (0, 0, 0, 0.1)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
    wall.draw();

}

function followPlayer() {
    if (enemy.x != player.x && enemy.y != player.y){
        const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
        enemy.velocity.x = Math.cos(angle) * percentage(velocityValue, 90);
        enemy.velocity.y = Math.sin(angle) * percentage(velocityValue, 90);
    }
}

detectionDistance = 300;

function detection(){
    let distance = Math.hypot(enemy.x - player.x, enemy.y - player.y);
    if (distance < detectionDistance){
        return true;
    }
    return false;
}

function wallCollision(){
    if (((player.x == wall.x + wall.width) || (player.x + player.l == wall.x)) && ((player.y + player.l > wall.y) && (player.y < wall.y + wall.height))){
        if (player.x < wall.x){
            player.velocity.posx = 0;
        }
        if (player.x > wall.x){
            player.velocity.negx = 0;
        }
    }
    if (((player.y + player.l == wall.y) || (player.y == wall.y + wall.height)) && ((player.x < wall.x + wall.width) && (player.x + player.width > wall.x))){
        if (player.y < wall.y){
            player.velocity.negy = 0;
        }
        if (player.y > wall.y){
            player.valocity.posy = 0;
        }
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'w') {
        player.velocity.negy = velocityValue * -1;
    }
    if (event.key === 's') {
        player.velocity.posy = velocityValue;
    }
    if (event.key === 'd') {
        player.velocity.posx = velocityValue;
    }
    if (event.key === 'a') {
        player.velocity.negx = velocityValue * -1;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'w') {
        player.velocity.negy = 0;
    }
    if (event.key === 's') {
        player.velocity.posy = 0;
    }
    if (event.key === 'd') {
        player.velocity.posx = 0;
    }
    if (event.key === 'a') {
        player.velocity.negx = 0;
    }
});

animate();