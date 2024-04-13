import Cell from "./class/cell.js";
import Snake from "./class/snake.js";
import { THEME_COLORS } from "./constants.js";

const score = document.getElementById("score");
const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const GAME_SETTING = {
  WIDTH: 400,
  VERTI_CELL_NUM: 10,
  HEIGHT: 400,
  HORI_CELL_NUM: 10,
  CELL_WIDTH: 40,
  SPACE: 2,
  WALL_WIDTH: 5,
  WALL_COLOR: THEME_COLORS.DARK,
  WALL_STYLE: "solid",
};

// WALL SETTING
canvas.height = GAME_SETTING.HEIGHT;
canvas.width = GAME_SETTING.WIDTH;
canvas.style.border = `${GAME_SETTING.WALL_WIDTH}px ${GAME_SETTING.WALL_STYLE} ${GAME_SETTING.WALL_COLOR}`;

const initCells2 = [
  new Cell(
    120,
    40,
    GAME_SETTING.CELL_WIDTH,
    GAME_SETTING.CELL_WIDTH,
    THEME_COLORS.LIGHT
  ),
  new Cell(80, 40, GAME_SETTING.CELL_WIDTH, GAME_SETTING.CELL_WIDTH),
  new Cell(40, 40, GAME_SETTING.CELL_WIDTH, GAME_SETTING.CELL_WIDTH),
];

const snake = new Snake(initCells2, initCells2.length);
var food = undefined;
var mScore = 0;

// MAIN FUNCTION
function gameLoop() {
  //draw snake
  snake.draw(context);
  //frist spawn food
  if (food == undefined) {
    food = new Cell(
      getRandomCell().x,
      getRandomCell().y,
      GAME_SETTING.CELL_WIDTH,
      GAME_SETTING.CELL_WIDTH,
      'yellow'
    );
    food.draw(context);
  }
  // check walls add next steep to cells
  const next = isSnakeCollideWalls();
  if (next.isChanged) {
    snake.cells.unshift(next.value);
    snake.draw(context);
    snake.removeTeil(context);
  } else {
    //move
    snake.move(context);
  }
   //check die
   if (snake.isDie()) {
    //aler end game
    alert(`Your score: ${mScore}`);
    mScore=0;
    score.textContent=mScore;
    //reset game
    context.clearRect(0,0,GAME_SETTING.WIDTH,GAME_SETTING.HEIGHT)
    console.log(snake.cells.length);
    snake.cells =initCells2;
    console.log(snake.cells.length);
    snake.draw(context)
    spawnFood(context);
  }

  // check snake eat food
  if (snake.eat(food)) {
    snake.grow();
    spawnFood(context);

    mScore++;
    score.textContent = mScore;
  }

  setTimeout(gameLoop, 1000 / 6);
}
gameLoop();
// setInterval(gameLoop, 1000 / 6 / snake.speed)

function initCells() {
  let rs = [];
  let firstX = Math.floor(
    Math.random() * GAME_SETTING.WIDTH * 0.5 - GAME_SETTING.CELL_WIDTH * 3
  );
  let firstY = Math.floor(Math.random() * GAME_SETTING.HEIGHT * 0.5);
  console.log(`x:${firstX} y:${firstY}`);
  for (let i = 0; i < 3; i++) {
    rs.push(
      new Cell(firstX, firstY, GAME_SETTING.CELL_WIDTH, GAME_SETTING.CELL_WIDTH)
    );
    firstX -= GAME_SETTING.CELL_WIDTH;
  }
  return rs;
}

function isSnakeCollideWalls() {
  const nextSteep = snake.getNextStep();
  let isChanged = false;
  if(!nextSteep)return ({isChanged});
  if (nextSteep.x < 0) {
    nextSteep.x = GAME_SETTING.WIDTH - GAME_SETTING.CELL_WIDTH;
    isChanged = true;
  }
  if (nextSteep.x >= GAME_SETTING.WIDTH) {
    nextSteep.x = 0;
    isChanged = true;
  }
  if (nextSteep.y >= GAME_SETTING.HEIGHT) {
    nextSteep.y = 0;
    isChanged = true;
  }
  if (nextSteep.y < 0) {
    nextSteep.y = GAME_SETTING.HEIGHT - GAME_SETTING.CELL_WIDTH;
    isChanged = true;
  }
  return { isChanged, value: nextSteep };
}

function spawnFood(ctx) {
  let isFoodOnSnake;
  do {
    // Tạo vị trí ngẫu nhiên cho thức ăn
    food.x = getRandomCell().x;
    food.y = getRandomCell().y;
    // Mặc định không có thức ăn trên rắn
    isFoodOnSnake = false;
    // Kiểm tra xem vị trí của thức ăn mới có trùng với bất kỳ phần tử nào của rắn không
    for (let i = 0; i < snake.cells.length; i++) {
      const cell = snake.cells[i];
      if (cell.x === food.x && cell.y === food.y) {
        isFoodOnSnake = true;
        break;
      }
    }
  } while (isFoodOnSnake);

  food.draw(ctx);
}

function getRandomCell() {
  const x =
    Math.floor(Math.random() * GAME_SETTING.VERTI_CELL_NUM) *
    GAME_SETTING.CELL_WIDTH;
  const y =
    Math.floor(Math.random() * GAME_SETTING.HORI_CELL_NUM) *
    GAME_SETTING.CELL_WIDTH;
  return { x, y };
}
