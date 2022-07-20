/*
 * Quick selection test
 */
import {DEFAULT_TYPE} from '../../BoardCanvas/Cells';




export const _FindCellVisitState = (board, x, y) => {
  for (let i = 0; i < board.length; i++) {
    if (Math.floor(board[i].x) === Math.floor(x) && Math.floor(board[i].y) === Math.floor(y)) {
      return board[i].visited;
    }
  }
};


export const _FindCellTypeState = (board, x, y) => {
  for (let i = 0; i < board.length; i++) {
    if (Math.floor(board[i].x) === Math.floor(x) && Math.floor(board[i].y) === Math.floor(y)) {
      return board[i].visited;
    }
  }
};


export function _FindCell(board, x, y) {
  for (let i = 0; i < board.length; i++) {
    // console.log(board[i].x, x, board[i].y, y);

    if (board[i].x === x && board[i].y === y) {
      // console.log(board[i].x, x, board[i].y, y);

      return board[i];
    }
  }
  return null;
};


export function _BoardReset(board) {
  for (let i = 0; i < board.length; i++) {
    board[i].visited = false;
    board[i].type = DEFAULT_TYPE;
  }
}

export function _VisitReset(board) {
  for (let i = 0; i < board.length; i++) {
    board[i].visited = false;
  }
}
