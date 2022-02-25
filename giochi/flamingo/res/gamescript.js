const canvas = document.querySelector('board');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

function percentage(value, percentage){
    return (value * percentage) / 100;
}

class Player {
    constructor(x, y, lato, color) {
        this.x = x;
        this.y = y;
        this.l = lato;
        this.color = color;
        this.velocity = {posx: 0, posy: 0, negx: 0, negy: 0};
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
        this.x = this.x + this.velocity.posx + this.velocity.negx;
        this.y = this.y + this.velocity.posy + this.velocity.negy;
    }
}

class Enemy {
    constructor(x, y, lato, color) {
        this.x = x;
        this.y = y;
        this.l = lato;
        this.color = color;
        this.velocity = {posx: 0, posy: 0, negx: 0, negy: 0};
        this.distance;
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
        this.x = this.x + this.velocity.posx + this.velocity.negx;
        this.y = this.y + this.velocity.posy + this.velocity.negy;
    }
}

class Wall {
    constructor (x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(){
        context.beginPath();
        context.save();
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.restore();
    }
}

const playerColor = 'blue';
const playerDimensions = 30;
const player = new Player (canvas.width / 2, canvas.height / 2, playerDimensions, playerColor);

const enemyColor = 'red';

const wallColor = 'white';

let velocityValue = 10;

let entities = [];
let enemies = [];
let walls = [];

for (let i = 0; i < 4; i++){
    enemies.push(new Enemy (20 * 2 * i, 30 * i, playerDimensions, enemyColor));
}

for (let i = 0; i < 7; i++){
    walls.push(new Wall (100, 50 * i * 2, 500 * Math.random(), 20, wallColor));
}

entities.push(player);

enemies.forEach((enemy) =>{
    entities.push(enemy);
});

function animate() {
    requestAnimationFrame(animate);
    context.fillStyle = 'rgba (0, 0, 0, 0.1)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    wallCollision();
    player.update();
    enemies.forEach((enemy) =>{
        followPlayer();
        enemy.update();
    });
    walls.forEach((wall) =>{
        wall.draw();
    });
}

function followPlayer(){
    const detectionDistance = 300;
    enemies.forEach((enemy) =>{
        enemy.distance = Math.hypot(enemy.x - player.x, enemy.y - player.y);
        if (enemy.distance < detectionDistance){
            const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
            if (enemy.x != player.x && enemy.y != player.y){
                if (player.x > enemy.x && player.y < enemy.y){
                    enemy.velocity.posx = Math.cos(angle) * percentage(velocityValue, 95);
                    enemy.velocity.negy = Math.sin(angle) * percentage(velocityValue, 95);
                    enemy.velocity.negx = 0;
                    enemy.velocity.posy = 0;
                }
                if (player.x < enemy.x && player.y < enemy.y){
                    enemy.velocity.negx = Math.cos(angle) * percentage(velocityValue, 95);
                    enemy.velocity.negy = Math.sin(angle) * percentage(velocityValue, 95);
                    enemy.velocity.posx = 0;
                    enemy.velocity.posy = 0;
                }
                if (player.x < enemy.x && player.y > enemy.y){
                    enemy.velocity.negx = Math.cos(angle) * percentage(velocityValue, 95);
                    enemy.velocity.posy = Math.sin(angle) * percentage(velocityValue, 95);
                    enemy.velocity.posx = 0;
                    enemy.velocity.negy = 0;
                }
                if (player.x > enemy.x && player.y > enemy.y){
                    enemy.velocity.posx = Math.cos(angle) * percentage(velocityValue, 95);
                    enemy.velocity.posy = Math.sin(angle) * percentage(velocityValue, 95);
                    enemy.velocity.negx = 0;
                    enemy.velocity.negy = 0;
                }
            }else{
                enemy.velocity.negx = 0;
                enemy.velocity.negy = 0;
                enemy.velocity.posx = 0;
                enemy.velocity.posy = 0;
            }
        }
    });
}

function wallCollision(){
    entities.forEach((entitie) =>{
        walls.forEach((wall) =>{
            if (entitie.x + entitie.l > wall.x && entitie.x < wall.x + wall.width){
                if (entitie.y <= wall.y + wall.height && entitie.y > wall.y + wall.height / 2){
                    entitie.velocity.negy = 0;
                    entitie.y = wall.y + wall.height;
                }
                if (entitie.y + entitie.l >= wall.y && entitie.y + entitie.l < wall.y + wall.height / 3){
                    entitie.velocity.posy = 0;
                    entitie.y = wall.y - entitie.l;
                }
            }
            if (entitie.y < wall.y + wall.height && entitie.y + entitie.l > wall.y){
                if (entitie.x <= wall.x + wall.width && entitie.x > wall.x + wall.width / 2){
                    entitie.velocity.negx = 0;
                    entitie.x = wall.x + wall.width;
                }
                if (entitie.x + entitie.l >= wall.x && entitie.x < wall.x + wall.width / 2){
                    entitie.velocity.posx = 0;
                    entitie.x = wall.x - entitie.l;
                }
            }
        });
    });
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
