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

// 변수 선언
 let userChoice ;
 let HP = 10;
 let Gold = 0;

 function info() {
    document.getElementById("hp").innerHTML =  "HP : " + HP;
    document.getElementById("gold").innerHTML =   "Gold : " + Gold;
 }

 // 이동할 수 있도록
 let playerState = true;

// 가위바위보
  let computerChoice = Math.random();

  if (computerChoice < 0.34) {
    computerChoice = "바위";
  } else if(computerChoice <= 0.67) {
    computerChoice = "보";
  } else {
    computerChoice = "가위";
  } 
  console.log("Computer: " + computerChoice);


function keyDownEeventHandler(e) {

    let monsterOn = Math.floor(Math.random() * 10)
    console.log(monsterOn)
    if(monsterOn < 3){
      //alert("여기다 가위바위보 구현, 몬스터 출현!")
      playerState = false;
      let userChoice = prompt("가위, 바위, 보 중 하나를 입력하세요", );
      //prompt("가위, 바위, 보 중 하나를 입력하세요");
      console.log(userChoice);
      //let test = userChoice
      //document.write(userChoice)

      compare(userChoice,computerChoice);
      
    } 
    // else {
    //   playerState = true;
    // }

    if(e.key == 'ArrowRight' && setPlayer.left < canvas.width - playerMoving && playerState) {
        setPlayer.left += playerMoving; 
    } else if (e.key == 'ArrowLeft' && setPlayer.left > 0  && playerState) {
        setPlayer.left -= playerMoving;
    } else if  (e.key == 'ArrowUp' && setPlayer.top > 0 && playerState) {
        setPlayer.top -= playerMoving;
    } else if  (e.key == 'ArrowDown' && setPlayer.top < canvas.height - playerMoving && playerState) {
        setPlayer.top += playerMoving;
    }  
}

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
    
    //let userChoice;

    if (isCollisionRectToRect(crashPlayer, crashMonster) && userChoice == null) {
      //let userChoice;
      let userChoice = prompt("가위, 바위, 보 중 하나를 입력하세요", );
       //prompt("가위, 바위, 보 중 하나를 입력하세요");
       console.log(userChoice);
       //let test = userChoice
       //document.write(userChoice)

       compare(userChoice,computerChoice);
      //  if(!userChoice === null){
      //    alert("확인")
      //  }
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
        console.log("무승부!")
        playerState = false;
    }
    else if(choice1==="바위")
    {
        if(choice2==="가위")
        {
            console.log("승리!")
            playerState = true;
            Gold += 300;
            console.log("HP : " + HP + " / Gold : " + Gold)
            info()
        }
        else
        {
            console.log("패배!")
            playerState = false;
            HP -= 1
            console.log("HP : " + HP + " / Gold : " + Gold)
            info()
        }
    }
    else if(choice1==="보")
    {
        if(choice2==="바위")
        {
            console.log("승리!")
            playerState = true;
            Gold += 300;
            console.log("HP : " + HP + " / Gold : " + Gold)
            info()
        }
        else
        {
            console.log("패배!")
            playerState = false;
            HP -= 1
            console.log("HP : " + HP + " / Gold : " + Gold)
            info()
        }
    }
    else if(choice1==="가위")
    {
        if(choice2==="보")
        {
            console.log("승리!")
            playerState = true;
            Gold += 300;
            console.log("HP : " + HP + " / Gold : " + Gold)
            info()
        }
        else
        {
            console.log("패배!")
            playerState = false;
            HP -= 1
            console.log("HP : " + HP + " / Gold : " + Gold)
            info()
        }
    }
}

setInterval(draw, 10);
setInterval(update, 10);
//setInterval(info, 100);
info();
setBricks();
//compare(userChoice,computerChoice);// 함수 호출!

