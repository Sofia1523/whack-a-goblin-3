import Goblin from './Goblin';
import UI from './UI';
import { getRandomIndex } from './utils';

const GRID_SIZE = 4; // 4x4
const CELLS_COUNT = GRID_SIZE * GRID_SIZE;
const GOBLIN_DURATION = 1000; // ms (1 секунда)
const MAX_MISSES = 5;

export default class Game {
  constructor(container) {
    this.container = container;
    this.cells = [];
    this.prevIndex = -1;
    this.goblin = new Goblin();
    this.ui = new UI();
    this.score = 0;
    this.misses = 0;
    this.timeoutId = null;
    this.isRunning = false;
    this.createGrid();
    this.goblin.onClick(() => this.onHit());
  }

  createGrid() {
    // clear container
    this.container.innerHTML = '';
    for (let i = 0; i < CELLS_COUNT; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      this.container.append(cell);
      this.cells.push(cell);
    }
  }

  start() {
    this.isRunning = true;
    this.score = 0;
    this.misses = 0;
    this.ui.update(this.score, this.misses);
    // запускаем цикл через рекурсивный setTimeout: никакой "пропущенной дырки"
    this.scheduleNext();
  }

  scheduleNext() {
    if (!this.isRunning) return;
    // сразу показываем следующий гоблин (незамедлительно)
    this.showGoblin();
    // дальше — после duration проверка и повтор
  }

  showGoblin() {
    // убираем текущего (если есть) — но наше поведение: после скрытия сразу покажем новый
    this.goblin.remove();

    const idx = getRandomIndex(this.prevIndex, this.cells.length);
    this.prevIndex = idx;
    const cell = this.cells[idx];
    this.goblin.attachTo(cell);
    this.ui.update(this.score, this.misses);
    // устанавливаем таймер на длительность показа
    this.timeoutId = setTimeout(() => {
      // если гоблин всё ещё в ячейке => промах
      if (this.goblin.el.parentNode === cell) {
        this.misses += 1;
        this.ui.update(this.score, this.misses);
        this.goblin.remove();
        if (this.misses >= MAX_MISSES) {
          this.stop();
          return;
        }
      }
      // после hide показываем следующий сразу (без дополнительной паузы)
      if (this.isRunning) this.showGoblin();
    }, GOBLIN_DURATION);
  }

  onHit() {
    // кликнули по гоблину
    if (!this.isRunning) return;
    // прерываем таймер, начисляем очко, убираем и сразу показываем следующий
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.score += 1;
    this.ui.update(this.score, this.misses);
    this.goblin.remove();
    // сразу показать следующий
    this.showGoblin();
  }

  stop() {
    this.isRunning = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    // показываем модал через UI
    this.ui.showGameOver(this.score, () => {
      // restart handler
      this.prevIndex = -1;
      this.start();
    });
  }
}
