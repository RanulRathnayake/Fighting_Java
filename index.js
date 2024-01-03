const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.5;

class Sprite{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.lastKey;
    }
    draw(){
        c.fillStyle = 'red';
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    }
    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        if(this.position.y + this.height >= canvas.height){
            this.velocity.y = 0;
        }
        else{
            this.velocity.y += gravity;
        }
    }
}

const player = new Sprite({
    position:{x:0, y:0},
    velocity:{x:0, y:10}
});


const enemy = new Sprite({
    position:{x:400, y:0},
    velocity:{x:0, y:10}
});

console.log(player);
console.log(enemy);

const key = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    }
}
let lastKey;

function animate(){
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
    player.velocity.x = 0;
    enemy.velocity.x = 0;

    //player movement
    if(key.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5;
    }else if(key.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5;
    }
    //enemy movement
    if(key.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 5;
    }else if(key.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -5;
    }   
}
animate();

window.addEventListener('keydown', (event)=>{
    switch(event.key){
        //player keys
        case 'd':
            key.d.pressed = true;
            player.lastKey = 'd';
        break;
        case 'a':
            key.a.pressed = true;
            player.lastKey = 'a';
        break;
        case 'w':
            player.velocity.y = -20;
        break;
        //enemy keys
        case 'ArrowRight':
            key.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
        break;
        case 'ArrowLeft':
            key.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
        break;
        case 'ArrowUp':
            enemy.velocity.y = -20;
        break;
    }
    console.log(event.key);
})

window.addEventListener('keyup', (event)=>{
    switch(event.key){
        case 'd':
            key.d.pressed = false;
            break;
        case 'a':
            key.a.pressed = false;
            break;
        case 'ArrowRight':
            key.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            key.ArrowLeft.pressed = false;
            break;
    }
})