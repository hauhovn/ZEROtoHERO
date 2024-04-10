class Cell {
    constructor(x, y, width=0,height=0) {
      this.x = x;
      this.x = y;
      this.width=width;
      this.height=height;
    }
    set x(x) {
      if (typeof x == "number" && Math.floor(x) == x) {
        this._x = x;
      } else {
        console.error(`Cell class: Số ${x} không phải số nguyên`);
      }
    }
    set y(y) {
      if (typeof y == "number" && Math.floor(y) == y) {
        this._y = y;
      } else {
        console.error(`Cell class: Số ${y} không phải số nguyên`);
      }
    }

    set width(width){
      if(typeof width == "number" && width>=0){
        this._width=width;
      }else{
        console.error(`Cell class: Width ${width} không đúng`);
      }
    }
    set height(height){
      if(typeof height == "number" && height>=0){
        this._height=height;
      }else{
        console.error(`Cell class: height ${height} không đúng`);
      }
    }
  
    get x() {
      return this._x;
    }
  
    get y() {
      return this._y;
    }
    get width(){
      return this._width;
    }
    get height(){
      return this._height;
    }
  
    displayCell(){
      console.log(`[${this.x}:${this.y}][${this.width} x ${this.height}]`);
    }
  }

  export default Cell;