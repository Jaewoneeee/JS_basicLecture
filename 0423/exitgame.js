const canvas = document.getElementById('myCanvas');    
const context = canvas.getContext('2d');   
//let userChoice = prompt("가위, 바위, 보 중 하나를 입력하세요");
// keydown
document.addEventListener("keydown", keyDownEeventHandler);

// 충돌 객체 만들기
let crashPlayer = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };

let crashExit = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
};

let crashMonster = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
};

// 가위바위보
let computerChoice = Math.random();

if (computerChoice < 0.34) {
	computerChoice = "바위";
} else if(computerChoice <= 0.67) {
	computerChoice = "보";
} else {
	computerChoice = "가위";
} console.log("Computer: " + computerChoice);


function keyDownEeventHandler(e) {
    if(e.key == 'ArrowRight' && setPlayer.left < canvas.width - playerMoving) {
        setPlayer.left += playerMoving; 
    } else if (e.key == 'ArrowLeft' && setPlayer.left > 0) {
        setPlayer.left -= playerMoving;
    } else if  (e.key == 'ArrowUp' && setPlayer.top > 0) {
        setPlayer.top -= playerMoving;
    } else if  (e.key == 'ArrowDown' && setPlayer.top < canvas.height - playerMoving) {
        setPlayer.top += playerMoving;
    }  
}

//let userChoice = '';

function update() {

    crashPlayer.left = setPlayer.left;
    crashPlayer.right = setPlayer.left + brickWidth;
    crashPlayer.top = setPlayer.top;
    crashPlayer.bottom = setPlayer.top + brickHeight;

    crashExit.left = exitBlock.left;
    crashExit.right = exitBlock.left + brickWidth;
    crashExit.top = exitBlock.top;
    crashExit.bottom = exitBlock.top + brickHeight;

    crashMonster.left = randomMonster.left;
    crashMonster.right = randomMonster.left + brickWidth;
    crashMonster.top = randomMonster.top;
    crashMonster.bottom = randomMonster.top + brickHeight;



    //console.log(crashExit)
    if (isCollisionRectToRect(crashPlayer, crashExit)) {
        setTimeout(function() {
            alert('Game Clear!',location.reload());
          }, 100);
      }
    
    if (isCollisionRectToRect(crashPlayer, crashMonster)) {
      let userChoice = prompt("가위, 바위, 보 중 하나를 입력하세요");
    }

}

// 충돌확인
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

// 블록만들기
const brickWidth = 70; 
const brickHeight = 70; 
const brickColumn = 10;
const brickRow = 10;
let playerMoving = 80;
let brickArray; 

function setBricks() {
  brickArray = []; // why? 여기서 다시 선언해주는거지?

  for (let i = 0; i < brickRow; i++) {
    brickArray[i] = [];
    for (let j = 0; j < brickColumn; j++) {

      brickArray[i][j] = new Brick(
        j * (brickWidth + 10), // this.left
        i * (brickHeight + 10), // this.top
        j * (brickWidth + 10), // this.right
        i * (brickHeight + 10), // this.bottom
        "gray", // this.color
        brickWidth, // widht
        brickHeight
      );
    }
  }
}



function draw() {

    // 화면 클리어
    context.clearRect(0, 0, canvas.width, canvas.height);

    // 다른 도형 그리기
    drawBricks();
    drawPlayer()
    drawExitBlock()
    drawRandomMonster()
}

class Brick {
    constructor(left, top, right, bottom, color, width, height) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
        this.color = color;
        this.width = width;
        this.height = height;
    }

    draw() {
        context.rect(this.left, this.top, this.width, this.height);
        context.fillStyle = this.color;
        context.fill();
        }
}

function drawBricks() {
    context.beginPath();
    for (let i = 0; i < brickRow; i++) {
      for (let j = 0; j < brickColumn; j++) {
     
        brickArray[i][j].draw();
      }
    }
    context.closePath();
  }

  let setPlayer = new Brick(
    0, // this.left  // 여기를 80씩 변경하면 움직일 수 있을듯
    0, // this.top   // 여기를 80씩 변경하면 움직일 수 있을듯
    0, // this.right
    0, // this.bottom
    "black", // this.color 
    brickWidth, // this.width
    brickHeight // this.height   
  );


  let randomNumberX = Math.floor(Math.random() * 10);
  let randomNumberY = Math.floor(Math.random() * 10);
  let randomMonsterX = Math.floor(Math.random() * 10);
  let randomMonsterY = Math.floor(Math.random() * 10);
  //console.log(randomNumberX);
  //console.log(randomNumberY);


  let exitBlock = new Brick(
    randomNumberX * 80, // this.left  // 여기를 80씩 변경하면 움직일 수 있을듯
    randomNumberY * 80, // this.top   // 여기를 80씩 변경하면 움직일 수 있을듯
    0, // this.right
    0, // this.bottom
    "blue", // this.color 
    brickWidth, // this.width
    brickHeight // this.height   
  );

  let randomMonster = new Brick(
    randomMonsterX * 80, // this.left  // 여기를 80씩 변경하면 움직일 수 있을듯
    randomMonsterY * 80, // this.top   // 여기를 80씩 변경하면 움직일 수 있을듯
    0, // this.right
    0, // this.bottom
    "yellow", // this.color 
    brickWidth, // this.width
    brickHeight // this.height   
  );

function drawPlayer() {
    context.beginPath();
    setPlayer.draw();
    context.closePath();
}

function drawExitBlock() {
    context.beginPath();
    exitBlock.draw();
    context.closePath();
}

function drawRandomMonster() {
    context.beginPath();
    randomMonster.draw();
    context.closePath();
}


function compare(choice1, choice2)// 함수 정의
{
    if(choice1===choice2)
    {
        console.log("The result is a tie!")
        return "The result is a tie!";
    }
    else if(choice1==="바위")
    {
        if(choice2==="가위")
        {
            return "바위 wins";
        }
        else
        {
            return "보 wins";
        }
    }
    else if(choice1==="보")
    {
        if(choice2==="바위")
        {
            return "보 wins";
            
        }
        else
        {
            return "가위 wins";
        }
    }
}

setInterval(draw, 10);
setInterval(update, 10);
setBricks();
compare(userChoice,computerChoice);// 함수 호출!
