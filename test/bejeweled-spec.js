const { expect } = require('chai');

const Bejeweled = require("../class/bejeweled.js");
// let { grid } = require('../class/screen.js');
const Screen = require('../class/screen');

describe ('Bejeweled', function () {

  describe('initializeBoard', function () {
    // * test1: empty board becomes filled up

    it('should fill-up an empty board completely', function () {
      let grid = [];

      expect(grid).to.deep.equal([]);

      let numRows = 3;
      let numCols = 3;

      Screen.initialize(numRows,numCols);

      Bejeweled.initializeBoard();

      let filledGrid = [];

      for (let i = 0; i < numRows; i++) {
        let filledLine = [];

        for (let j = 0; j < numCols; j++) {
          if(Screen.grid.length === 0) {
            filledLine.push(0);
          } else if (Screen.grid[i][j]) {
            filledLine.push(1);
          } else {
            filledLine.push(0);
          }
        }
        filledGrid.push(filledLine);
      }

      let checkGrid = [];

      for (let i = 0; i < numRows; i++) {
        let filledLine = [];
        for (let j = 0; j < numCols; j++) {
            filledLine.push(1);
        }
        checkGrid.push(filledLine);
      }

      expect(filledGrid).to.deep.equal(checkGrid);
    })

    it('should provide at least 3 of the same emoji',function () {
      let numRows = 3;
      let numCols = 3;

      let grid = Bejeweled.initializeBoard(numRows,numCols);


      let checkForGoodGame = function (grid) {
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

      expect(checkForGoodGame(grid)).to.be.true;

    })

  });

  describe('checkForMatches', function () {
  // Add tests for a valid swap that matches 3 (in both directions)

    it('should return an empty object if no matches', function () {
      let grid = [
        ['🍏','🍏','🍉'],
        ['🍌','🍎','🍏'],
        ['🍋','🍌','🍎']
      ];

      Screen.initialize(3,3);

      grid.forEach((row,rowIndex) => {
        row.forEach((col, colIndex) => {
          Screen.setGrid(rowIndex, colIndex, col)
        })
      });

      let match = {};

      let actual = Bejeweled.checkForMatches();

      expect(actual).to.deep.equal(match);
    })

    it('should identify a match (3 in a row)', function () {
      let grid = [
        ['🍇','🍊','🍉','🍉','🍋','🍌','🍎','🍎'],
        ['🍋','🍌','🍎','🍎','🍌','🍌','🍎','🍎'],
        ['🍏','🍏','🍏','🍏','🍋','🍏','🍏','🍏']
      ];

      Screen.initialize(3,8);

      grid.forEach((row,rowIndex) => {
        row.forEach((col, colIndex) => {
          Screen.setGrid(rowIndex, colIndex, col)
        })
      });

      let match = {
        '🍏':[
          [2,0],
          [2,1],
          [2,2],
          [2,3],
          [2,5],
          [2,6],
          [2,7]
        ]
      };

      let actual = Bejeweled.checkForMatches(grid);

      expect(actual).to.deep.equal(match);
    })

    it('should identify a match (3 in a column)', function () {
      let grid = [
        ['🍇','🍊','🍉'],
        ['🍋','🍌','🍉'],
        ['🍌','🍌','🍉'],
        ['🍋','🍋','🍌'],
        ['🍌','🍌','🍉'],
        ['🍋','🍋','🍉'],
        ['🍋','🍋','🍉'],
      ];

      Screen.initialize(7,3);

      grid.forEach((row,rowIndex) => {
        row.forEach((col, colIndex) => {
          Screen.setGrid(rowIndex, colIndex, col)
        })
      });

      let match = {
                  '🍉':[
                      [0,2],
                      [1,2],
                      [2,2],
                      [4,2],
                      [5,2],
                      [6,2]
                    ]
                  };

      let actual = Bejeweled.checkForMatches(grid);

      expect(actual).to.deep.equal(match);
    })

    it('should identify multiple matches in multiple directions', function () {
      let grid = [
        ['🍇','🍇','🍇'],
        ['🍋','🍌','🍉'],
        ['🍌','🍌','🍌'],
        ['🍋','🍌','🍉'],
        ['🍋','🍌','🍉']
      ];

      Screen.initialize(5,3);

      grid.forEach((row,rowIndex) => {
        row.forEach((col, colIndex) => {
          Screen.setGrid(rowIndex, colIndex, col)
        })
      });

      let match = {
                  '🍇' :[
                      [0,0],
                      [0,1],
                      [0,2]
                    ],
                    '🍌': [
                      [2,0],
                      [2,1],
                      [2,2],
                      [1,1],
                      [2,1],
                      [3,1],
                      [4,1]
                    ]
                  };

      let actual = Bejeweled.checkForMatches(grid);

      expect(actual).to.deep.equal(match);
    })

    it('should determine if no possible valid moves', function () {
      let grid = [
        ['🍇','🍊','🍉'],
        ['🍌','🍎','🍏'],
        ['🍋','🍌','🍎']
      ];

      Screen.initialize(3,3);

      grid.forEach((row,rowIndex) => {
        row.forEach((col, colIndex) => {
          Screen.setGrid(rowIndex, colIndex, col)
        })
      });

      let match = null;

      let actual = Bejeweled.checkForMatches(grid);

      expect(actual).to.deep.equal(match);
    })



  });

  describe('removeMatches', function () {

    it('should remove all matches (horizontal and vertical)', function () {

      let grid = [
        ['🍇','🍇','🍇'],
        ['🍋','🍌','🍉'],
        ['🍌','🍌','🍌'],
        ['🍋','🍌','🍉'],
        ['🍋','🍌','🍉']
      ];

      Screen.initialize(5,3);

      grid.forEach((row,rowIndex) => {
        row.forEach((col, colIndex) => {
          Screen.setGrid(rowIndex, colIndex, col)
        })
      });

      let removed = [
        ['','',''],
        ['🍋','','🍉'],
        ['','',''],
        ['🍋','','🍉'],
        ['🍋','','🍉']
      ];

      let matches = Bejeweled.checkForMatches(Screen.grid);

      Bejeweled.removeMatches(matches);

      expect(Screen.grid).to.deep.equal(removed);
    })

    // it('should remove vertical matches', function () {
    //   let grid = [
    //     ['🍇','🍊','🍉'],
    //     ['🍋','🍌','🍉'],
    //     ['🍋','🍌','🍉']
    //   ];

    //   let removed = [
    //     ['🍇','🍊',''],
    //     ['🍋','🍌',''],
    //     ['🍋','🍌','']
    //   ];

    //   let matches = Bejeweled.checkForMatches(grid);

    //   let actual = Bejeweled.removeMatches(grid, matches);

    //   expect(actual).to.deep.equal(removed);
    // })

  });

  describe('_dropCharacters', function () {

    it('should shift charaters down if vertical match removed', function () {
      let grid = [
        ['🍉','🍊','🍉','🍊','🍉'],
        ['🍇','🍉','🍇','🍉','🍉'],
        ['🍇','🍊','  ','🍊','🍇'],
        ['🍋','🍌','  ','🍌','🍉'],
        ['🍋','🍌','  ','🍌','🍉']
      ];

      Screen.initialize(5,5);

      grid.forEach((row,rowIndex) => {
        row.forEach((col, colIndex) => {
          Screen.setGrid(rowIndex, colIndex, col)
        })
      });

      let updated = [
        ['🍉','🍊','  ','🍊','🍉'],
        ['🍇','🍉','  ','🍉','🍉'],
        ['🍇','🍊','  ','🍊','🍇'],
        ['🍋','🍌','🍉','🍌','🍉'],
        ['🍋','🍌','🍇','🍌','🍉']
      ];

      Bejeweled._dropCharacters();

      expect(Screen.grid).to.deep.equal(updated);
    });

    it('should shift charaters down if horizontal match removed', function () {
      let grid = [
        ['🍇','🍊','🍇','🍊','🍉'],
        ['🍇','  ','  ','  ','🍇'],
        ['🍋','🍌','🍊','🍌','🍉'],
        ['🍋','🍌','🍊','🍌','🍉']
      ];

      let updated = [
        ['🍇','  ','  ','  ','🍉'],
        ['🍇','🍊','🍇','🍊','🍇'],
        ['🍋','🍌','🍊','🍌','🍉'],
        ['🍋','🍌','🍊','🍌','🍉']
      ];

      Screen.initialize(4,5);

      grid.forEach((row,rowIndex) => {
        row.forEach((col, colIndex) => {
          Screen.setGrid(rowIndex, colIndex, col)
        })
      });

      Bejeweled._dropCharacters();

      expect(Screen.grid).to.deep.equal(updated);
    });

  });


  // describe('checkForCombos', function () {
  //   it('should return true if a swap setup a combo', function () {
  //     let grid = [
  //       ['🍇','🍌','🍉'],
  //       ['','',''],
  //       ['🍋','🍌','🍎']
  //     ];

  //     expect(Bejeweled.checkForCombos(grid)).to.be.true;
  //   })
  // })

  describe('_fillUpSpace', function () {
    it('should add random items to open spaces without changing existing items (horizontal)', function () {
      let grid = [
        ['🍉','🍊','  ','🍊','🍉'],
        ['🍇','🍉','  ','🍉','🍉'],
        ['🍇','🍊','  ','🍊','🍇'],
        ['🍋','🍌','🍉','🍌','🍉'],
        ['🍋','🍌','🍇','🍌','🍉']
      ];

      Screen.initialize(5,5);

      grid.forEach((row,rowIndex) => {
        row.forEach((col, colIndex) => {
          Screen.setGrid(rowIndex, colIndex, col)
        })
      });

      Bejeweled._fillUpSpace();

      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
          if (grid[i][j] === '  ') {
            expect(Screen.grid[i][j]).to.not.equal(grid[i][j]);
          } else {
            expect(Screen.grid[i][j]).to.equal(grid[i][j]);
          }
        }
      }

    })

    // it('should add random items to open spaces without changing existing items (vertical)', function () {
    //   let gridVertical = [
    //     ['🍇','🍊',''],
    //     ['🍋','🍌',''],
    //     ['🍋','🍌','']
    //   ];

    //   let actual2 = Bejeweled._fillUpSpace(gridVertical)

    //   for (let i = 0; i < gridVertical.length; i++) {
    //     for (let j = 0; j < gridVertical[0].length; j++) {
    //       if (gridVertical[i][j] === '') {
    //         expect(actual2[i][j]).to.not.be.false;
    //       } else {
    //         expect(actual2[i][j]).to.equal(gridVertical[i][j]);
    //       }
    //     }
    //   }

    // })
  })

});
