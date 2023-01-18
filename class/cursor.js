const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  up() {

    // Move cursor up
    this.resetBackgroundColor();
    // Move cursor up
    if (this.row > 0) {
      if (this.cursorColor === 'blue') {
        this.swap([-1,0]);
      }

      this.row += -1;

    }

    this.setBackgroundColor();
  }

  down() {
    // Move cursor down

    this.resetBackgroundColor();
    // Move cursor down
    if (this.row < this.numRows - 1) {
      if (this.cursorColor === 'blue') {
        this.swap([1,0]);
      }

      this.row += 1;
    }
    this.setBackgroundColor();
  }

  left() {
    // Move cursor left
    this.resetBackgroundColor();
    // Move cursor left
    if (this.col > 0) {
      if (this.cursorColor === 'blue') {
        this.swap([0,-1]);
      }

      this.col += -1;
    }
    this.setBackgroundColor();
  }

  right() {
    // Move cursor right
    this.resetBackgroundColor();
    // Move cursor right
    if (this.col < this.numCols - 1) {
      if (this.cursorColor === 'blue') {
        this.swap([0,1]);
      }

      this.col += 1;
    }
    this.setBackgroundColor();
  }

  select() {
    // select the item to be swaped
    if (this.cursorColor === 'yellow') {
      this.cursorColor = 'blue';
      this.setBackgroundColor();
    } else if (this.cursorColor === 'blue') {
      this.cursorColor = 'yellow';
      this.setBackgroundColor()
    }
  }

  swap(direction) {

    let currentPosition = [this.row, this.col];
    let currentChar = Screen.grid[this.row][this.col];

    let nextPosition = [this.row + direction[0], this.col + direction[1]];
    let nextChar = Screen.grid[nextPosition[0]][nextPosition[1]];

    Screen.setGrid(...currentPosition, nextChar);
    Screen.setGrid(...nextPosition, currentChar);
  }

}


module.exports = Cursor;
