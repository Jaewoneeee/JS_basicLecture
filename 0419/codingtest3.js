/*
    [소수만들기]
    주어진 숫자 중 3개의 수를 더했을 때 소수가 되는 경우의 개수를 구하려고 합니다. 숫자들이 들어있는 배열 nums가 매개변수로 주어질 때, 
    nums에 있는 숫자들 중 서로 다른 3개를 골라 더했을 때 소수가 되는 경우의 개수를 return 하도록 solution 함수를 완성해주세요.

    제한사항
    - nums에 들어있는 숫자의 개수는 3개 이상 50개 이하입니다.
    - nums의 각 원소는 1 이상 1,000 이하의 자연수이며, 중복된 숫자가 들어있지 않습니다.

*/


function checkPrimeNumber(num)
{
    for(let i = 2; i < num; i++)  // 1과 자기 자신은 어차피 나눠짐, 따라서 그 사이의 수를 검증할 필요가 있다.
    {
        if( num % i == 0) {  // 내가 모른거 %를 막상 쓸 줄 모르네?
            //소수가아님을 표시
            return false
        } 
    }
    return true;
 }


//solution([1, 2, 3, 4]);
solution([1, 2, 7, 6, 4]);
        
function solution(nums){

    let sumNumber = 0;
    let count = 0;
    // 1. 숫자 세개를 골라서 합하는 코드
    for (let i = 0; i < nums.length; i++) 
    {
        for(let j = i+1; j < nums.length; j++)
        {
            for(let k = j+1; k <nums.length; k++)
            {
                sumNumber = nums[i] + nums[j] + nums[k];
                console.log(sumNumber);

                if(checkPrimeNumber(sumNumber)) {
                    count++;
                }
            }
        }
    }
    console.log(count);
}
    // 2. 그 숫자가 소수인지 판단하는 코드

    //return result;

// 핵심은 문제를 쪼개서 할 수 있는 만큼까지만 짜는 능력을 기르는것이 중요하다 
// // 1. 숫자 세개를 골라서 합하는 코드

// 왜 몰랐는가?
// - 3중포문 
// - 소수 판단하기