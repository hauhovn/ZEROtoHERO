const myLabel = document.getElementById("myLabel");
const tangBtn = document.getElementById("tangBtn");
const resetBtn = document.getElementById("resetBtn");
const giamBtn = document.getElementById("giamBtn");
const startBtn = document.getElementById("startBtn");
const myInput = document.getElementById("myInput");
const myInputSpeed = document.getElementById("myInputSpeed");

let counter = 0;
let isRuning = false;

resetBtn.onclick = function () {
    counter = 0;
    console.log(counter);
    myLabel.textContent = counter;
    myInput.value = myInputSpeed.value = 1;
}
function changeNumber(_isGiam, _thamSo = 1) {
    if (!_isGiam) {
        counter += _thamSo;
    } else
        if (counter != 0) {
            counter -= _thamSo;
        }
    console.log(`current:`, counter);
    myLabel.textContent = counter;
}

giamBtn.onclick = function () {
    changeNumber(true, Number(myInput.value));
}

tangBtn.onclick = function () {
    changeNumber(false, Number(myInput.value));
}
startBtn.onclick = function () {
    if (!check()) return;
    var countdown = setInterval(() => {
        changeNumber(true, 1);
        if (counter == 0) {
            clearInterval(countdown);
            isRuning = false;
        }
    }, 1000 / Number(myInputSpeed.value));
}

function check() {
    if (counter > 0 && isRuning) {
        console.log(`Runing . .  . can NOT start`);
        window.alert(`Quá trình đang diễn ra!`)
        return false;
    } else {
        isRuning = true;
        console.log(`START countdown`);
        return true;
    }
}