import goblinImg from './img/goblin.png';

export default class Goblin {
  constructor(cells, scoreEl, missEl) {
    this.cells = cells;
    this.scoreEl = scoreEl;
    this.missEl = missEl;
    this.score = 0;
    this.missed = 0;
    this.maxMissed = 5;
    this.active = false;

    this.img = document.createElement('img');
    this.img.src = goblinImg;
    this.img.alt = 'Goblin';
    this.img.classList.add('goblin');

    this.img.addEventListener('click', () => {
      if (this.active) {
        this.score++;
        this.scoreEl.textContent = `Score: ${this.score}`;
        this.removeGoblin();
      }
    });
  }

  moveGoblin() {
    const newIndex = Math.floor(Math.random() * this.cells.length);
    this.cells[newIndex].append(this.img);
    this.active = true;

    setTimeout(() => {
      if (this.active) {
        this.missed++;
        this.missEl.textContent = `Missed: ${this.missed}`;
        this.removeGoblin();
        if (this.missed >= this.maxMissed) {
          alert('Game over!');
          window.location.reload();
        }
      }
    }, 1000);
  }

  removeGoblin() {
    this.img.remove();
    this.active = false;
  }

  start() {
    this.moveGoblin();
    this.interval = setInterval(() => this.moveGoblin(), 1500);
  }
}
