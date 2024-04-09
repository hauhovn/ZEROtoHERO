const myBtn = document.getElementById(`myBtn`);
const maxNumberBtn = document.getElementById(`maxNumberBtn`);
const minNumberBtn = document.getElementById(`minNumberBtn`);

const addPlayerText = document.getElementById(`addPlayerText`);
const addPlayerBtn = document.getElementById(`addPlayerBtn`);
const deleteAllBtn = document.getElementById(`deleteAllBtn`);
const listPlayer = document.getElementById(`listPlayer`);

const myH1 = document.querySelector("#myH1");

const PLAYER_LIST_KEY = 'player-list-KEY';

let max = Number(maxNumberBtn.value);
let min = Number(minNumberBtn.value);
let answer = myRandom(min, max);

let isRuning = false;
let counter = 0;
let playerData;
let isEdit = -1;
let isReset = false;

let isMultiPlayerMODE = false;
let thuTuChoi = 0;

renderplayerData(checkLocalData())

maxNumberBtn.onchange = function () {
    max = Number(maxNumberBtn.value);
}
minNumberBtn.onchange = function () {
    min = Number(minNumberBtn.value);
}

myH1.addEventListener('click', function () {
    myH1.style.color = colorRandom()
})

document.getElementById("multiPlayBtn").onclick = function () { isMultiPlayerMODE = true; startPlay() }
document.getElementById("myBtn").onclick = function () { isMultiPlayerMODE = false; startPlay() }

function startPlay() {
    // nhieu nguoi choi /??? loi ham random count so luong lown // choi nhieu vong` // tong ket diem
    isRuning = true;
    resetCountPlayer()

    while (isRuning) {
        console.log(`Number = ${answer} MIN = ${min} MAX = ${max} COUNT = ${counter} MULTI_MODE = ${isMultiPlayerMODE}`)
        input = window.prompt(`Số ${isMultiPlayerMODE ? playerData[thuTuChoi].ten : "bạn"} cần tìm là từ: ${min} đến ${max}`);

        console.log(input);
        if (isNaN(input) && input != "") {
            window.alert(`${isMultiPlayerMODE ? playerData[thuTuChoi].ten : ""} VUI LÒNG NHẬP SỐ TỪ ${min} ĐẾN ${max}!`)
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
                window.alert(`CHÚC MỪNG ${isMultiPlayerMODE ? playerData[thuTuChoi].ten : "BẠN"} ĐÃ THÀNH CÔNG SAU ${isMultiPlayerMODE ? playerData[thuTuChoi].soLanChoi : counter} LẦN ĐOÁN!`)                
                
                playerData[thuTuChoi].diemSo = playerData[thuTuChoi].diemSo + 1;
                thuTuChoi = 0;
                
                isMultiPlayerMODE ? localStorage.setItem(PLAYER_LIST_KEY, JSON.stringify(playerData)) : counter = 0
                renderplayerData(playerData);
            }

        if (isMultiPlayerMODE) {
            let slc = playerData[thuTuChoi].soLanChoi;
            playerData[thuTuChoi].soLanChoi = slc + 1;
            if (thuTuChoi == playerData.length - 1 || !isRuning) thuTuChoi = 0; else thuTuChoi++
        } else
            counter++;
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
    if (addPlayerText.value == "") return;
    //lay gia tri
    let newPlayer = { ten: addPlayerText.value, diemSo: 0, soLanChoi: 1, mauSac: colorRandom() };
    console.log(`newPlayer `, newPlayer)
    //kiem tra add - edit
    if (isEdit == -1) {
        //them moi
        checkLocalData()
        playerData.unshift(newPlayer)
    } else {
        // chinh sua
        playerData[isEdit].ten = addPlayerText.value;
        isEdit = -1;
    }
    //update
    localStorage.setItem(PLAYER_LIST_KEY, JSON.stringify(playerData));
    addPlayerText.value = ""
    renderplayerData(playerData)
}

deleteAllBtn.onclick = function () {
    localStorage.removeItem(PLAYER_LIST_KEY);
    renderplayerData(playerData = [])
}


function renderplayerData(players) {
    console.log(`khong render`, players)
    if (players == []) return
    console.log(`render`, players)
    let content = '<ul>'
    players.forEach((item, index) => {
        content +=
            `<li>
        <div>
            <div style="background-color: ${item.mauSac}" class="player-color-point"></div>
            <p class="player-name">${item.ten} (${item.diemSo})</p>
        </div>
        <div>
            <a href="#" class="resetBtn" onclick=resetPlayer("${index}")  id="reset${index}">Reset</a>
            <a href="#" class="editBtn" onclick=editPlayer("${index}")  id="edit${index}">Edit</a>
            <a href="#" class="deleteBtn" onclick=deletePlayer("${index}") id="delete${index}">Delete</a>
        </div>
         </li>
     <hr>`
    })
    content += '<ul>';
    listPlayer.innerHTML = content;
    let slnc = playerData.length;
    document.querySelector("#soLuongPlayer").textContent = `SỐ LƯỢNG NGƯỜI CHƠI (${slnc})`
    document.getElementById("multiPlayBtn").disabled = slnc > 1 ? false : true
    //document.querySelector("#listPlayer").innerHTML = content;
}

function deletePlayer(id) {
    if (confirm(`Xoa nguoi choi: ${playerData[id].ten}`)) {
        playerData.splice(id, 1);
        renderplayerData(playerData);
    }
}

function editPlayer(id) {
    isEdit = id;
    console.log(`chinh sua editPlayer ${isEdit}`)
    addPlayerText.value = playerData[id].ten;
}

function resetPlayer(id) {
    playerData[id].diemSo = 0;
    playerData[id].soLanChoi = 1;
    playerData[id].mauSac = colorRandom();
    renderplayerData(playerData);
}

function checkLocalData() {
    let readData = JSON.parse(localStorage.getItem(PLAYER_LIST_KEY));
    readData == null ? playerData = [] : playerData = readData;
    return playerData

}

function resetCountPlayer() {
    playerData.forEach((item, index) => {
        playerData[index].soLanChoi = 1;
    })
}