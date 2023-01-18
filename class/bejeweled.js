const Screen = require("./screen");
const Cursor = require("./cursor");

class Bejeweled {

  constructor(numRows,numCols) {

    this.score = 0;
    this.cursor = new Cursor(numRows, numCols);

    Screen.initialize(numRows, numCols);
    Screen.setGridlines(false);
    Bejeweled.initializeBoard();

    this.cursor.setBackgroundColor();


    Screen.addCommand('up', 'move cursor up', () => this.runCommand.call(this,'up'));
    Screen.addCommand('down', 'move cursor down', () => this.runCommand.call(this,'down'));
    Screen.addCommand('right', 'move cursor right', () => this.runCommand.call(this,'right'));
    Screen.addCommand('left', 'move cursor left', () => this.runCommand.call(this,'left'));
    Screen.addCommand('return', 'select or deselect fruit', () => this.runCommand.call(this,'return'))

    Screen.setMessage(`Total Score: ${this.score}`);

    Screen.render();
  }

  async runCommand(command) {
    if (command === 'return') {
      this.cursor.select();
      return;
    }

    if (command === 'up') {
      this.cursor.up();
    } else if (command === 'down') {
      this.cursor.down();
    } else if (command === 'right') {
      this.cursor.right();
    } else if (command === 'left') {
      this.cursor.left();
    }

    let matches = Bejeweled.checkForMatches();

    if(matches === null) {
      Bejeweled.endGame.call(this);
    }

    if (matches !== undefined && matches !== null) {
      if (Object.keys(matches).length > 0) {

        //add points.
        let pointsAdded = Bejeweled.countPoints(matches,command);


        this.cursor.resetBackgroundColor();
        this.cursor.cursorColor = 'yellow';

        let fruits = Object.keys(matches);

        fruits.forEach(fruit => {
          matches[fruit].forEach(location => {
            let row = location[0];
            let col = location[1];
            Screen.setBackgroundColor(row, col, 'green')
          })
        })

        Screen.setMessage(`+ ${pointsAdded} points\n\nTotal Score: ${this.score += pointsAdded}`);

        await Bejeweled._sleep(250);

        fruits.forEach(fruit => {
          matches[fruit].forEach(location => {
            let row = location[0];
            let col = location[1];
            Screen.setBackgroundColor(row, col, 'black')
          })
        })

        Bejeweled.removeMatches(matches);

        Bejeweled._dropCharacters();

        await Bejeweled._sleep(250);

        Bejeweled.updateBoard();

        await Bejeweled._sleep(250);

        Screen.setMessage(`Total Score: ${this.score}`)

        this.cursor.setBackgroundColor();

        this.runCommand('');
      }
    }

  }

  static initializeBoard () {
    let grid = [];

    for (let i = 0; i < Screen.numRows; i++) {
      let line = [];
      for (let j = 0; j < Screen.numCols; j++) {
        let fruit = Bejeweled._getRandomFruit();
        line.push(fruit);
      }
      grid.push(line);
    }

    grid.forEach((row,rowIndex) => {
      row.forEach((col, colIndex) => {
        Screen.setGrid(rowIndex, colIndex, col)
      })
    });

    if (Bejeweled._checkForGoodGame() && Object.keys(Bejeweled.checkForMatches()).length === 0) {
      return grid;
    } else {
      return Bejeweled.initializeBoard();
    }
  }

