/*
    비동기 처리

    동기 처리 

*/

const { timeout } = require("nodemon/lib/config");

// JS에선 앞에 내용이 뭐든 상관없이 ()가 붙으면 함수라 생각하고 호출한다 
//let a = 0;
//a();
// 함수가 아니기 때문에 에러가 난다. 

// 동기 처리 (순차적으로)
function testFunc1() {
    console.log('testFunc1()');

    let startTime = new Date().getTime(); // Date라는 객체를 하나 만든다음에 현재시간을 불러옴
    while(new Date().getTime() - startTime < 2000);  // while문에 ture일때 반복이된다

    testFunc2();
}

function testFunc2() {
    console.log('testFunc2()')
}

testFunc1();



// 비동기 처리 
// Promise
                            // 얘내는 인자이면서 함수를 호출할 수 있는 놈들임 (함수 포인터)
const promise = new Promise( (resolve, reject) => {
                //new는 runtime중에 메모리에 

    /*
        시간이 오래 걸리는 실행문... 5초 
    */
   // 얘내는 성공과 실패의 개념. 둘중 하나만 실행된다/ 
   // 밑에서 볼수 있듯이 성공한 놈을 먼저 호출한다 즉 resolve부터 audlt1을 먼저 호출
   resolve();
   reject();
});

      //then은 resolve와 연결 // catch는 reject와 연결 
promise.then(() => {
        console.log('1. promise() then() called');
    }).catch(() => {
        console.log('2. promise() catch() called');
    });


// call stack
// 함수는 호출한 순서대로 아래서부터 차곡차곡 쌓인다 
// 함수가 종료되면 위에서 부터 해제가 된다 

// function asyncCheckAdult(age) {
//     return new Promise( (resolve, reject) => {
//         if (age >= 20) resolve(age);
//         else reject(age);
//     })
// }

// const promiseCheckAdult = asyncCheckAdult(15);
// promiseCheckAdult.then( (age) => {
//     console.log(`${age} is adult!`);
// }).catch((age) => {
//     console.log(`${age} is not adult!`)
// })

// const promiseCheckAdult1 = asyncCheckAdult(23);
// promiseCheckAdult1.then( (age) => {
//     console.log(`${age} is adult!`);
// }).catch((age) => {
//     console.log(`${age} is not adult!`)
// })


testAsyncAwaitFunc();

// 여기까지 배운 Promise는 사실상 예전 버전
// async, await을 배워보자

// async
async function asyncCheckAdult(age, timeout) {
    // 위와 다른점은 앞에 async를 붙여주는것과
    // Promise 구문, resolve,reject를 써주지 않아도 된다는것
    // 훨씬더 편해짐 (다만 위에대한 이해가 없다면 내부구조를 더욱 모르게 되겠지)
    if (age >= 20) return age;            
    else throw new Error(age);
}


async function asyncTimeoutCheckAdult(age, timeout) {
    // 위와 다른점은 앞에 async를 붙여주는것과
    // Promise 구문, resolve,reject를 써주지 않아도 된다는것
    // 훨씬더 편해짐 (다만 위에대한 이해가 없다면 내부구조를 더욱 모르게 되겠지)
    if (age >= 20) {
        setTimeout( () => {
            console.log(`await되냐 ${age}`)
            return age
        }, timeout)
    }         
    else throw new Error(age);
}

// awiat은 async함수 안에서만 작동한다
async function testAsyncAwaitFunc() {

    await asyncTimeoutCheckAdult(100, 3000)

    const promiseCheckAdult = asyncCheckAdult(15);
    promiseCheckAdult.then( (age) => {
        console.log(`${age} is adult!`);
    }).catch((age) => {
        console.log(`${age} is not adult!`)
    })
    
    const promiseCheckAdult1 = asyncCheckAdult(23);
    promiseCheckAdult1.then( (age) => {
        console.log(`${age} is adult!`);
    }).catch((age) => {
        console.log(`${age} is not adult!`)
    })
}

// await : (일반) 함수가 종료될 때까지 기다린다. 
// await 키워드 사용 함수의 종료를 기다리지 않고 다음 함수를 호출한다 

// 지금 여기서 나오는 실행순서를 잘 봐야한다
// 위에서 먼저 호출을 하는것 / promise에서 성공 실패 둘중하나만 나오는거 
// 이후에 성공을 먼저 찍는거 / await에선 함수가 끝나고 실행되는거




// async await
async function timeoutCheckAdult(age, timeout) {
    
    console.log(`${age}. timeoutCheckAdult`);
    await setTimeoutPromise(timeout);
    console.log(`${age}. timeoutCheckAdult`);

    if (age > 20) return true;
    return false;
}

async function asyncCheckAdult(age) {
    if (age >= 20)  { return age; }
    else throw new Error(age);
}

// await 키워드 사용 함수의 종료를 기다리지 않고 다음 함수를 호출한다.

// function asyncCheckAdult(age) {
//     return new Promise((resolve, reject) => {
//         if (age >= 20)  resolve(age);
//         else    reject(age);
//     })
// }

async function testAsyncAwaitFunc()
{
    // timeoutCheckAdult(10, 8000);
    // timeoutCheckAdult(20, 5000);
    // timeoutCheckAdult(30, 1000);

    // await timeoutCheckAdult(10, 8000);
    // await timeoutCheckAdult(20, 5000);
    // await timeoutCheckAdult(30, 1000);


    let promises = [];

    promises.push(timeoutCheckAdult(10, 8000));
    promises.push(timeoutCheckAdult(20, 5000));
    promises.push(timeoutCheckAdult(30, 1000));

    let results = await Promise.all(promises);
    console.log(results);


    // const promiseCheckAdult = asyncCheckAdult(10);
    // promiseCheckAdult.then((age) => {
    //     console.log(`${age} is adult!!`);
    // }).catch((age) => {
    //     console.log(`${age} is not adult!!`);
    // });
    
    // const promiseCheckAdult1 = asyncCheckAdult(21);
    // promiseCheckAdult1.then((age) => {
    //     console.log(`${age} is adult!!`);
    // }).catch((age) => {
    //     console.log(`${age} is not adult!!`);
    // });
}

testAsyncAwaitFunc();