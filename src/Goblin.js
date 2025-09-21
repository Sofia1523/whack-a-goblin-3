import goblinImg from './img/goblin.png';

export default class Goblin {
  constructor() {
    this.el = document.createElement('img');
    this.el.src = goblinImg;
    this.el.alt = 'goblin';
    this.el.classList.add('goblin');
  }

  attachTo(cell) {
    cell.append(this.el);
  }

  remove() {
    if (this.el.parentNode) this.el.parentNode.removeChild(this.el);
  }

  onClick(handler) {
    // устанавливаем обработчик клика (один)
    this.el.onclick = handler;
  }
}
