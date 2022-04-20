const canvas = document.getElementById("myCanvas"); // 이 아이디를 가지고 특정 탭에 접근을 한다
const context = canvas.getContext("2d"); // context라는 존재를 통해 그리기를 한다

// keydown
document.addEventListener("keydown", keyDownEeventHandler);
document.addEventListener("keyup", keyDownEeventHandler); // 자연스러움을 추가하기 위해 쓸 수 있다.

// bar
let barWidth = 250;
let barHeight = 40;
let barPosX = canvas.width / 2 - barWidth / 2;
let barPosY = canvas.height - barHeight / 2;

// arc
const arcRaius = 20;
let arcPosX = canvas.width / 2;
let arcPosY = canvas.height - barHeight / 2 - arcRaius; // bar위쪽에 맞추기 위해 반지름값만큼 빼줌
//let arcPosX = canvas.width / 2;
//let arcPosY = canvas.height / 2;

// 방향에 대한 변수 설정
// ball
let arcMoveDirX = 1;
let arcMoveDirY = -1; // 1에서 -1로변경 (y축은 위쪽으로 가는게 음수)
let arcSpeed = 4;

// bar
let barMoveDirX = 10;
let barSpeed = 40;

//객체생성
let ball = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

let paddle = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
};

// 블록만들기
const brickWidth = 50; // 간격 10
const brickHeight = 25; // 간격 5
const brickColumn = 5;
const brickRow = 4;
let brickArray = [];

// 외부 변수 선언
let clearCount = 0;
let startClick = true;

function setBricks() {
  for (let i = 0; i < brickRow; i++) {
    brickArray[i] = [];
    for (let j = 0; j < brickColumn; j++) {
      brickArray[i][j] = {
        // 여기 숫자 의미를 잘 파악해야한다
        left: 55 + j * (brickWidth + 10),
        right: 55 + j * (brickWidth + 10) + 50, //60으로 나중에 묶기
        top: 30 + i * (brickHeight + 5),
        bottom: 30 + i * (brickHeight + 5) + 25,
        row: j,
        column: i,
        isAlive: true, // 여기에 변수를 추가하는 개념
        test: 0,
      };
    }
  }
}

// ball과 bar가 만나지 않는 경우 설정
function isCollisionRectToRect(rectA, rectB) {
  // a의 왼쪽과 b의 오른쪽
  // a의 오른과 b의 왼쪽
  // a의 아래쪽과 b의 위쪽
  // a의 위쪽과 b의 아래쪽
  if (
    rectA.left > rectB.right ||
    rectA.right < rectB.left ||
    rectA.top > rectB.bottom ||
    rectA.bottom < rectB.top
  ) {
    return false;
  }
  return true;
}

// bar 움직이기
function keyDownEeventHandler(e) {
  if (e.key == "ArrowRight" && barPosX + barWidth < canvas.width) {
    // 바를 오른쪽으로 이동
    //console.log(alert("오른쪽 된다!"))
    barPosX += barMoveDirX;
    //arcPosX += barMoveDirX
  } else if (e.key == "ArrowLeft" && barPosX > 0) {
    //console.log(alert("왼쪽 된다!"))
    barPosX -= barMoveDirX;
    //arcPosX -= barMoveDirX
  }

  if (
    e.key == "ArrowRight" &&
    startClick &&
    barPosX + barWidth < canvas.width
  ) {
    arcPosX += barMoveDirX;
  } else if (e.key == "ArrowLeft" && startClick && barPosX > 0) {
    arcPosX -= barMoveDirX;
  }

  if (e.key == " " && startClick) {
    setInterval(update, 10);
    startClick = false;
  }

  paddle.left = barPosX;
  paddle.right = barPosX + barWidth;
  paddle.top = barPosY;
  paddle.bottom = barPosY + barHeight;
}

// ball 움직이기
function update() {
  if (arcPosX - arcRaius < 0) {
    arcMoveDirX = 1;
  } else if (arcPosX + arcRaius > canvas.width) {
    arcMoveDirX = -1;
  }

  if (arcPosY - arcRaius < 0) {
    arcMoveDirY = -1;
  } else if (arcPosY + arcRaius > canvas.height) {
    location.reload();
    alert("Game Over!!");
  }

  //arcSpeed+=0.01;
  arcPosX += arcMoveDirX * arcSpeed;
  arcPosY -= arcMoveDirY * arcSpeed;

  ball.left = arcPosX - arcRaius;
  ball.right = arcPosX + arcRaius;
  ball.top = arcPosY - arcRaius;
  ball.bottom = arcPosY + arcRaius;

  // 충돌확인
  if (isCollisionRectToRect(ball, paddle)) {
    arcMoveDirY = 1;
    //arcMoveDirX = -1;
    //arcPosY = paddle.top - arcRaius;
  }

  for (let i = 0; i < brickRow; i++) {
    for (let j = 0; j < brickColumn; j++) {
      if (
        brickArray[i][j].isAlive &&
        isCollisionRectToRect(ball, brickArray[i][j])
      ) {
        // console.log(i,j)
        brickArray[i][j].isAlive = false;
        arcMoveDirY = -1;
        clearCount++;
        console.log(clearCount);
        break; // 벽돌 중복으로 뿌서지는거 방지
      }
    }
  }

  if (clearCount == 20) {
    setTimeout(function () {
      alert("Clear!", location.reload());
    }, 100);
  }
}

// ==================================== 화면 그리기(도형) ======================================
function draw() {
  // 화면 클리어
  context.clearRect(0, 0, canvas.width, canvas.height);

  // 다른 도형 그리기
  drawBar();
  drawArc();
  drawBricks(); //블록 그리기 추가
}

// ball 그리기
function drawArc() {
  context.beginPath(); // 그리기를 시작하겠다
  // x    ,   y      , radius  , startAngle, endAngle
  context.arc(arcPosX, arcPosY, arcRaius, 0, 2 * Math.PI);
  context.fillStyle = "blue"; // 색깔 고르고
  context.fill(); // 채우기
  context.closePath(); // 그리기를 끝내겠다
}

// bar 그리기
function drawBar() {
  context.beginPath(); // 그리기를 시작하겠다
  //  x    ,    y   ,   width ,  height
  context.rect(barPosX, barPosY, barWidth, barHeight);
  context.fillStyle = "red"; // 색깔 고르고
  context.fill(); // 채우기
  context.closePath(); // 그리기를 끝내겠다
}

// block 그리기
function drawBricks() {
  context.beginPath();
  for (let i = 0; i < brickRow; i++) {
    for (let j = 0; j < brickColumn; j++) {
      if (brickArray[i][j].isAlive) {
        context.rect(
          brickArray[i][j].left,
          brickArray[i][j].top,
          brickWidth,
          brickHeight
        );
        context.fillStyle = "coral"; // 이때 색칠하는것을 for문 안에 넣느냐 마느냐로 블록색을 여러개로 줄 수 있다.
        context.fill();
      }
    }
  }
  context.closePath();
}

setInterval(draw, 10);
setBricks();
