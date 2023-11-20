/* filename: complexCode.js */

// This code utilizes different advanced JavaScript concepts to create a complex program that solves a Sudoku puzzle.

// Sudoku class
class Sudoku {
  constructor(board) {
    this.board = board;
    this.size = 9;
  }

  // Check if the value is already present in the row
  isInRow(row, num) {
    for (let col = 0; col < this.size; col++) {
      if (this.board[row][col] === num) {
        return true;
      }
    }
    return false;
  }

  // Check if the value is already present in the column
  isInCol(col, num) {
    for (let row = 0; row < this.size; row++) {
      if (this.board[row][col] === num) {
        return true;
      }
    }
    return false;
  }

  // Check if the value is already present in the box
  isInBox(boxStartRow, boxStartCol, num) {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.board[row + boxStartRow][col + boxStartCol] === num) {
          return true;
        }
      }
    }
    return false;
  }

  // Check if it's safe to place the number in the given position
  isSafe(row, col, num) {
    return (
      !this.isInRow(row, num) &&
      !this.isInCol(col, num) &&
      !this.isInBox(row - (row % 3), col - (col % 3), num)
    );
  }

  // Solve the sudoku puzzle
  solve() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        if (this.board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (this.isSafe(row, col, num)) {
              this.board[row][col] = num;

              if (this.solve()) {
                return true;
              } else {
                this.board[row][col] = 0;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  }
}

// Example Sudoku puzzle to solve
const puzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

// Solve the Sudoku puzzle
const sudoku = new Sudoku(puzzle);
sudoku.solve();

// Print the solved puzzle
console.log("Solved Sudoku:");
for (let row = 0; row < sudoku.size; row++) {
  console.log(sudoku.board[row].join(" "));
}