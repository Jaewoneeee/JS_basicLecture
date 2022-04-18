// 01. 변수명 이름 규칙
/*
    1. 알파벳, _, -, 숫자 
     1_1. 숫자가 제일 앞에 올 수 없다.!!.!!>!!

    2. camel 표기법
     let myLongLongName;

    3. 대소문자 구분 

    // 팀원과 맞출 수 있는게 중요

*/

// 02. 변수
// 1.var - 가장 오래된 버전에서 사용하는 변수 타입 
console.log(varName);   // 호이스팅 , 브라우저 엔진 위에서 변수가 먼저 선언이 되고 구동이 된다 (Javascropt의 작동원리를 이해해야함) 컴파일과 런타임
var varName = 50;       // 메모리는 잡혔지만 값을 넣는건 컴파일 중에 일어난다. 따라서 값이 찍히지 않음. 
console.log(varName);   // 여기서 찍히는건 알 수 있음

if (true) {
    // 다른 영역
    var varName = 'var test';
};
console.log(varName);   // 다른 영역에서 선언한 내용이 또 나온다

// 전역변수와 지역변수
// var는 전역변수로 설정되기 때문에 메모리 관점에서도 좋지않다

// 2.let
// 지역변수로서 사용할 수 있다
let letName = 'kjw';
console.log(letName); // kjw

if (true) {
    let letName = 'jaewon';
    console.log(letName); // jaewon
}
console.log(letName); // kjw

// 3.const 
const constName = "const!!"; // 값이 수정될 일이 없는 변수
console.log(constName);
// constName = 'change'; //위에서 선언되었기 때문에 에러가난다

// alt + shift + a 부분주석