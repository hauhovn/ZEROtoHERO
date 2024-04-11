import { DIRECTION } from "../text-constants.js";

export default class Snake {
  constructor(cells, speed = 1, direction = DIRECTION.RIGHT) {
    this.cells = cells;
    this.speed = speed;
    this.direction = direction;
    document.addEventListener("keydown", this.keydown);
  }
  draw(ctx) {
    this.cells.forEach((cell) => {
      cell.draw(ctx);
    });
  }
  eat(food) {
    food.log(`Your food:`);
  }

  die() {}

  
  
  keydown(e) {
   //Event Listener
    if (DIRECTION.UP.includes(e.code) && DIRECTION.UP !== this.direction) {
      // key up
      this.direction = DIRECTION.UP;
      console.log(this.direction);
    }
    if (DIRECTION.DOWN.includes(e.code) && DIRECTION.DOWN !== this.direction) {
      // key down
      this.direction = DIRECTION.DOWN;
      console.log(this.direction);
    }
    if (
      DIRECTION.RIGHT.includes(e.code) &&
      DIRECTION.RIGHT !== this.direction
    ) {
      // key right
      this.direction = DIRECTION.RIGHT;
      console.log(this.direction);
    }
    if (DIRECTION.LEFT.includes(e.code) && DIRECTION.LEFT !== this.direction) {
      //key left
      this.direction = DIRECTION.LEFT;
      console.log(this.direction);
    }
  }
}
