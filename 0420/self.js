const canvas = document.getElementById("myCanvas"); // 이 아이디를 가지고 특정 탭에 접근을 한다
const context = canvas.getContext("2d"); // context라는 존재를 통해 그리기를 한다

// keydown
document.addEventListener("keydown", keyDownEeventHandler);
document.addEventListener("keyup", keyDownEeventHandler); // 자연스러움을 추가하기 위해 쓸 수 있다.

// // arc
// let arcPosX = canvas.width / 2
// let arcPosY = canvas.height / 2 + barHeight
// // let arcPosX = canvas.width / 2
// // let arcPosY = canvas.height / 2
// const arcRaius = 20;

// bar
let barWidth = 250;
let barHeight = 40;
let barPosX = canvas.width / 2 - barWidth / 2;
let barPosY = canvas.height - barHeight / 2;

// arc
const arcRaius = 20;
let arcPosX = canvas.width / 2;
let arcPosY = canvas.height - barHeight / 2 - arcRaius;
// let arcPosX = canvas.width / 2
// let arcPosY = canvas.height / 2

// 방향에 대한 변수 설정
// ball
let arcMoveDirX = 1;
let arcMoveDirY = 1; // 아 맞네 ㅋㅋ
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

// 벽돌만들기
// let brick = {  //이렇게 구조를 잡겠다는 형태
//     left : 0,
//     right : 0,
//     top : 0,
//     bottom : 0,
//     column : 0,
//     row : 0
// }

// 블록만들기
const brickWidth = 50; // 간격 10
const brickHeight = 25; // 간격 5
const brickColumn = 5;
const brickRow = 4;
let brickArray = [];
let clearCount = 0;

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
        //test : 0
      };
    }
  }
  //console.log(brickArray[1][3].left) // 이게 결국 함수 안에서만 호출됐기 때문에.. 어떻게 할 수가 없네;
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

//let clearCount = 0;
let startClick = true;

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
        // 벽돌을 안보이게.. 위치를 바꾸던지.. ball의 방향을 바꾸던지
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

// clear하는 새로운 함수 (교수님 버젼)
function checkToWin() {
  // 1. bricks배열에 있는 정보로 처리
  // setBricks[0][0].isAlive

  let flatBricks = brickArray.flat();
  // flat을 사용하면 2차원 안에 있는 인덱스 값을 하나하나 다 뺴서 하나의 배열로 만들어준다.(1차원배열로)

  let deadBricks = flatBricks.filter((brick) => brick.isAlive == false);
  if (deadBricks.length == brickRow * brickColumn) {
    // 게임 클리어
    alert("게임 클리어!");
  }

  // 2. 카운트를 세는 변수를 만들어서 처리
  if (daadBricksCount == brickRow * brickColumn) {
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
      } else {
        //alert("되냐?")
        //console.log("ehlsi?")
      }
    }
  }
  context.closePath();
}

// function keyDownEeventHandler(e) {

//     if(e.key == ' '){

//         //setInterval(draw, 10);
//         // 동적 움직임을 위해 코드 추가
//         setInterval(update, 10);

//     }
// }

setInterval(draw, 10);
// 동적 움직임을 위해 코드 추가
//setInterval(update, 10);
setBricks();
