
const canvas = document.getElementById('myCanvas');      // 이 아이디를 가지고 특정 탭에 접근을 한다
const context = canvas.getContext('2d');            // context라는 존재를 통해 그리기를 한다


// arc
let arcPosX = canvas.width / 2
let arcPosY = canvas.height / 2
const arcRaius = 25;

// bar
let barWidth = 120;
let barHeight = 40
let barPosX = canvas.width / 2 - barWidth / 2
let barPosY = canvas.height - barHeight / 2

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