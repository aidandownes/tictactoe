

const winners = [
  [0, 1, 2],  // top row
  [3, 4, 5],  // middle row
  [6, 7, 8],  // bottom row
  [0, 3, 6],  // left column
  [1, 4, 7],  // middle column
  [2, 5, 8],  // right column
  [0, 4, 8],  // left-top to right-bottom diagonal
  [2, 4, 6]   // left-bottom to right-top diagonal
];

function isWinner(board) {
  for (const line of winners) {
    const a = board[line[0]];
    const b = board[line[1]];
    const c = board[line[2]];
    if (a !== '' && a === b && a === c) {
      return true;
    }
  }
  return false;
}

function isTied(board) {
  return board.every(cell => cell !== '');
}

const initialState = {
  board: ['', '', '', '', '', '', '', '', ''],
  currentPlayer: 'x',
  winner: false,
  done: false
};

// Represents the Game.
export class Game {
  constructor() {
    this.state = initialState;
    this.previousState = [];
  }

  getValue(cell) { return this.state.board[cell]; }

  get isTied() { return this.state.done && !this.state.winner; }

  get hasAWinner() { return this.state.winner; }

  get currentPlayer() { return this.state.currentPlayer; }

  play(cell) {
    // Check if cell is playable
    if (this.state.board[cell] !== '' || this.state.done) {
      return;
    }

    // Update state
    let board = [...this.state.board];
    board[cell] = this.state.currentPlayer;

    const winner = isWinner(board);
    const done = winner || isTied(board);

    let currentPlayer;
    if (winner) {
      // Current player is the winner.
      currentPlayer = this.state.currentPlayer;
    } else {
      // Current player updated to next player.
      currentPlayer = this.state.currentPlayer == 'x' ? 'o' : 'x';
    }

    this.previousState.push(this.state);
    this.state = {board, currentPlayer, winner, done};
  }

  reset() {
    this.state = initialState;
    this.previousState = [];
  }

  undo() {
    if (this.previousState.length > 0) {
      this.state = this.previousState.pop();
    }
  }
}