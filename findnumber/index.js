const myBtn = document.getElementById(`myBtn`);
const maxNumberBtn = document.getElementById(`maxNumberBtn`);
const minNumberBtn = document.getElementById(`minNumberBtn`);

const addPlayerText = document.getElementById(`addPlayerText`);
const addPlayerBtn = document.getElementById(`addPlayerBtn`);
const listPlayer = document.getElementById(`listPlayer`);



const myH1 = document.querySelector("#myH1");

let max = Number(maxNumberBtn.value);
let min = Number(minNumberBtn.value);
let answer = myRandom(min, max);

let isRuning = false;
let counter = 0;

let playerData = [];

const PLAYER_LIST_KEY = 'player-list-KEY';

maxNumberBtn.onchange = function () {
    max = Number(maxNumberBtn.value);
}
minNumberBtn.onchange = function () {
    min = Number(minNumberBtn.value);
}

myH1.addEventListener('click', function () {
    myH1.style.color = colorRandom()
})

myBtn.onclick = function () {
    // nhieu nguoi choi /??? loi ham random count so luong lown // choi nhieu vong` // tong ket diem
    isRuning = true;
    while (isRuning) {
        counter++;
        console.log(`Number = ${answer} MIN = ${min} MAX = ${max} COUNT = ${counter}`)
        input = window.prompt(`Số cần tìm là từ: ${min} đến ${max}`);
        console.log(input);
        if (isNaN(input) && input != "") {
            window.alert(`VUI LÒNG NHẬP SỐ TỪ ${min} ĐẾN ${max}!`)
            continue;
        }
        if (input > answer) {
            window.alert(`Số cần tìm NHỎ hơn!`)
            console.log(`NHỎ hơn`)
        } else if (input < answer) {
            window.alert(`Số cần tìm LỚN hơn!`)
            console.log(`LỚN hơn`)
        } else
            if (input == answer) {
                isRuning = false;
                answer = myRandom(min, max);
                window.alert(`CHÚC MỪNG BẠN ĐÃ THÀNH CÔNG SAU ${counter} LẦN ĐOÁN!`)
                counter = 0;
            }
    }
}

function myRandom(_min = 0, _max = 100) {
    return Math.floor(Math.random() * (_max - _min) + _min);
}

function colorRandom() {
    let cl_1 = Math.floor(Math.random() * (252 - 10) + 10);
    let cl_2 = Math.floor(Math.random() * (252 - 20) + 20);
    let cl_3 = Math.floor(Math.random() * (252 - 30) + 30);
    return `rgb(${cl_1},${cl_2},${cl_3})`;
}

addPlayerBtn.onclick = function () {
    //them moi
    let newPlayer = { ten: addPlayerText.value, diemSo: 0, soLanChoi: 0, mauSac: colorRandom() };
    playerData.push(newPlayer);
    console.log(playerData);
    addPlayerText.value = ""
    // localStorage.setItem(PLAYER_LIST_KEY, JSON.stringify(playerData));
    renderplayerData(playerData)
    // chinh sua
}


function renderplayerData(players) {

    let content = '<ul>'
    players.forEach((item, index) => {
        console.log(item)
        content += `<li>
            <div style="background-color: ${item.mauSac}">${item.ten}</div>
            <a href="#" onclick=editPlayer("${index}") class="editBtn" id="edit${index}">Edit</a>
            <a href="#" onclick=deletePlayer("${index}") class="deleteBtn" id="delete${index}">Delete</a>
         </li>`
    })
    content += '<ul>';
    listPlayer.innerHTML = content;
    //document.querySelector("#listPlayer").innerHTML = content;
}

function deletePlayer(id) {
    if (confirm(`Xoa nguoi choi: ${playerData[id].ten}`)) {
        playerData.splice(id, 1);
        renderplayerData(playerData);
    }
}

function editPlayer(id) {
    window.alert(`edit ${id}`)
}