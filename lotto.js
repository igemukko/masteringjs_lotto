//로또 구매 함수
function buyLottos(price, luckyNum){
    
    const genLottoNum = Math.floor(price/1000);
    let genLottos = [];
    
    validationMoney(price);
    
    if(genLottoNum > 0){
        
        for(let i=0; i<genLottoNum; i++){
            genLottos = genLottos.concat(RandomGeneratelottoNum());
        }   
        
        genLottos.forEach((lottoObj) => {
            console.log(lottoObj.nums);
        });

        setLuckyNumber(genLottos, luckyNum);
    }  
}
//구매 금액 유효성 체크
function validationMoney(price){

    const ErrorMsg = {
        "MIN_MONEY" : "1000원이상 구매 가능합니다.",
        "MAX_MONEY" : "한번에 구매할 수 있는 최대 금액은 100000원입니다. "
    }

    if(price < 1000 ) console.log(ErrorMsg.MIN_MONEY);
    else if(price > 100000) console.log(ErrorMsg.MAX_MONEY);

}

//로또 번호 생성
function RandomGeneratelottoNum(){
    
    const lottoObj = {
        "nums":[]
    };
    let tmplotto = [];
   
    while(lottoObj.nums.length < 6){
        //임시 로또 번호 생성
        tmplotto = tmplotto.concat(Math.floor(Math.random()*45)+1);
        //중복 제거
        lottoObj.nums = tmplotto.filter((item, idx, array) => {
            return array.indexOf(item) === idx;
        });   
    }
    
    return lottoObj;
    
}

//
function setLuckyNumber(genLottos, luckyNum){
    const luckyNumbers = luckyNum
    let result = [0,0,0,0,0,0];
    let idx =0;
    
    genLottos.forEach((lottoObj) => {
        idx = matchNumber(lottoObj, luckyNumbers)-1;
        result[idx]++;
    });

    printStatic(genLottos, result);
}

//로또와 당첨 번호 비교 (매치된 갯수 반환)
function matchNumber(lottoObj, luckyNumbers){

    let count = 0;

    lottoObj.nums.forEach((lottoNum) => {
        luckyNumbers.forEach((luckyNum) => {
            if(lottoNum === luckyNum){
                count ++;
            }
        });
    });
 
    return count;
}

//결과 출력하기
function printStatic(genLottos, result){
   
    let revenue = (5000 * result[2]) + (1500000 * result[3])+ (1500000 * result[4]) + (200000000 * result[5])/(genLottos.length * 1000) * 100;

    console.log("1개 일치 (0원)- " + result[0] +"개");
    console.log("2개 일치 (0원)- " + result[1] +"개");
    console.log("3개 일치 (5000원)- " + result[2] +"개");
    console.log("4개 일치 (50000원)- " + result[3] +"개");
    console.log("5개 일치 (1500000원)- " + result[4] +"개");
    console.log("6개 일치 (200000000원)- " + result[5] +"개");
    console.log("나의 수익률은 " + revenue + "입니다.");
    
}

buyLottos(2000, [1,2,3,4,5,6]);
