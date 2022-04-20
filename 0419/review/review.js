
const canvas = document.getElementById('myCanvas');      // 이 아이디를 가지고 특정 탭에 접근을 한다
const context = canvas.getContext('2d');            // context라는 존재를 통해 그리기를 한다

document.addEventListener('keydown', keyDownEeventHandler);


let arcPosX = canvas.width / 2
let arcPosY = canvas.height / 2

let barWidth = 100;
let barHeight = 40
let rectPosX = canvas.width / 2 - barWidth / 2
let rectPosY = canvas.height - barHeight / 2
let rectMoveDirX = 10;
let barSpeed = 3;

const arcRaius = 20;

//방향에 대한 변수 설정
let arcMoveDirX = 1;
let arcMoveDirY = -1;
let arcSpeed = 1;

let ball = {
    left : 0,
    right : 0, 
    top : 0, 
    bottom : 0
}

let paddle = {
    left : 0,
    right : 0, 
    top : 0, 
    bottom : 0
}


function keyDownEeventHandler(e) {
    if(e.key == 'ArrowRight') {
        // 바를 오른쪽으로 이동
        //console.log(alert("오른쪽 된다!"))
        if (rectPosX + barWidth < canvas.width) {

            rectPosX += rectMoveDirX;
        }
    }
    if(e.key == 'ArrowLeft') {
        //console.log(alert("왼쪽 된다!"))
        if (rectPosX > 0){
            rectPosX -= rectMoveDirX;
        }
    }
    
    paddle.left = rectPosX;
    paddle.right = rectPosX + barWidth;
    paddle.top = rectPosY;
    paddle.bottom = rectPosY + barHeight;
}


// ball과 bar가 만나지 않는 경우 
function isCollisionRectToRect(rectA, rectB)
{
    // a의 왼쪽과 b의 오른쪽
    // a의 오른과 b의 왼쪽
    // a의 아래쪽과 b의 위쪽
    // a의 위쪽과 b의 아래쪽
    if(rectA.left > rectB.right ||
       rectA.right < rectB.left ||
       rectA.top > rectB.bottom ||
       rectA.bottom < rectB.top)
       {
           return false 
       }
    return true;
}


function update() {

    if(arcPosX - arcRaius < 0 ) {
        arcMoveDirX = 1;
        
    } else if(arcPosX + arcRaius > canvas.width){
        arcMoveDirX = -1;
    }

    if(arcPosY - arcRaius < 0) {
        arcMoveDirY = -1;
    } else if(arcPosY + arcRaius > canvas.height) {
        arcMoveDirY = +1;
    }

    //arcSpeed+=0.01;
    arcPosX += arcMoveDirX * arcSpeed;
    arcPosY -= arcMoveDirY * arcSpeed;

    ball.left = arcPosX - arcRaius ;
    ball.right = arcPosX + arcRaius 
    ball.top = arcPosY - arcRaius 
    ball.bottom = arcPosY + arcRaius
    
    // 충돌확인
    if(isCollisionRectToRect(ball, paddle)){
        arcMoveDirY = 1;
        //arcMoveDirX = -1;
        arcPosY = paddle.top - arcRaius;
    }
    
}

function draw() {


    // 화면 클리어
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 다른 도형 그리기
    drawRect();
    drawArc();
}


function drawArc() {

    // context.clearRect(0, 0, canvas.width, canvas.height);
    // arcPosX++;    
    context.beginPath(); // 그리기를 시작하겠다
    //context.arc(canvas.width / 2 , canvas.height / 2  , 50, 0, 2 * Math.PI);
    context.arc(arcPosX , arcPosY  , arcRaius, 0, 2 * Math.PI);
    context.fillStyle = 'blue';
    context.fill();
    context.closePath(); // 그리기를 끝내겠다     
}
// 컴파일 순간에 메모리에 정해지고 밑에서 호출되면 그때 실행.

function drawRect(){
    //context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath(); // 그리기를 시작하겠다
    context.rect( rectPosX, rectPosY, barWidth, barHeight);
    context.fillStyle = 'red';
    context.fill();
    context.closePath(); // 그리기를 끝내겠다
}

setInterval(update, 10);
setInterval(draw, 10);