import { DIRECTION } from "../text-constants.js";
import Cell from "./cell.js";

export default class Snake {
    constructor(cells, speed = 1, direction = DIRECTION.RIGHT) {
        this.cells = cells;
        this.speed = speed;
        this.direction = direction;
        // document.addEventListener("keydown", (e) => this.keydown(e));
        this.keydown = this.keydown.bind(this);
        document.addEventListener("keydown", this.keydown);
    }
    // set cells(cells) { this.cells = cells }
    draw(ctx) {
        this.cells.forEach((cell) => {
            cell.draw(ctx);
        });

    }
    move(ctx) {
        // add new head
        const nextSteep = this.getNextStep()
        if (nextSteep == null) console.log(nextSteep);
        this.cells.unshift(nextSteep);
        // draw snake
        this.draw(ctx)
        //remove teil
        this.cells[this.cells.length - 1].clear(ctx);
        this.cells.pop();
    }

    eat(food) {
        food.log(`Your food:`);
    }

    getNextStep() {
        const newCell = Cell.clone(this.cells[0]);
        // console.log(this.direction);
        // get new location
        if (this.direction === DIRECTION.UP) {
            newCell.y -= newCell.height;
        }
        if (this.direction === DIRECTION.DOWN) {
            newCell.y += newCell.height;
        }
        if (this.direction === DIRECTION.RIGHT) {
            newCell.x += newCell.width;
        }
        if (this.direction === DIRECTION.LEFT) {
            newCell.x -= newCell.width;
        }
        if (newCell == this.cells[0]) return null;
        // newCell.color = `#` + Math.floor(Math.random() * 16777215).toString(16);
        return newCell;
    }


    keydown = (e) => {
        //Event Listener
        if (DIRECTION.UP.includes(e.code) &&
            DIRECTION.UP !== this.direction &&
            DIRECTION.DOWN !== this.direction
        ) {
            // key up
            this.direction = DIRECTION.UP;
            // console.log(this.direction);
        }
        if (DIRECTION.DOWN.includes(e.code) &&
            DIRECTION.DOWN !== this.direction &&
            DIRECTION.UP !== this.direction
        ) {
            // key down
            this.direction = DIRECTION.DOWN;
            // console.log(this.direction);
        }
        if (DIRECTION.RIGHT.includes(e.code) &&
            DIRECTION.RIGHT !== this.direction &&
            DIRECTION.LEFT !== this.direction
        ) {
            // key right
            this.direction = DIRECTION.RIGHT;
            // console.log(this.direction);
        }
        if (DIRECTION.LEFT.includes(e.code) &&
            DIRECTION.LEFT !== this.direction &&
            DIRECTION.RIGHT !== this.direction
        ) {
            //key left
            this.direction = DIRECTION.LEFT;
            // console.log(this.direction);
        }
    }
}
