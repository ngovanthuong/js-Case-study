let cvs=document.getElementById("myCanvas");
let ctx=cvs.getContext("2d");

cvs.style.border=" 1px solid green";

let bg=document.getElementById("bg");

let paddle_width=100;
let paddle_height=20;
let paddle_margin_bottom=50;
let ball_radius =10;
let leftArrow=false;
let rightArrow=false;
let Game_over=false;

let paddle = {
    x: cvs.width/2-paddle_width/2,
    y: cvs.height-paddle_height-paddle_margin_bottom,
    width: paddle_width,
    height: paddle_height,
    dx: 5
};
function drawPaddle() {
    ctx.fillStyle="yellow";
    ctx.fillRect(paddle.x, paddle.y,paddle_width,paddle.height);
    ctx.strokeStyle="black";
    ctx.strokeRect(paddle.x, paddle.y,paddle_width,paddle.height)
}
document.addEventListener("keydown",function (event) {
    if(event.keyCode===37){
        leftArrow=true;
    }else if(event.keyCode===39){
        rightArrow=true;
    }


});
document.addEventListener("keyup",function (event) {
    if(event.keyCode===37){
        leftArrow=false;
    }else if(event.keyCode===39){
        rightArrow=false;
    }


});

function movePaddle() {
    if(leftArrow && paddle.x>0){
        paddle.x -= 5;
    }else if(rightArrow && paddle.x+paddle.width<cvs.width){
        paddle.x += 5;
    }
}

let ball={
    x: cvs.width/2,
    y: paddle.y-ball_radius,
    radius: ball_radius,
    speed: 4,
    dx: 3*(Math.random()*2-1),
    dy: -3,

};

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball_radius,0,Math.PI*2);
    ctx.fillStyle= "red";
    ctx.fill();
    ctx.strokeStyle="black";
    ctx.stroke();


}
function moveBall() {
    ball.x+=ball.dx;
    ball.y+=ball.dy;

}
function ball_Wall() {
    if(ball.x+ball.radius>cvs.width){
        ball.dx = -ball.dx;
    }
    if(ball.y-ball.radius<0){
        ball.dy=-ball.dy;
    }
    if(ball.x-ball.radius<0){
        ball.dx=-ball.dx;
    }
    if(ball.y+ ball.radius > cvs.height){
        gameOver();
        alert("GAME OVER !!!")
    }
}

function gameOver() {
    Game_over=true;

}


// function resetBall() {
//     ball.x=cvs.width/2;
//     ball.y=paddle.y-ball.radius;
//     ball.dx = 3*(Math.random()*2-1);
//     ball.dy = -3;
// }
function ball_Paddle(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && ball.y < paddle.y + paddle.height && ball.y + ball.radius> paddle.y){

        let collidePoint = ball.x - (paddle.x + paddle.width/2);

        collidePoint = collidePoint / (paddle.width/2);


        let angle = collidePoint * Math.PI/3;

        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);
    }
}

function draw() {
    drawPaddle();
    drawBall();
}

function move() {
    movePaddle();
    moveBall();
    ball_Wall();
    ball_Paddle()

}

function loop(){
    ctx.drawImage(bg, 0, 0);
    draw();
    move();
    if( ! Game_over) {
        requestAnimationFrame(loop);
    }
}

loop();


