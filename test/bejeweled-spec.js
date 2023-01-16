const { expect } = require('chai');

const Bejeweled = require("../class/bejeweled.js");
const { grid } = require('../class/screen.js');

describe ('Bejeweled', function () {

  describe('initializeBoard', function () {
    // * test1: empty board becomes filled up

    it('should initialize an empty board completely', function () {
      let grid = [];

      expect(grid).to.deep.equal([]);

      let numRows = 3;
      let numCols = 3;

      grid = Bejeweled.initializeBoard(numRows,numCols);

      let filledGrid = [];

      for (let i = 0; i < numRows; i++) {
        let filledLine = [];

        for (let j = 0; j < numCols; j++) {
          if(grid.length === 0) {
            filledLine.push(0);
          } else if (grid[i][j]) {
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

    it('should return an empty array if no matches', function () {
      let grid = [
        ['🍏','🍏','🍉'],
        ['🍌','🍎','🍏'],
        ['🍋','🍌','🍎']
      ];

      let match = [];

      let actual = Bejeweled.checkForMatches(grid);

      expect(actual).to.equal(match);
    })

    it('should identify a match (3 in a row)', function () {
      let grid = [
        ['🍇','🍊','🍉'],
        ['🍏','🍏','🍏'],
        ['🍋','🍌','🍎']
      ];

      let match = [
        [1,0],
        [1,1],
        [1,2]
      ];

      let actual = Bejeweled.checkForMatches(grid);

      expect(actual).to.deep.equal(match);
    })

    it('should identify a match (3 in a column)', function () {
      let grid = [
        ['🍇','🍊','🍉'],
        ['🍋','🍌','🍉'],
        ['🍋','🍌','🍉']
      ];

      let match = [
        [0,2],
        [1,2],
        [2,2]
      ];

      let actual = Bejeweled.checkForMatches(grid);

      expect(actual).to.deep.equal(match);
    })


    it('should determine if no possible valid moves', function () {
      let grid = [
        ['🍇','🍊','🍉'],
        ['🍌','🍎','🍏'],
        ['🍋','🍌','🍎']
      ];

      let match = null;

      let actual = Bejeweled.checkForMatches(grid);

      expect(actual).to.deep.equal(match);
    })



  });

  describe('removeMatches', function () {

    it('should remove horizontal matches', function () {
      let grid = [
        ['🍇','🍊','🍉'],
        ['🍏','🍏','🍏'],
        ['🍋','🍌','🍎']
      ];

      let removed = [
        ['🍇','🍊','🍉'],
        ['','',''],
        ['🍋','🍌','🍎']
      ];

      let actual = Bejeweled.removeMatches(grid);

      expect(actual).to.deep.equal(removed);
    })

    it('should remove vertical matches', function () {
      let grid = [
        ['🍇','🍊','🍉'],
        ['🍋','🍌','🍉'],
        ['🍋','🍌','🍉']
      ];

      let removed = [
        ['🍇','🍊',''],
        ['🍋','🍌',''],
        ['🍋','🍌','']
      ];

      let actual = Bejeweled.removeMatches(grid);

      expect(actual).to.deep.equal(removed);
    })

  });

  describe('updateBoard', function () {

    it('should shift charaters down if vertical match removed', function () {
      let grid = [
        ['🍇','🍊','🍇','🍊','🍉'],
        ['🍇','🍊','','🍊','🍇'],
        ['🍋','🍌','','🍌','🍉'],
        ['🍋','🍌','','🍌','🍉']
      ];

      let updated = [
        ['🍇','🍊','','🍊','🍉'],
        ['🍇','🍊','','🍊','🍇'],
        ['🍋','🍌','','🍌','🍉'],
        ['🍋','🍌','🍇','🍌','🍉']
      ];

      let actual = Bejeweled.updateBoard(grid);

      expect(actual).to.deep.equal(updated);
    });

    it('should shift charaters down if horizontal match removed', function () {
      let grid = [
        ['🍇','🍊','🍇','🍊','🍉'],
        ['🍇','','','','🍇'],
        ['🍋','🍌','🍊','🍌','🍉'],
        ['🍋','🍌','🍊','🍌','🍉']
      ];

      let updated = [
        ['🍇','','','🍊','🍉'],
        ['🍇','🍊','🍇','','🍇'],
        ['🍋','🍌','🍊','🍌','🍉'],
        ['🍋','🍌','🍊','🍌','🍉']
      ];

      let actual = Bejeweled.updateBoard(grid);

      expect(actual).to.deep.equal(updated);
    });

  });


  describe('checkForCombos', function () {
    it('should return true if a swap setup a combo', function () {
      let grid = [
        ['🍇','🍌','🍉'],
        ['','',''],
        ['🍋','🍌','🍎']
      ];

      expect(Bejeweled.checkForCombos(grid)).to.be.true;
    })
  })

  describe('fillUpSpace', function () {
    it('should add random items to open spaces without changing existing items (horizontal)', function () {
      let gridHorizontal = [
        ['','',''],
        ['🍇','🍌','🍉'],
        ['🍋','🍌','🍎']
      ];

      let actual1 = Bejeweled.fillUpSpace(gridHorizontal);

      for (let i = 0; i < gridHorizontal.length; i++) {
        for (let j = 0; j < gridHorizontal[0].length; j++) {
          if (gridHorizontal[i][j] === '') {
            expect(actual1[i][j]).to.not.be.false;
          } else {
            expect(actual1[i][j]).to.equal(gridHorizontal[i][j]);
          }
        }
      }

    })

    it('should add random items to open spaces without changing existing items (vertical)', function () {
      let gridVertical = [
        ['🍇','🍊',''],
        ['🍋','🍌',''],
        ['🍋','🍌','']
      ];

      let actual2 = Bejeweled.fillUpSpace(gridVertical)

      for (let i = 0; i < gridVertical.length; i++) {
        for (let j = 0; j < gridVertical[0].length; j++) {
          if (gridVertical[i][j] === '') {
            expect(actual2[i][j]).to.not.be.false;
          } else {
            expect(actual2[i][j]).to.equal(gridVertical[i][j]);
          }
        }
      }

    })
  })

});
