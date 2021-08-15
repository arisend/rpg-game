import './index.scss';
import ClientGame from './client/ClientGame';

const $button = document.querySelector('#nameForm > div:nth-child(3) > button');
$button.onclick = function () {
  const playerName = document.querySelector('#name').value;
  ClientGame.init({ tagId: 'game', playerName: playerName });
  const $elem = document.querySelector('body > div > div.canvas-wrap > div.start-game');
  $elem.parentNode.removeChild($elem);
};
