// 1. 테스트 호출할 이 놈부터 만드는거 

//let sum = 0;


let sum = 0;
solution([4, 7, 12],[true,false,true]);

function solution(absolutes, signs){
    
    for( i = 0; i < absolutes.length; i++){
        if(signs[i]){
            sum += absolutes[i];
        } else {
            sum -= absolutes[i]
        }
    }
    console.log(sum);
} 