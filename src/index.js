import './styles.css';
import Goblin from './Goblin';
import hammerImg from './img/hammer.png';

// Ставим кастомный курсор для всего документа
document.body.style.cursor = `url(${hammerImg}) 16 16, auto`;

// Берём контейнер игрового поля
const game = document.getElementById('game');

// Создаём массив клеток
const cells = [];

// создаём поле 4x4
for (let i = 0; i < 16; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  game.append(cell);
  cells.push(cell);
}

// Создаём счетчик очков
const scoreEl = document.createElement('div');
scoreEl.id = 'score';
scoreEl.textContent = 'Score: 0';
document.body.prepend(scoreEl);

// Создаём счетчик пропусков
const missEl = document.createElement('div');
missEl.id = 'miss';
missEl.textContent = 'Missed: 0';
document.body.prepend(missEl);

// Инициализация игры
const goblin = new Goblin(cells, scoreEl, missEl);
goblin.start();
