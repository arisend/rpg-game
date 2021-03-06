import './index.scss';
import ClientGame from './client/ClientGame';

window.addEventListener('load', () => {
  ClientGame.init({ tagId: 'game' }); // инициализируем класс ClientGame и передаем в конструктор id canvas в html
});

//
//
//
//
// console.log('test')
// import PlayerWalk from './assets/Male-4-Walk.png';
// import terrainAtlas from './assets/terrain.png';
// import worldCfg from '../configs/world.json';
// import sprites from '../configs/sprites.js';
//
// const canvas = document.getElementById('game');
// const ctx = canvas.getContext('2d');
// const spritew = 48;
// const spriteh = 48;
//
// const terrain = document.createElement('img');
// terrain.src = terrainAtlas;
//
// //
// function drawBackground() {
//   const { map } = worldCfg;
//   map.forEach((cfgRow, y) => {
//     cfgRow.forEach((cfgCell, x) => {
//
//       const [sX,sY,sW,sH] = sprites.terrain[cfgCell[0]].frames[0];
//       ctx.drawImage(terrain, sX,sY,sW,sH,x*spritew,y*spriteh, spritew,spriteh);
//     });
//   });
// }
// const img = document.createElement('img');
// const shots = 3;
// let cycle = 0;
// let bottomPressedDown = false;
// let bottomPressedUp = false;
// let bottomPressedLeft = false;
// let bottomPressedRight = false;
// let bottomPressedControl = false;
// let py = Math.floor(canvas.height / 2 - spriteh / 2);
// let px = Math.floor(canvas.width / 2 - spritew / 2);
// let xSprite = 0;
// let ySprite = 0;
// let magic = 0;
// img.src = PlayerWalk;
// function keyDownHandler(e) {
//   // console.log(e);
//   if (e.key === 'Control' || e.key === 'ControlRight') {
//     bottomPressedControl = true;
//   }
//   if (e.key === 'Down' || e.key === 'ArrowDown') {
//     bottomPressedDown = true;
//   }
//   if (e.key === 'Up' || e.key === 'ArrowUp') {
//     bottomPressedUp = true;
//   }
//   if (e.key === 'Left' || e.key === 'ArrowLeft') {
//     bottomPressedLeft = true;
//   }
//   if (e.key === 'Right' || e.key === 'ArrowRight') {
//     bottomPressedRight = true;
//   }
// }
// function outerWall(coordinate, x = false) {
//   let retcoord = coordinate;
//   if (coordinate < 0) {
//     retcoord = 0;
//   } else if (coordinate > canvas.width - spritew && x) {
//     retcoord = canvas.width - spritew;
//   } else if (coordinate > canvas.height - spriteh && !x) {
//     retcoord = canvas.height - spriteh;
//   }
//   return retcoord;
// }
// function keyUpHandler(e) {
//   if (e.key === 'Control' || e.key === 'ControlRight') {
//     bottomPressedControl = false;
//   }
//
//   if (e.key === 'Down' || e.key === 'ArrowDown') {
//     bottomPressedDown = false;
//   }
//   if (e.key === 'Up' || e.key === 'ArrowUp') {
//     bottomPressedUp = false;
//   }
//   if (e.key === 'Left' || e.key === 'ArrowLeft') {
//     bottomPressedLeft = false;
//   }
//   if (e.key === 'Right' || e.key === 'ArrowRight') {
//     bottomPressedRight = false;
//   }
// }
// document.addEventListener('keydown', keyDownHandler);
// document.addEventListener('keyup', keyUpHandler);
//
//
// const step = 3;
//
// function walk(timestamp) {
//   if (bottomPressedDown) {
//     py += step;
//     ySprite = 0;
//     cycle = (cycle + 1) % shots;
//     xSprite = spritew * cycle;
//   }
//   if (bottomPressedUp) {
//     py -= step;
//     ySprite = spriteh * 3;
//     cycle = (cycle + 1) % shots;
//     xSprite = spritew * cycle;
//   }
//   if (bottomPressedLeft) {
//     px -= step;
//     ySprite = spriteh;
//     cycle = (cycle + 1) % shots;
//     xSprite = spritew * cycle;
//   }
//   if (bottomPressedRight) {
//     px += step;
//     ySprite = spriteh * 2;
//     cycle = (cycle + 1) % shots;
//     xSprite = spritew * cycle;
//   }
//   if (bottomPressedControl) {
//     magic = (magic += 144) % 288;
//   }
//   py = outerWall(py);
//   px = outerWall(px, true);
//   ctx.clearRect(0, 0, 600, 600);
//   drawBackground();
//   ctx.drawImage(img, xSprite + magic, ySprite, spritew, spriteh, px, py, 48, 48);
//   window.requestAnimationFrame(walk);
// };
//
//
// terrain.addEventListener('load', () => {
//   window.requestAnimationFrame(walk);
// });
//
