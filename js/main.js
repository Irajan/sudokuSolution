import Board from "./board.js";

const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

const mainGrid2 = [
  ["", "1", "", "", "", "", "4", "3", ""],
  ["7", "", "", "", "", "", "", "", ""],
  ["", "", "", "2", "5", "4", "9", "", ""],
  ["1", "7", "", "", "4", "", "2", "", "6"],
  ["", "", "", "", "9", "", "", "", "3"],
  ["", "", "3", "", "", "6", "", "8", ""],
  ["", "", "1", "4", "7", "", "", "6", ""],
  ["", "", "", "5", "", "8", "1", "2", ""],
  ["", "9", "", "", "6", "", "3", "", "4"],
];

const mainGrid1 = [
  ["", "", "", "", "", "5", "4", "", "9"],
  ["4", "5", "1", "", "", "2", "3", "", ""],
  ["9", "8", "2", "", "", "", "5", "6", "1"],
  ["6", "", "7", "", "", "", "9", "8", ""],
  ["", "", "3", "4", "6", "", "", "", ""],
  ["5", "", "", "2", "8", "7", "", "1", ""],
  ["", "4", "", "", "7", "", "", "9", "6"],
  ["3", "", "", "", "", "", "7", "", ""],
  ["", "", "5", "9", "4", "6", "8", "", "2"],
];

const mainGrid3 = [
  ["", "", "", "4", "", "5", "2", "", ""],
  ["4", "9", "2", "", "", "", "", "1", "8"],
  ["5", "", "6", "9", "2", "", "", "3", ""],
  ["1", "6", "9", "2", "", "", "3", "", "5"],
  ["", "5", "", "", "", "", "", "2", "1"],
  ["8", "2", "", "1", "5", "", "6", "", "9"],
  ["", "", "", "", "3", "", "9", "6", ""],
  ["9", "", "", "6", "", "2", "", "5", ""],
  ["", "", "", "", "", "", "7", "", ""],
];

const mainGrid4 = [
  ["8", "", "", "1", "", "", "", "7", ""],
  ["", "2", "", "", "4", "", "8", "", ""],
  ["", "6", "", "7", "", "", "", "", ""],
  ["", "", "", "4", "7", "", "9", "", "8"],
  ["2", "4", "", "", "8", "", "", "", ""],
  ["", "3", "8", "", "", "", "", "", "5"],
  ["", "8", "", "6", "", "4", "1", "", ""],
  ["9", "", "", "", "", "7", "2", "", "4"],
  ["", "", "5", "8", "1", "", "", "", "6"],
];

const board = new Board(mainGrid4);
const possible = new Array(9);

for (let i = 0; i < 9; i++) possible[i] = new Array(9);

for (let i = 0; i < 9; i++)
  for (let j = 0; j < 9; j++) possible[i][j] = new Array();

for (let i = 0; i < 9; i++)
  for (let j = 0; j < 9; j++)
    for (let value = 1; value <= 9; value++) {
      if (board.values[i][j] == "" && board.checkGrid(i, j, value)) {
        possible[i][j].push(value);
      }
    }

while (checkForSingle());

function checkForSingle() {
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++)
      if (possible[i][j].length == 1) {
        board.values[i][j] = possible[i][j][0];
        update(i, j);
        return true;
      }
  return false;
}

function update(row, column) {
  const insertedValue = board.values[row][column];

  for (let i = 0; i < 9; i++) {
    for (let j = possible[row][i].length - 1; j >= 0; j--)
      if (possible[row][i][j] == insertedValue)
        possible[row][i].splice(possible[row][i].indexOf(insertedValue), 1);

    for (let j = possible[i][column].length - 1; j >= 0; j--)
      if (possible[i][column][j] == insertedValue)
        possible[i][column].splice(
          possible[i][column].indexOf(insertedValue),
          1
        );

    const offSetRow = ((cell) => {
      if (cell <= 2) return 0;
      if (cell <= 5) return 3;

      return 6;
    })(row);

    const offSetColumn = ((cell) => {
      if (cell <= 2) return 0;
      if (cell <= 5) return 3;

      return 6;
    })(column);

    for (let i = 0; i < 3; i++, row = ((row + 1) % 3) + offSetRow)
      for (let j = 0; j < 3; j++, column = ((column + 1) % 3) + offSetColumn)
        for (let k = possible.length - 1; k >= 0; k--)
          if (possible[row][column][k] == insertedValue)
            possible[row][column].splice(
              possible[row][column].indexOf(insertedValue),
              1
            );
  }
}
for (let i = 0; i < 9; i++) console.table(possible[i]);

board.draw(canvas);
