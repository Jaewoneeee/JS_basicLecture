// // 옛날 ES6 이전버전

// function Brick(left, top, right, bottom){
//     this.left = left;
//     this.top = top;
//     this.right = right;
//     this.bottom = bottom;
//     this.movingAction = function () { console.log('움직이는중!')}
//     // 함수를 20개를 만들지 않고, prototype에 한번만 만들어줌.
// }

// let tempBrick = new Brick(5, 20, 10, 15);

// //console.log(tempBrick);

// // ===================
// // 위에 코드에서 함수를 따로 빼줘서 prototype으로 설정을 해주면?
// // 프로토타입이 그래서 뭐야? 암튼 안쓰게됨
// // 메모리 관점에서 자꾸 쌓이게 되니까 좋지 않음?

// Brick.prototype.movingAction = function () { this.left++; console.log('움직이는중!')}

// for(let i = 0; i < 20; i++){
//     let tempBrick = new Brick(1, 4, 10, 17);
//     tempBrick.movingAction()
// }

// ====================
// ES6 이후 class가 도입됨에 따라 prototype을 굳이 쓸 필요가 없어짐.
// class 훨씬 더 직관적이라는 장점이 있구만 
class Brick2 {
    // 속성에 해당하는 내용
    constructor(left, top, right, bottom){
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }

    // 기능에 해당하는 내용
    // movingAction() {
    //     this.left++; console.log('움직이는중!')
    // }
}

// 위처럼 한번에 할 수도 있고 아래와 같이 상속 개념으로 빼줄수 도 있음

// 요론걸 이제 상속이라고 함 
class MovingBrick extends Brick2 {
    // 기능에 해당하는 내용
    movingAction2() {
        this.left++; 
        this.top++;
        console.log('움직이는중!');
    }
}

// MovingBrick();
let test = new Brick2(130, 20, 410, 10)
let test2 = new MovingBrick(3, 0, 0, 0)
console.log(test.left)
console.log(test)
test2.movingAction2();
console.log(test2)