  static checkForMatches() {

    if (!Bejeweled._checkForGoodGame(Screen.grid,Screen.grid.length, Screen.grid[0].length)) {
      return null;
      //return null if no viable game (end of game)
    }

    //return empty object {} if viable game but no matches
    let matches = {};


    // horizontal checks
    for (let row = 0; row < Screen.grid.length; row++) {

      for (let col = 0; col < Screen.grid[0].length - 1; col++) {
        let match = [[row,col]];

        let char = Screen.grid[row][col];
        let nextCol = col + 1

        //gather all the signs that are the same in a row
        while (char === Screen.grid[row][nextCol] && nextCol < Screen.grid[0].length) {
          match.push([row, nextCol]);
          nextCol++;
        }

        char = Screen.grid[row][col];

        //push to the main object if there are at least 3 identical signs
        if (match.length >= 3) {
          if (matches[char] !== undefined){
            matches[char].push(...match);
          } else {
            matches[char] = match;
          }

          //move to the next sign
          col = nextCol;
        }

      }
    }

    // vertical checks
    for (let col = 0; col < Screen.grid[0].length; col++) {

      for (let row = 0; row < Screen.grid.length - 1; row++) {
        let match = [];

        let char = Screen.grid[row][col];
        let nextRow = row;

        //gather all the signs that are the same in a column
        while (char === Screen.grid[nextRow][col]) {
          match.push([nextRow, col]);
          nextRow++;

          //stop the checks if at the end of the column
          if (nextRow === Screen.grid.length) {
            char = 'X';
            nextRow--;
          }
        }

        char = Screen.grid[row][col];

        //push to the main object if there are at least 3 identical signs
        if (match.length >= 3) {
          if (matches[char] !== undefined){
            matches[char].push(...match);
          } else {
            matches[char] = match;
          }

          //move to the next sign
          row = nextRow;
        }

      }
    }

    return matches;

  }

  static removeMatches(matches) {
    //create master array with all the locations
    let locations = [];
    let chars = Object.keys(matches);

    chars.forEach(char => {
      locations.push(...matches[char]);
    })

    //remove the signs at locations.
    locations.forEach(location => {
      Screen.setGrid(...location,'  ');
    })

    Screen.render();
  }

  static updateBoard() {

    Bejeweled._fillUpSpace();

    let i = 0;

    if (Bejeweled._checkForGoodGame() && i < 50) {
      return;
    } else {
      Bejeweled._fillUpSpace();
      i++;
    }
  }

  static countPoints(matches,command) {
    let point = 10;

    if(command === '') {
      point = 15;
    }

    let fruits = Object.keys(matches);

    let pointsAdded = 0;

    fruits.forEach(fruit => {
      matches[fruit].forEach(() => {
        pointsAdded += point;
      })
    })

    return pointsAdded;
  }

  static endGame() {
    let finalScore = this.score;

    Screen.addCommand('y', 'Start a new Game', () => {
      Bejeweled.initializeBoard();
      this.score = 0;
      Screen.setMessage(`Total Score: ${this.score}`);
      Screen.render();
    });

    Screen.addCommand('n', 'End the Game', () => {
      Screen.setMessage(`Final Score: ${finalScore}`);
      Screen.render();
      Screen.quit();
    });

    Screen.setMessage(
      `GAME OVER!!!\n\nFinal Score: ${finalScore} points\n\nWould you like to start a new game? (y/n)`);

    Screen.render()
  }

  static _dropCharacters() {

    for (let col = 0; col < Screen.grid[0].length; col++) {
      //start from the bottom
      for (let row = Screen.grid.length - 1; row > 0; row--) {
        //if cell empty
        if (Screen.grid[row][col] === '  ') {
          //go up in row until char found
          let prevRow = row - 1;
          while (Screen.grid[prevRow][col] === '  ' && prevRow > 0) {
            prevRow--;
          }

          let previousChar = Screen.grid[prevRow][col];

          if (previousChar === '  ') {
            row = 0;
          } else {
            // set new char in original empty
            Screen.setGrid(row,col,previousChar);
            // set found char location to empty
            Screen.setGrid(prevRow,col,'  ');
            // move up.
          }
        }
      }
    }
  }

  static checkForCombos(grid) {

  }

  static _fillUpSpace() {
    Screen.grid.forEach((row,rowIndex) => {
      row.forEach((col, colIndex) => {
        if( Screen.grid[rowIndex][colIndex] === '  ') {
          Screen.setGrid(rowIndex, colIndex, Bejeweled._getRandomFruit());
        }
      })
    });
  }

  static _checkForGoodGame() {
    let count = {};

    for (let i = 0; i < Screen.numRows; i++) {
      for (let j = 0; j < Screen.numCols; j++) {
        let char = Screen.grid[i][j];

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

  static _getRandomFruit(){
    let emojis = ['🍇','🍊','🍉','🍋','🍌','🍎','🍏','🍑','🍒','🍓','🥝','🥥'];

    let randomFruit = emojis[Math.floor(Math.random() * emojis.length)];

    return randomFruit;
  }

  static _sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

}

module.exports = Bejeweled;
