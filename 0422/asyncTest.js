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
let arcPosY = canvas.height - barHeight / 2 - arcRaius;
// let arcPosX = canvas.width / 2
// let arcPosY = canvas.height / 2

// 방향에 대한 변수 설정
// ball
let arcMoveDirX = 1;
let arcMoveDirY = 1; // 아 맞네 ㅋㅋ
let arcSpeed = 4;
let centerMoveDirX = 1;

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

let black = {
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
let clearCount = 0;
// let brickArray = []
let brickArray; // class로 바꾸며 그냥 선언만 해주자

function setBricks() {
  brickArray = []; // why? 여기서 다시 선언해주는거지?

  for (let i = 0; i < brickRow; i++) {
    brickArray[i] = [];
    for (let j = 0; j < brickColumn; j++) {
      // 기존코드
      // brickArray[i][j] = {
      //     // 여기 숫자 의미를 잘 파악해야한다
      //     left : 55 + j * (brickWidth + 10),
      //     right : 55 + j * (brickWidth + 10) + 50, //60으로 나중에 묶기
      //     top : 30 + i * (brickHeight + 5),
      //     bottom : 30 + i * (brickHeight + 5) + 25,
      //     row : j,
      //     column : i,
      //     isAlive : true, // 여기에 변수를 추가하는 개념

      // class로 수정해보자
      // 미리 선언해둔 각각의 class인자에 값을 넣어주는것.
      brickArray[i][j] = new Brick(
        55 + j * (brickWidth + 10), // this.left
        30 + i * (brickHeight + 5), // this.top
        55 + j * (brickWidth + 10) + 50, // this.right
        30 + i * (brickHeight + 5) + 25, // this.bottom
        "green" // this.color
      );
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
  if(e.key == 'ArrowRight' && barPosX + barWidth < canvas.width ) {
    // 바를 오른쪽으로 이동
    //console.log(alert("오른쪽 된다!"))
     barPosX += barMoveDirX;
     //arcPosX += barMoveDirX
     if(startClick){
     arcPosX = barPosX + barWidth / 2
    }

} else if (e.key == 'ArrowLeft' && barPosX > 0) {
    //console.log(alert("왼쪽 된다!"))
    barPosX -= barMoveDirX;
    //arcPosX -= barMoveDirX 
    if(startClick){  
    arcPosX = barPosX + barWidth / 2
    }    
}

  if (e.key == " " && startClick) {
    setInterval(update, 10);
    setInterval(centerMoving, 10); // 장애물 블록 움직이기
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
    arcMoveDirY = 1;
    // location.reload();
    // alert("Game Over!!");
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

  black.left = centerBlack.left;
  black.right = centerBlack.left + brickWidth;
  black.top = centerBlack.top;
  black.bottom = centerBlack.top + brickHeight;


  if (isCollisionRectToRect(ball, black)) {
    // arcMoveDirY = 1;
    arcMoveDirY = -1 * arcMoveDirY ;
    arcMoveDirX = -1 * arcMoveDirX ;
  }

  checkToWin()

  // if (clearCount == brickColumn * brickRow) {
  //   setTimeout(function () {
  //     alert("Clear!", location.reload());
  //   }, 100);
  // }
}


async function asyncTimeoutCheck(timeout) {
 

  if (clearCount == brickRow * brickColumn) {
      setTimeout( () => {
        window.location.reload();
        alert("게임 클리어!")
      }, timeout)
    }         
  }

// clear하는 새로운 함수 (교수님 버젼)
async function checkToWin() {

  await asyncTimeoutCheck(500)
  // window.location.reload();
  // alert("게임 클리어!")

}

// ==================================== 화면 그리기(도형) ======================================
function draw() {
  // 화면 클리어
  context.clearRect(0, 0, canvas.width, canvas.height);

  // 다른 도형 그리기
  drawBar();
  drawArc();
  drawBricks();
  drawCenterBlock();
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
      // if(brickArray[i][j].isAlive)
      // {
      //     context.rect(brickArray[i][j].left, brickArray[i][j].top, brickWidth, brickHeight)
      //     context.fillStyle = 'coral'; // 이때 색칠하는것을 for문 안에 넣느냐 마느냐로 블록색을 여러개로 줄 수 있다.
      //     context.fill();
      // }

      // 위 조건문을 주석처리하고, 밑에서 선언해준 class에있는 함수만 불러내주면 된다.
      brickArray[i][j].draw();
    }
  }
  context.closePath();
}

// class로 새롭게 접근해보자

// 지금 여기서 한번에 설정을 하고 있어서 헷갈릴 수 있음
// 바꾼 순서나 흐름을 잘 생각해봐야함

class Brick {
  // # 속성에 해당하는 내용
  // 처음 위에서 배열을 만들때 설정해줬던 값을 이쪽으로 빼준거라고 할수 있을듯
  // 여기서 먼저 class로 설정을 해두고, 이제 위에서는 this.로 가져다 쓰기만 하면되지
  constructor(left, top, right, bottom, color) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
    this.isAlive = true;
    this.color = color;
  }

  // # 기능에 해당하는 내용
  // 위에서 draw로 그렸던 내용을 이쪽 함수에 선언하고 이 함수를 이제 가져다 쓰도록 하자
  // 일단 rect안에 들어가는 인자값이 위에서 바꼈기 때문에 배열먼저 만들고 다시 내려오자
  draw() {
    // 위 class에서 선언해준 것들로 변수를 바꿔주자
    if (this.isAlive) {
      context.rect(this.left, this.top, brickWidth, brickHeight);
      context.fillStyle = this.color;
      context.fill();
    }
  }
}

// // 가운데 블록을 생성해보자

class CenterBlock extends Brick {
  movingAction() {
    if (this.left < 0) {
      centerMoveDirX = 1;
    } else if (this.left > canvas.width - brickWidth) {
      centerMoveDirX = -1;
    }
    this.left += centerMoveDirX;
  }
}

let centerBlack = new CenterBlock(
  canvas.width / 2 - 25,
  canvas.height / 2 - 10,
  canvas.width / 2 + 25,
  canvas.height / 2 + 10,
  "black"
);

function centerMoving() {
  centerBlack.movingAction();
}
// update함수에 넣어버리기

// block 그리기
function drawCenterBlock() {
  context.beginPath();
  centerBlack.draw();
  context.closePath();
}

setInterval(draw, 10);
setBricks();

// console.log(centerBlack.left)
// console.log(centerBlack.top)
// console.log(centerBlack.right)
// console.log(centerBlack.bottom)

console.log(black.left)
console.log(black.top)
console.log(black.right)
console.log(black.bottom)