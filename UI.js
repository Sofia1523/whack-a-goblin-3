// UI: отображение счёта, промахов и модал
export default class UI {
    constructor() {
      this.scoreEl = document.getElementById('score') || this.createScore();
      this.missEl = document.getElementById('miss') || this.createMiss();
      this.createModal();
    }
  
    createScore() {
      const s = document.createElement('div');
      s.id = 'score';
      s.textContent = 'Score: 0';
      document.body.prepend(s);
      return s;
    }
    createMiss() {
      const m = document.createElement('div');
      m.id = 'miss';
      m.textContent = 'Missed: 0';
      document.body.prepend(m);
      return m;
    }
    update(score, misses) {
      this.scoreEl.textContent = `Score: ${score}`;
      this.missEl.textContent = `Missed: ${misses}`;
    }
    createModal() {
      const modal = document.createElement('div');
      modal.id = 'modal';
      modal.style.display = 'none';
      modal.innerHTML = `
        <div class="modal-inner">
          <h2 id="modal-title">Game Over</h2>
          <p id="modal-text"></p>
          <button id="modal-restart">Restart</button>
        </div>
      `;
      document.body.append(modal);
      this.modal = modal;
      this.modalText = modal.querySelector('#modal-text');
      this.restartBtn = modal.querySelector('#modal-restart');
    }
    showGameOver(score, onRestart) {
      this.modalText.textContent = `Your score: ${score}`;
      this.modal.style.display = 'flex';
      this.restartBtn.onclick = () => {
        this.modal.style.display = 'none';
        onRestart && onRestart();
      };
    }
  }
  