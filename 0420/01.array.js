let testArray = [1, 2, 3, 4, 5]

let testArray2 = new Array(5); // 이런식으로 배열을 만들 수 있다

let obj = { ball : 1, goal : 3};
let testArray3 = [1, '2', obj, []] // 배열안에 인자로 여러 타입이 들어갈 수 있다 

// console.log(testArray);
// console.log(testArray2);
// console.log(testArray3);

// 1번 : 짝수, 홀수 등등 특정 i값을 필요로할때 접근하면 좋을듯
for(let i = 0; i < testArray.length; i++){
    testArray[i];
}

// 2번 : 그냥 순차적으로 사용하고 싶을때 접근하면 좋겠지
testArray[0] = 100
testArray.forEach(function (number, index, arr){
    console.log("number + ", number, "index : ", index, "arr + ", arr);
})




// 1. 이 둘을 사용하면 stack을 이용하는 것과 같다. (뒤쪽으로 넣고빼기)
testArray.push(30);
console.log(testArray)

testArray.pop(); //매개변수 없음. 맨뒤에 있는게 삭제 
console.log(testArray);

// 2. 앞쪽으로 추가삭제
testArray.unshift(300);
console.log(testArray);

testArray.shift(); // 매개변수 없음. 빼주기만 하기 때문
console.log(testArray);

// 배열이라는 친구는 연속된 메모리가 잡혀있다. 따라서 코드가 길어진다면 이 방법은 추천하지 않음
// 메모리 구조상 앞쪽에 무언갈 넣고 뒤쪽 인덱스로 하나씩 더해주는 구조. 처리할 양이 많아진다.

// map개념
let arrayMultiple = testArray.map( x => x * 2);
console.log(arrayMultiple);

