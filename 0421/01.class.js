// /* 
//     ## 클래스 Class

//     함수 생성자 

// // 벽돌 left, top, right, bottom, col, row, pos + 움직이는 기능 

// */

// // 기존에 만들었던거
// // let brick = {  //이렇게 구조를 잡겠다는 형태
// //     left : 0,
// //     right : 0, 
// //     top : 0, 
// //     bottom : 0,
// // }

// // 옛날 ES6 이전버전

// function Brick(left, top, right, bottom){
//     this.left = left;
//     this.top = top;
//     this.right = right;
//     this.bottom = bottom;
//     // this.movingAction = function () { console.log('움직이는중!')}
//     // 함수를 20개를 만들지 않고, prototype에 한번만 만들어줌.
// }

// //let tempBrick = new brick(0, 0, 10, 10,);

// // 프로토타입이 뭐냐 그래서? 

// Brick.prototype.movingAction = function () { this.left++; console.log('움직이는중!')}

// for(let i = 0; i < 20; i++){
//     let tempBrick = new Brick(0, 0, 10, 10,);
//     tempBrick.movingAction()
// }

// // 메모리 관점에서 연산을 여러번 하게됨? 이게 맞는 말인가 

// tempBrick.movingAction()
// console.log(tempBrick)

// // =============================

// // ES6 이후 class가 도입됨에 따라 prototype을 굳이 쓸 필요가 없어짐.
// // class 훨씬 더 직관적이라는 장점이 있구만 
// class Brick2 {
//     // 속성에 해당하는 내용
//     constructor(left, top, right, bottom){
//         this.left = left;
//         this.top = top;
//         this.right = right;
//         this.bottom = bottom;
//     }

//     // 기능에 해당하는 내용
//     movingAction() {
//         this.left++; console.log('움직이는중!')
//     }
// }

// ====================

class Brick {
    // 속성에 해당하는 내용
    constructor(left, top, right, bottom){
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
}

// 요론걸 이제 상속이라고 함 
class MovingBrick extends Brick {
    // 기능에 해당하는 내용
    movingAction() {
        this.left++; 
        console.log('움직이는중!');
        this.top++;
    }
}

// MovingBrick();
let test = new Brick(130, 20, 410, 10)
let test2 = new MovingBrick(3, 0, 0, 0)
console.log(test.left)
test2.movingAction();
console.log(test2)


// 아