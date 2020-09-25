const BOARD_CSS_CLASS = '.container';
const CELL_CSS_CLASS = '.cell';

const MSG_CSS_CLASS = '#message';
const RESET_BUTTON_CSS_CLASS = '#reset';
const UNDO_BUTTON_CSS_CLASS = "#undo";


export class Renderer {
  constructor(game) { this.game = game; }

  init() {
    this.boardElement = document.querySelector(BOARD_CSS_CLASS);
    this.cellElements = [...document.querySelectorAll(CELL_CSS_CLASS)];
    this.resetButton = document.querySelector(RESET_BUTTON_CSS_CLASS);
    this.messageElement = document.querySelector(MSG_CSS_CLASS);
    this.undoButton = document.querySelector(UNDO_BUTTON_CSS_CLASS);

    // Hook up listeners
    this.boardElement.addEventListener('click', (event) => {
      event.preventDefault();
      const index = this.cellElements.findIndex(elm => elm == event.target);
      if (index >= 0) {
        this.game.play(index);
        this.render(index);
      }
    });

    this.resetButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.game.reset();
      this.render();
    });

    this.undoButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.game.undo();
      this.render();
    });

    this.render();
  }


  render(index) {
    if (index) {
      this.cellElements[index].innerHTML =
          `<span>${this.game.getValue(index)}</span>`;
      this.cellElements[index].dataset.player = this.game.getValue(index);
    } else {
      for (let i = 0; i < this.cellElements.length; i++) {
        this.cellElements[i].innerHTML =
            `<span>${this.game.getValue(i)}</span>`;
        this.cellElements[i].dataset.player = this.game.getValue(i);
      }
    }

    // Render the message.
    if (this.game.hasAWinner) {
      this.renderMessage(`Player '${this.game.currentPlayer}' wins!!`);
    } else if (this.game.isTied) {
      this.renderMessage('Tied game!!', '');
    } else {
      this.renderMessage(`Player ${this.game.currentPlayer}'s turn`);
    }
  }

  renderMessage(msg, player) {
    this.messageElement.textContent = msg;
    this.messageElement.dataset.player = player || this.game.currentPlayer;
  }
}