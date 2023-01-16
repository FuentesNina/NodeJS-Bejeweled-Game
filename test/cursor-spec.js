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
    let initialGrid = [
      ['🍇','🍊','🍉'],
      ['🍌','🍎','🍏'],
      ['🍋','🍌','🍎'],
    ]

    // Screen.initialize();
    Screen.grid = initialGrid;


    cursor.select();
    cursor.up();

    expect(cursor.cursorColor).to.equal('blue');
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);
    expect(Screen.grid).to.equal(initialGrid);

    // Screen.backgroundColors = [
    //   ['\x1b[40m','\x1b[40m','\x1b[40m'],
    //   ['\x1b[40m','\x1b[40m','\x1b[40m'],
    //   ['\x1b[40m','\x1b[40m','\x1b[40m'],
    // ];
    Screen.initialized = true;
    cursor.down();


    expect(cursor.cursorColor).to.equal('yellow');
    expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);
    expect(Screen.grid).to.deep.equal([
                                        ['🍌','🍊','🍉'],
                                        ['🍇','🍎','🍏'],
                                        ['🍋','🍌','🍎'],
                                      ]);

    cursor.select();
    cursor.right();

    expect(cursor.cursorColor).to.equal('yellow');
    expect([cursor.row, cursor.col]).to.deep.equal([1, 1]);
    expect(Screen.grid).to.deep.equal([
                                        ['🍌','🍊','🍉'],
                                        ['🍎','🍇','🍏'],
                                        ['🍋','🍌','🍎'],
                                      ]);

    cursor.select();
    cursor.up();

    expect(cursor.cursorColor).to.equal('yellow');
    expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);
    expect(Screen.grid).to.deep.equal([
                                        ['🍌','🍇','🍉'],
                                        ['🍎','🍊','🍏'],
                                        ['🍋','🍌','🍎'],
                                      ]);

    cursor.select();
    cursor.left();

    expect(cursor.cursorColor).to.equal('yellow');
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);
    expect(Screen.grid).to.deep.equal([
                                        ['🍇','🍌','🍉'],
                                        ['🍎','🍊','🍏'],
                                        ['🍋','🍌','🍎'],
                                      ]);

  });

  // it('swaps item right', function () {
  //   cursor.right();
  //   cursor.down();

  //   cursor.select();

  //   cursor.swap('right');

  //   expect([cursor.row, cursor.col]).to.deep.equal([1, 2]);

  //   cursor.select();

  //   cursor.swap('right');

  //   expect([cursor.row, cursor.col]).to.deep.equal([1, 2]);
  // })

  // it('swaps item left', function () {
  //   cursor.right();
  //   cursor.down();

  //   cursor.select();

  //   cursor.swap('left');

  //   expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);

  //   cursor.select();

  //   cursor.swap('left');

  //   expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);
  // })

  // it('swaps item up', function () {
  //   cursor.right();
  //   cursor.down();

  //   cursor.select();

  //   cursor.swap('up');

  //   expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);

  //   cursor.select();

  //   cursor.swap('up');

  //   expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);
  // })

  // it('swaps item down', function () {
  //   cursor.right();
  //   cursor.down();

  //   cursor.select();

  //   cursor.swap('down');

  //   expect([cursor.row, cursor.col]).to.deep.equal([2, 1]);

  //   cursor.select();

  //   cursor.swap('down');

  //   expect([cursor.row, cursor.col]).to.deep.equal([2, 1]);

  // })

  // it('does nothing if movement not valid', function () {
  //   cursor.select();
  //   cursor.swap('up');

  //   expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);
  // })

  // add test for swapping items
  /**
   * swap item right
   * swap left
   * swap up
   * swap down
   * does nothing if not valid
   */


});
