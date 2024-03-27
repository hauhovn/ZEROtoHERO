const myLabel = document.getElementById("myLabel");
const tangBtn = document.getElementById("tangBtn");
const resetBtn = document.getElementById("resetBtn");
const giamBtn = document.getElementById("giamBtn");
const startBtn = document.getElementById("startBtn");

let counter = 0;

tangBtn.onclick = function(){
    counter++;
    console.log(counter);
    myLabel.textContent = counter;
}

resetBtn.onclick = function(){
    counter=0;
    console.log(counter);
    myLabel.textContent = counter;
}
function giam(){
    counter==0?counter=0:counter--;
    console.log(counter);
    myLabel.textContent = counter;
}

giamBtn.onclick = giam();

startBtn.onclick = setInterval(() => {
    giam();
}, 1000);
