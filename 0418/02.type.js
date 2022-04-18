// 01. 숫자형 Number 
/*
    10진수
    255
    2진수(0b 1111 1111)
            0b => binary number
             126 64 32 16  8 4 2 1 += 255
    179 (0b 1011 0011)

    8진수 (0o000)
             64 8 1
    255 => (0o377)
              192 56 7

    16진수 (0x00)
              16 1 
    255 => (0xff)         
              240 15 
*/

let num = 400;
console.log(num.toString(2));
console.log(num.toString(8));
console.log(num.toString(16));

// 결과값
// 110010000
// 620
// 190

let randomNum0 = Math.random();      // 0.0 ~ 1.0사이의 랜덤한 값(난수) 
let randomNum = Math.random() * 10;  // * 10을 해줌으로써 0~9사이의 난수를 구할 수 있다

console.log(randomNum0);
console.log(randomNum);

console.log(Math.floor(randomNum)); // 내림
console.log(Math.ceil(randomNum)); // 올림
console.log(Math.round(randomNum)); // 반올림

/*
    실습.
    프로그램이 3~10 사이의 랜덤한 값을 지정한다.
    값을 하나 입력 받아서 정답인지 아닌지 출력해준다.
*/

if ( randomNum < 8) {
    console.log("===");     // 구분선
    let answer = Math.floor(randomNum)+3;
    console.log(answer);
    let input = prompt("정답을 입력하세요.", "");

    if ( Math.floor(answer) == input){
        console.log("===");     // 구분선
        console.log("정답입니다.");
    }
}

// 다른풀이
// let inputNum = prompt("정답을 입력하세요.", "");
// let correctNum = Math.floor((Math.random() * 10)) % 8 + 3;
// console.log(correctNum);

// if(inputNum == correctNum){
//     alert("정답입니다");
// } else {
//     alert("틀렸습니다");
// }    