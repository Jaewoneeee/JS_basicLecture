/*
    [학습목표]
    1. 캔버스 설정
    2. documet
    3. context
*/

// 음.. 여기서의 학습목표?
// 함수를 축약하고 가지고 노는거? 그 함수의 구조를 파악하는거? 으흠


const canvas = document.getElementById('myCanvas');      // 이 아이디를 가지고 특정 탭에 접근을 한다
const context = canvas.getContext('2d');            // context라는 존재를 통해 그리기를 한다

let arcPosX = canvas.width / 2
let arcPosY = canvas.height / 2

const arcRaius = 50;

//방향에 대한 변수 설정
let arcMoveDirX = 1;
let arcMoveDirY = -1;
let arcSpeed = 1;

// ==== 

function update() {

    //데이터 수정 (도형의 위치 이동)

    // if (arcPosX < canvas.width ){
    //     arcPosX++
    // } else {
    //     arcPosY--;
    // }
    //arcPosX += arcMoveDir;
    
    if(arcPosX - 50 < 0 ) {
        arcMoveDirX = 1;
        
    } else if(arcPosX + 50 > canvas.width){
        arcMoveDirX = -1;
    }

    if(arcPosY - 50 < 0) {
        arcMoveDirY = -1;
    } else if(arcPosY + 50 > canvas.height) {
        arcMoveDirY = +1;
    }

    //arcSpeed+=0.01;
    arcPosX += arcMoveDirX * arcSpeed;
    arcPosY -= arcMoveDirY * arcSpeed;
    
}

// 추가실습. 공의 움직임을 빠르게 해보자
// moveDir의값

// function test() {
//     arcPosX2++;
// }

// function update2() {

//     //데이터 수정 (도형의 위치 이동)
//     do {
//         arcPosX--;
//     } while(arcPosX > canvas.width / 2);
    

// }

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
    context.arc(arcPosX , arcPosY  , 50, 0, 2 * Math.PI);
    context.fillStyle = 'blue';
    context.fill();
    context.closePath(); // 그리기를 끝내겠다     
}
// 컴파일 순간에 메모리에 정해지고 밑에서 호출되면 그때 실행.

function drawRect(){
    //context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath(); // 그리기를 시작하겠다
    context.rect(canvas.width / 2 - 100 / 2 , canvas.height - 20 / 2, 100, 20);
    context.fillStyle = 'red';
    context.fill();
    context.closePath(); // 그리기를 끝내겠다
}

setInterval(update, 10);
//setInterval(update2, 10);
setInterval(draw, 10);

// 실습. 동그라미가 오른쪽으로 움직이다가 캔버스 끝에 닿으면 왼쪽으로 이동 
// 핵심. 배운거 : 변수를 넣는것을 두려워하지말자
// 내가 바꾸게 뭔지. 어떤걸 바꿔야하는지 그걸 변수로 지정을 해서 바꾸는 연습