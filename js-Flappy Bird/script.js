let cvs=document.getElementById("myCanvas");
let ctx=cvs.getContext("2d");

/*ctx.moveTo(0,0)
ctx.lineTo(200,100)
ctx.stroke();*/
let bg=document.getElementById("bg");
let fg=document.getElementById("fg");
let bird=document.getElementById("bird");
let pipeNorth=document.getElementById("pipeNorth");
let pipeSouth=document.getElementById("pipeSouth");
let constant;
let gap=100;

let bX=10;
let bY=150;

let gravity=1.5;

let score=0;

document.addEventListener("keydown",moveUp);

function moveUp() {
    bY-=35;
}
//pipe coordinates
let pipe=[];
pipe[0]={
    x: cvs.width,
    y: 0
};
function draw() {

    ctx.drawImage(bg,0,0);

    for(let i=0; i<pipe.length; i++){

        constant = pipeNorth.height + gap;

        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);

        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);

        pipe[i].x--;

        if( pipe[i].x === 50 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }

        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            location.reload();
        }
        if(pipe[i].x===5){
            score++
        }
    }


    ctx.drawImage(fg,0,cvs.height-fg.height);
    ctx.drawImage(bird,bX,bY);
    bY+=gravity;
    ctx.fillStyle="red";
    ctx.font="20px Arial";
    ctx.fillText("Score: "+score,10,30);
    requestAnimationFrame(draw)
}
draw();
