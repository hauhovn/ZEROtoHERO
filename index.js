const myH1 = document.getElementById("myH1");
const myBtn = document.getElementById("myBtn");

myBtn.onclick = function(){
    console.log(`hello word`);
    myH1.textContent=myH1.innerText + ` :hello`
}