import Goblin from './Goblin';

export default class Game {
  constructor(gameElement, scoreBoard) {
    this.gameElement = gameElement;
    this.scoreBoard = scoreBoard;
    this.cells = [];
    this.missed = 0;
    this.score = 0;
    this.maxMissed = 5;
    this.goblinTimeout = 1000;

    this.createGrid();
    this.updateScore();
  }

  createGrid() {
    for (let i = 0; i < 16; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      this.gameElement.append(cell);
      this.cells.push(cell);
    }
  }

  updateScore() {
    this.scoreBoard.textContent = `Score: ${this.score} | Missed: ${this.missed}`;
  }

  start() {
    this.gameInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * this.cells.length);
      const goblin = new Goblin(this.cells[randomIndex], () => {
        this.score += 1;
        this.updateScore();
      });

      goblin.show();

      setTimeout(() => {
        if (goblin.element.parentNode) {
          goblin.hide();
          this.missed += 1;
          this.updateScore();
          if (this.missed >= this.maxMissed) {
            clearInterval(this.gameInterval);
            alert(`Game Over! Score: ${this.score}`);
          }
        }
      }, this.goblinTimeout);
    }, this.goblinTimeout);
  }
}
