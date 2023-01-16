const Screen = require("./screen");
const Cursor = require("./cursor");

class Bejeweled {

  constructor(numRows,numCols) {

    this.playerTurn = "O";

    // Initialize this
    this.grid = Bejeweled.initializeBoard(numRows, numCols);

    this.cursor = new Cursor(numRows, numCols);

    Screen.initialize(numRows, numCols);
    Screen.setGridlines(false);

    this.grid.forEach((row,rowIndex) => {
      row.forEach((col, colIndex) => {
        Screen.setGrid(rowIndex, colIndex, col)
      })
    });

    this.cursor.setBackgroundColor();

    Screen.addCommand('up', 'move cursor up', this.cursor.up.bind(this.cursor));
    Screen.addCommand('down', 'move cursor down', this.cursor.down.bind(this.cursor));
    Screen.addCommand('right', 'move cursor right', this.cursor.right.bind(this.cursor));
    Screen.addCommand('left', 'move cursor left', this.cursor.left.bind(this.cursor));
    Screen.addCommand('return', 'select or deselect fruit', this.cursor.select.bind(this.cursor))

    Screen.render();
  }

  static initializeBoard (numRows, numCols) {
    let emojis = ['🍇','🍊','🍉','🍋','🍌','🍎','🍏','🍑','🍒','🍓','🥝','🥥'];

    let grid = [];

    for (let i = 0; i < numRows; i++) {
      let line = [];
      for (let j = 0; j < numCols; j++) {
        let fruit = emojis[Math.floor(Math.random() * emojis.length)];
        line.push(fruit);
      }
      grid.push(line);
    }

    function checkForGoodGame(grid) {
      let count = {};

      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          let char = grid[i][j];

          if (count[char]) {
            count[char] ++;
          } else {
            count[char] = 1;
          }
        }
      }

      let foundChar = Object.keys(count);

      let i = 0;

      while ( i < foundChar.length) {
        if (count[foundChar[i]] >= 3) {
          return true;
        }
        i++
      }
      return false;
    }

    if (checkForGoodGame(grid)) {
      return grid;
    } else {
      return Bejeweled.initializeBoard(numRows,numCols);
    }
  }

  static checkForMatches(grid) {

    // Fill this in
    //returns an array with location of matches:
    /**
     * [row1, col1], [row2, col2], [row3, col3],true/false
     */

  }

  static removeMatches(grid,locations) {

  }

  static updateBoard(grid) {

  }

  static checkForCombos(grid) {

  }



}

module.exports = Bejeweled;
