
const canvas = document.getElementById('myCanvas');      // 이 아이디를 가지고 특정 탭에 접근을 한다
const context = canvas.getContext('2d');            // context라는 존재를 통해 그리기를 한다

// keydown
document.addEventListener('keydown', keyDownEeventHandler);

// arc
let arcPosX = canvas.width / 2
let arcPosY = canvas.height / 2
const arcRaius = 20;

// bar
let barWidth = 120;
let barHeight = 40
let barPosX = canvas.width / 2 - barWidth / 2
let barPosY = canvas.height - barHeight / 2

// 방향에 대한 변수 설정
// ball
let arcMoveDirX = 1;
let arcMoveDirY = -1;
let arcSpeed = 1;

// bar
let barMoveDirX = 10;
let barSpeed = 3;

//객체생성
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


// bar 움직이기
function keyDownEeventHandler(e) {
    if(e.key == 'ArrowRight' && barPosX + barWidth < canvas.width ) {
        // 바를 오른쪽으로 이동
        //console.log(alert("오른쪽 된다!"))
         barPosX += barMoveDirX;

    } else if (e.key == 'ArrowLeft' && barPosX > 0) {
        //console.log(alert("왼쪽 된다!"))
        barPosX -= barMoveDirX;     
    }
    
    paddle.left = rectPosX;
    paddle.right = rectPosX + barWidth;
    paddle.top = rectPosY;
    paddle.bottom = rectPosY + barHeight;
}

// ball 움직이기
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

// 화면 그리기(도형)
function draw() {

    // 화면 클리어
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 다른 도형 그리기
    drawBar();
    drawArc();
}

// ball 그리기
function drawArc() {

    context.beginPath(); // 그리기를 시작하겠다
                // x    ,   y      , radius  , startAngle, endAngle
    context.arc(arcPosX , arcPosY  , arcRaius, 0, 2 * Math.PI);
    context.fillStyle = 'blue'; // 색깔 고르고
    context.fill(); // 채우기
    context.closePath(); // 그리기를 끝내겠다     
}

// bar 그리기
function drawBar(){

    context.beginPath(); // 그리기를 시작하겠다
                //  x    ,    y   ,   width ,  height
    context.rect( barPosX, barPosY, barWidth, barHeight);
    context.fillStyle = 'red'; // 색깔 고르고
    context.fill(); // 채우기
    context.closePath(); // 그리기를 끝내겠다
}


setInterval(draw, 10);
// 동적 움직임을 위해 코드 추가
setInterval(update, 10);