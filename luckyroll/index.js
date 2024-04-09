const GAME_TIME = 2;
const RESULT_RULES = [
    { codeResult: 0, text: `SMALL`, resultColor: "#ff1717" },
    { codeResult: 1, text: `BAO~`, resultColor: "#6aff17" },
    { codeResult: 2, text: `BIG`, resultColor: "#0d61ff" }
];


const result = document.getElementById(`result`);
const time = document.getElementById(`time`);
const info = document.getElementById(`info`);
const history = document.getElementById(`history`);

let currentGameTime = GAME_TIME;
let historys = [];

setInterval(() => {

    time.textContent = `Time: ${currentGameTime}s`
    if (currentGameTime == 0) {

        let result1 = Math.floor(Math.random() * (7 - 1) + 1)
        let result2 = Math.floor(Math.random() * (7 - 1) + 1)
        let result3 = Math.floor(Math.random() * (7 - 1) + 1)

        let RS = RESULT_RULES[caculatorResult(result1, result2, result3)];
        info.style.color = RS.resultColor;
        //XLy
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let second = date.getSeconds();

        let game = {
            time: `${hours}:${minutes}:${second}`,
            result1: result1,
            result2: result3,
            result3: result2
        }
        historys.unshift(game);
        renderHistoryItem(historys);

        // update UI
        info.textContent = RS.text;
        result.innerHTML =
            `<img src="./images/dice-${result1}.svg">
            <img src="./images/dice-${result2}.svg">
            <img src="./images/dice-${result3}.svg">`
        // reset game
        currentGameTime = GAME_TIME;
    }
    currentGameTime--;

}, 1000);

function renderHistoryItem(historys = []) {
    let content = `<ul>`;
    historys.forEach((item) => {
        let resultCacu = caculatorResult(item.result1, item.result2, item.result3);
        content += `<li>
        <p>${item.time}</p>
        <div>
        <img src="./images/dice-${item.result1}.svg">
        <img src="./images/dice-${item.result2}.svg">
        <img src="./images/dice-${item.result3}.svg">
        <p>[${item.result1}] [${item.result2}] [${item.result3}]</p>
        <p style="color: ${RESULT_RULES[resultCacu].resultColor}">${RESULT_RULES[resultCacu].text}</p>
        </div>
    </li>
        `;
    })
    content += `</ul>`;

    history.innerHTML = content;
}
function caculatorResult(result1, result2, result3) {
    let sumRS = result1 + result2 + result3;
    if (sumRS == 3 || sumRS == 18) {
        return 1;
    } else if (sumRS <= 10) {
        return 0;
    } else {
        return 2;
    }
}