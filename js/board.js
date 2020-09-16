export default class Board {
  constructor(values) {
    this.values = values;
  }

  checkGrid(row, column, value) {
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

    for (let i = 0; i < 9; i++)
      if (this.values[i][column] == value || this.values[row][i] == value)
        return false;

    for (let i = 0; i < 3; i++, row = ((row + 1) % 3) + offSetRow)
      for (let j = 0; j < 3; j++, column = ((column + 1) % 3) + offSetColumn)
        if (this.values[row][column] == value) return false;

    return true;
  }

  draw(canvas, x = 10, y = 10) {
    const cc = canvas.getContext("2d");

    for (let i = 0; i < 9; i++, y += 50) {
      for (let j = 0; j < 9; j++, x += 50) {
        cc.rect(x, y, 50, 50);
        cc.font = "20px Arial";
        cc.fillText(this.values[i][j], x + 20, y + 30);
        cc.stroke();

        if (i % 3 == 0) {
          cc.moveTo(x, y - 2);
          cc.lineTo(x + 50, y - 2);
          cc.stroke();
        }

        if (j % 3 == 0) {
          cc.moveTo(x - 2, y);
          cc.lineTo(x - 2, y + 50);
          cc.stroke();
        }
      }
      x = 10;
    }
  }
}
