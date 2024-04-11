import Cell from "./class/cell.js";
import Snake from "./class/snake.js";
import { THEME_COLORS } from "./constants.js";

const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
canvas.height = 450;
canvas.width = 450;

let sCells = [
  new Cell(10, 10, 40, 40),
  new Cell(50, 10, 30, 30),
  new Cell(90, 10, 20, 20),
];
const food = new Cell(150, 150, 50, 50);
const snake = new Snake(sCells);
snake.draw(context);
console.log(snake);
