import './styles.css';
import Game from './Game';
import hammerImg from './img/hammer.png';

// ставим кастомный курсор (import даёт корректный путь)
document.body.style.cursor = `url(${hammerImg}) 10 10, auto`;

// создаём контейнер (или используем уже в index.html)
const gameEl = document.getElementById('game');
const game = new Game(gameEl);
game.start();
