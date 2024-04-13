import { THEME_COLORS } from '../constants.js'
export default class Cell {
    constructor(x, y, width = 0, height = 0, color = THEME_COLORS.SECOND) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    static clone(obj) {
        return new Cell(obj.x, obj.y, obj.width, obj.height);
    }
    // setters
    set x(x) {
        if (typeof x == "number") {
            this._x = x;
        } else {
            console.error(`Cell CLASS: Số ${x} không phải số nguyên`);
        }
    }
    set y(y) {
        if (typeof y == "number") {
            this._y = y;
        } else {
            console.error(`Cell CLASS: Số ${y} không phải số nguyên`);
        }
    }

    set width(width) {
        if (typeof width == "number" && width >= 0) {
            this._width = width;
        } else {
            console.error(`Cell CLASS: Width ${width} không đúng`);
        }
    }
    set height(height) {
        if (typeof height == "number" && height >= 0) {
            this._height = height;
        } else {
            console.error(`Cell CLASS: height ${height} không đúng`);
        }
    }
    //getters
    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }

    log(title = '') {
        console.log(`${title}[${this.x}:${this.y}][${this.width} x ${this.height}]`);
    }

    draw(ctx,color=null) {
        // setCommonStyle(ctx);
        color==null?ctx.fillStyle = this.color:ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }


    clear(ctx) {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}
function setCommonStyle(ctx){
    ctx.shadowColor = "#d53";
    ctx.shadowBlur = 20;
    ctx.lineJoim = "bevel";
    ctx.lineWidth = 5;
}
