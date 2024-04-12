import Cell from "./class/cell.js";
import Snake from "./class/snake.js";
import { THEME_COLORS } from "./constants.js";

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const GAME_SETTING = {
    WIDTH: 400,
    HEIGHT: 400,
    CELL_WIDTH: 40,
    SPACE: 2,
    WALL_WIDTH: 5,
    WALL_COLOR: THEME_COLORS.DARK,
    WALL_STYLE: 'solid'
}

// WALL SETTING
canvas.height = GAME_SETTING.HEIGHT;
canvas.width = GAME_SETTING.WIDTH;
canvas.style.border = `${GAME_SETTING.WALL_WIDTH}px ${GAME_SETTING.WALL_STYLE} ${GAME_SETTING.WALL_COLOR}`

const initCells2 = [
    new Cell(120, 40, GAME_SETTING.CELL_WIDTH, GAME_SETTING.CELL_WIDTH, THEME_COLORS.LIGHT),
    new Cell(80, 40, GAME_SETTING.CELL_WIDTH, GAME_SETTING.CELL_WIDTH),
    new Cell(40, 40, GAME_SETTING.CELL_WIDTH, GAME_SETTING.CELL_WIDTH),
]

const snake = new Snake(initCells2, 0.5);
var count = 0;
// console.log(snake);
function gameLoop() {

    console.log(`snake length: `, snake.cells.length);
    snake.draw(context);
    // check walls
    const nextSteep = snake.getNextStep();
    if (nextSteep.x < 0) {
        snake.cells[0].x = GAME_SETTING.WIDTH + GAME_SETTING.CELL_WIDTH;
    }
    if (nextSteep.x > GAME_SETTING.WIDTH) {
        snake.cells[0].x = 0 - GAME_SETTING.CELL_WIDTH;
    }
    if (nextSteep.y > GAME_SETTING.HEIGHT) {
        snake.cells[0].y = 0 - GAME_SETTING.CELL_WIDTH;
    }
    if (nextSteep.y < 0) {
        snake.cells[0].y = GAME_SETTING.HEIGHT - GAME_SETTING.CELL_WIDTH;
    }
    snake.move(context);
    // set speed
    // if (count > 10) { snake.speed = 2; }
    // if (count > 20) { snake.speed = 3; }
    // if (count > 30) { snake.speed = 4; }
    // count++
    setTimeout(gameLoop, 1000 / (6 * snake.speed));
}
gameLoop()
// setInterval(gameLoop, 1000 / 6 / snake.speed)

function initCells() {
    let rs = [];
    let firstX = Math.floor(Math.random() * GAME_SETTING.WIDTH * .5 - GAME_SETTING.CELL_WIDTH * 3);
    let firstY = Math.floor(Math.random() * GAME_SETTING.HEIGHT * .5);
    console.log(`x:${firstX} y:${firstY}`);
    for (let i = 0; i < 3; i++) {
        rs.push(new Cell(firstX, firstY, GAME_SETTING.CELL_WIDTH, GAME_SETTING.CELL_WIDTH));
        firstX -= GAME_SETTING.CELL_WIDTH;
    } return rs;
}