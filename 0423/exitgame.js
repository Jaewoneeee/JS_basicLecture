const canvas = document.getElementById('myCanvas');    
const context = canvas.getContext('2d');   

// keydown
document.addEventListener("keydown", keyDownEeventHandler);


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
  console.log(randomNumberX);
  console.log(randomNumberY);


  let exitBlock = new Brick(
    randomNumberX * 80, // this.left  // 여기를 80씩 변경하면 움직일 수 있을듯
    randomNumberY * 80, // this.top   // 여기를 80씩 변경하면 움직일 수 있을듯
    0, // this.right
    0, // this.bottom
    "blue", // this.color 
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

setInterval(draw, 10);
setBricks();

