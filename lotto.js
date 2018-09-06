//로또 구매 함수
function buyLottos(price, luckyNum){
    
    const genLottoNum = Math.floor(price/1000);
    let genLottos = [];
    
    //구매금액 유효성 체크
    validationMoney(price);
    
    //구매금액 유효성이 통과된 경우
    if(genLottoNum > 0){
        
        //구매금액만큼 로또 객체 생성
        for(let i=0; i<genLottoNum; i++){
            genLottos = genLottos.concat(RandomGeneratelottoNum());
        }   
        
        //생성된 로또 객체 출력
        genLottos.forEach((lottoObj) => {
            console.log(lottoObj.nums);
        });

        //생성된 로또 객체의 번호가 당첨번호가 맞는지 확인
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
   
    //로또 번호가 6개가 될 때까지 반복
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

//당첨 번호와 로또 번호 비교
function setLuckyNumber(genLottos, luckyNum){
    const luckyNumbers = luckyNum
    let result = [0,0,0,0,0,0];
    let idx =0;
    
    //생성된 로또 리스트의 객체만큼 반복
    genLottos.forEach((lottoObj) => {
        //당첨번호와 매치하는 숫자를 리턴하는 함수 호출
        idx = matchNumber(lottoObj, luckyNumbers)-1;
        result[idx]++;
    });

    //결과 출력
    printStatic(genLottos, result);
}

//로또와 당첨 번호 비교 (매치된 갯수 반환)
function matchNumber(lottoObj, luckyNumbers){

    let count = 0;

    //로또 번호 번호 수 만큼 반복
    lottoObj.nums.forEach((lottoNum) => {
        //당첨 번호 수 만큼 반복
        luckyNumbers.forEach((luckyNum) => {
            //로또 번호와 당첨 번호가 같으면 count 1증가
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
