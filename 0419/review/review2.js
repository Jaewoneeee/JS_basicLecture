
const canvas = document.getElementById('myCanvas');      // 이 아이디를 가지고 특정 탭에 접근을 한다
const context = canvas.getContext('2d');            // context라는 존재를 통해 그리기를 한다


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
let arcMoveDirX = 1;
let arcMoveDirY = -1;
let arcSpeed = 1;

function update() {
    if(arcPosX - 20 < 0 ) { // 왼쪽 벽에 부딪히면 오른쪽으로
        arcMoveDirX = 1;

    } else if(arcPosX + 20 > canvas.width){ // 오른쪽 벽에 부딪히면 왼쪽으로
        arcMoveDirX = -1;
    }
    if(arcPosY - 20 < 0) { // 아래쪽 벽에 부딪히면 위로
        arcMoveDirY = -1; 
    } else if(arcPosY + 20 > canvas.height) { // 위쪽 벽에 부딪히면 아래로
        arcMoveDirY = +1; 
    }

    //arcSpeed+=0.01;
    arcPosX += arcMoveDirX * arcSpeed;
    arcPosY -= arcMoveDirY * arcSpeed;
}

function draw() {

    // 화면 클리어
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 다른 도형 그리기
    drawBar();
    drawArc();
}


function drawArc() {

    context.beginPath(); // 그리기를 시작하겠다
                // x    ,   y      , radius  , startAngle, endAngle
    context.arc(arcPosX , arcPosY  , arcRaius, 0, 2 * Math.PI);
    context.fillStyle = 'blue'; // 색깔 고르고
    context.fill(); // 채우기
    context.closePath(); // 그리기를 끝내겠다     
}


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