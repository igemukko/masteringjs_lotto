let generateResult = [];
let luckyNum =[];

//로또 구매 함수
function buyRotto(price){
    
    //에러메시지
    const errorMsg = "1000원이상 구매 가능합니다.";
    //1장당 1000원 이므로 구매하려는 금액/1000을 수행하여 구매하려는 로또 복권의 수 구하기
    const gernerateNum = price/1000;
    
    //1000원 이하 입력 시 에러 메시지 출력
    if(price < 1000) return errorMsg;
    
    //구매하려는 장 수만큼 로또 번호 객체를 생성하는 함수 호출 , 그 결과를 배열에 넣는다.
    for(let i=0; i<gernerateNum; i++){
        generateResult = generateResult.concat(RandomGenerateRottoNum());
    }   
    //각 로또 객체가 가지고 있는 번호를 콘솔에 출력
    generateResult.forEach(function (a){
        console.log(a.num);
    });
}

//6개의 로또 번호를 생성->객체에 담아서 리턴하는 함수
function RandomGenerateRottoNum(){
    
    let rotto = new Object();
    rotto.num = [];
    let tmpRotto = [];
   
    //로또 객체의 번호배열의 길이가 6보다 작을 때까지 반복한다.
    while(rotto.num.length < 6){
        //1이상 45이하의 랜덤한 숫자를 생성하여 임시 배열에 숫자를 넣는다.
        tmpRotto = tmpRotto.concat(Math.floor(Math.random()*45)+1);
        //임시 배열의 숫자 중 중복이 있을 경우 중복을 제거하고 로또 객체의 로또 번호 배열에 넣는다. 
        rotto.num = tmpRotto.filter((item, idx, array) => {
            return array.indexOf(item) === idx;
        });   
    }
    
    return rotto;
    
}

// 당첨 번호와 로또 객체 번호를 비교하여 당첨된 갯수 확인
function setLuckyNumber(luckyNumber){
    //함수 호출 시 입력된 당첨번호를 전역 변수에 할당한다. 
    luckyNum = luckyNumber;
    //당첨 결과를 넣을 배열을 선언한다.
    let matchResult = [0,0,0,0,0,0];
    let tmpIndex =0;
    //생성된 로또 장수만큼 반복을 실행
    for(let i of generateResult){
        //로또 번호와 당첨번호를 비교하여 매치된 갯수를 카운트한 결과를 반환하는 함수를 호출한다. 
        //매치된 결과를 인덱스로 하여 해당 배열[인덱스]의 값을 1 증가시킨다.
        tmpIndex = matchNumber(i)-1;
        matchResult[tmpIndex]++;
    }

    //결과 출력 함수 호출
    printStatic(matchResult);
}
//전달받은 로또와 당첨 번호를 비교하여 매치된 갯수를 반환하는 함수
function matchNumber(obj){

    //매치된 갯수를 카운트하기 위한 변수 선언
    let matchCount = 0;
    //배열에 넣어져 있는 로또 번호를 하나씩 가져오기
    for(let i of obj.num){
        //배열에 넣어져 있는 당첨 번호를 하나씩 가져오기
        for(let j of luckyNum){
            //당첨 번호와 로또 번호가 맞으면 count++
            if(i===j) matchCount++
        }
    }
    return matchCount;
}
//결과 출력하기
//결과 출력하기
function printStatic(matchResult){
   
    let revenue = (5000 * matchResult[2]) + (1500000 * matchResult[3])+ (1500000 * matchResult[4]) + (200000000 * matchResult[5])/(generateResult.length * 1000) * 100;

    console.log("1개 일치 (0원)- " + matchResult[0] +"개");
    console.log("2개 일치 (0원)- " + matchResult[1] +"개");
    console.log("3개 일치 (5000원)- " + matchResult[2] +"개");
    console.log("4개 일치 (50000원)- " + matchResult[3] +"개");
    console.log("5개 일치 (1500000원)- " + matchResult[4] +"개");
    console.log("6개 일치 (200000000원)- " + matchResult[5] +"개");
    console.log("나의 수익률은 " + revenue + "입니다.");
    
}

buyRotto(2000);
setLuckyNumber([1,2,3,4,5,6]);
