const { expect } = require('chai');

const Cursor = require("../class/cursor.js");
const Screen = require("../class/screen.js");

describe ('Cursor', function () {

  let cursor;

  beforeEach(function() {
    cursor = new Cursor(3, 3);
  });


  it('initializes for a 3x3 grid', function () {
    expect(cursor.row).to.equal(0);
    expect(cursor.col).to.equal(0);
  });

  it('correctly processes down inputs', function () {

    cursor.down();
    expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);

    cursor.down();
    expect([cursor.row, cursor.col]).to.deep.equal([2, 0]);

    cursor.down();
    expect([cursor.row, cursor.col]).to.deep.equal([2, 0]);
  });

  it('correctly processes up inputs', function () {

    cursor.up();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);

    cursor.down();
    expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);

    cursor.up();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);
  });

  it('processes right inputs', function () {

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 2]);

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 2]);
  });

  it('processes left inputs', function () {

    cursor.left();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);

    cursor.left();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);
  });

  //Add test for selecting item
  it('selects and deselects item', function () {
    cursor.select();

    expect(cursor.cursorColor).to.equal('blue');

    cursor.select();

    expect(cursor.cursorColor).to.equal('yellow');
  })

  it('swaps items in all directions', function () {
    let grid = [
      ['🍇','🍊','🍉'],
      ['🍌','🍎','🍏'],
      ['🍋','🍌','🍎'],
    ]

    Screen.initialize(3, 3);

    grid.forEach((row,rowIndex) => {
      row.forEach((fruit, colIndex) => {
        Screen.setGrid(rowIndex, colIndex, fruit)
      })
    });

    cursor.select();
    cursor.up();

    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);
    expect(Screen.grid).to.deep.equal(grid);

    cursor.down();

    expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);
    expect(Screen.grid).to.deep.equal([
                                        ['🍌','🍊','🍉'],
                                        ['🍇','🍎','🍏'],
                                        ['🍋','🍌','🍎'],
                                      ]);

    cursor.right();

    expect([cursor.row, cursor.col]).to.deep.equal([1, 1]);
    expect(Screen.grid).to.deep.equal([
                                        ['🍌','🍊','🍉'],
                                        ['🍎','🍇','🍏'],
                                        ['🍋','🍌','🍎'],
                                      ]);

    cursor.up();

    expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);
    expect(Screen.grid).to.deep.equal([
                                        ['🍌','🍇','🍉'],
                                        ['🍎','🍊','🍏'],
                                        ['🍋','🍌','🍎'],
                                      ]);

    cursor.left();

    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);
    expect(Screen.grid).to.deep.equal([
                                        ['🍇','🍌','🍉'],
                                        ['🍎','🍊','🍏'],
                                        ['🍋','🍌','🍎'],
                                      ]);

  });

});
