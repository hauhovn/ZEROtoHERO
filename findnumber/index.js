const myBtn = document.getElementById(`myBtn`);
const maxNumberBtn = document.getElementById(`maxNumberBtn`);
const minNumberBtn = document.getElementById(`minNumberBtn`);

let max = Number(maxNumberBtn.value);
let min = Number(minNumberBtn.value);
let answer = myRandom(min,max);

var isRuning = false; 
let counter = 0;

maxNumberBtn.onchange = function(){
    max = Number(maxNumberBtn.value);
}
minNumberBtn.onchange = function(){
    min = Number(minNumberBtn.value);
}

myBtn.onclick = function () {
    // nhieu nguoi choi /??? loi ham random count so luong lown
     isRuning = true; 
    while (isRuning) {
        counter++;
        console.log(`Number = ${answer} MIN = ${min} MAX = ${max} COUNT = ${counter}`)
        input = window.prompt(`Số cần tìm là từ: ${min} đến ${max}`);
        console.log(input);
        if(isNaN(input)&&input!=""){
            window.alert(`VUI LÒNG NHẬP SỐ TỪ ${min} ĐẾN ${max}!`)
            continue;
        }
        if(input>answer){
            window.alert(`Số cần tìm NHỎ hơn!`)
            console.log(`NHỎ hơn`)
        }else if(input<answer){
            window.alert(`Số cần tìm LỚN hơn!`)
            console.log(`LỚN hơn`)
        }else
        if(input==answer){
            isRuning = false;
            answer = myRandom(min,max);
            window.alert(`CHÚC MỪNG BẠN ĐÃ THÀNH CÔNG SAU ${counter} LẦN ĐOÁN!`)
            counter = 0;
        }
    }
}

function myRandom(_min=0,_max=100){
    return Math.floor(Math.random() * (_max - _min) + _min);
}
