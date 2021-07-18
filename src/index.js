import './index.scss';
import ClientGame from './client/ClientGame';

window.addEventListener('load', () => {
  ClientGame.init({ tagId: 'game' });
});

//WORLD
// import PlayerWalk from './assets/Male-4-Walk.png';
// import terrainAtlas from './assets/terrain.png';
// import worldCfg from './configs/world.json'
// import sprites from "./configs/sprites";
//
// const canvas = document.getElementById('game');
// const ctx = canvas.getContext('2d');
// const spriteW = 48;
// const spriteH = 48;
//
// const terrain = document.createElement('img');
// terrain.src=terrainAtlas;
// terrain.addEventListener('load',()=>{
//     const {map} = worldCfg;
//     map.forEach((cfgRow,y)=>{
//         cfgRow.forEach((cfgCell,x)=>{
//             const [sX,sY,sW,sH] = sprites.terrain[cfgCell[0]].frames[0];
//             ctx.drawImage(terrain,sX,sY,sW,sH,x*spriteW,y*spriteH,spriteW,spriteH)
//         })
//     })
// })

/// PLAYER
//
// const $texttag = document.querySelector('body > div > div.canvas-wrap > h3');
//
// $texttag.innerHTML = 'RCtrl is the magic key';
//
// // function drawBackground() {
// //   ctx.beginPath();
// //   ctx.strokeStyle = '#714F42';
// //   ctx.lineWidth = 10;
// //   ctx.moveTo(50, 50);
// //   ctx.lineTo(550, 50);
// //   ctx.moveTo(200, 200);
// //   ctx.arc(300, 200, 100, Math.PI, 2 * Math.PI);
// //   ctx.moveTo(150, 500);
// //   ctx.bezierCurveTo(300, 600, 350, 400, 500, 500);
// //   ctx.stroke();
// // }
//
// const img = document.createElement('img');
//
// const shots = 3;
// let cycle = 0;
// let bottomPressedDown = false;
// let bottomPressedUp = false;
// let bottomPressedLeft = false;
// let bottomPressedRight = false;
// let bottomPressedControl = false;
// let py = 280;
// let px = 280;
// let xSprite = 0;
// let ySprite = 0;
// let magic = 0;
// img.src = PlayerWalk;
//
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
//   } else if (coordinate > 560 && x) {
//     retcoord = 560;
//   } else if (coordinate > 550 && !x) {
//     retcoord = 550;
//   }
//   return retcoord;
// }
//
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
//
// function walk(timestamp){
//   if (bottomPressedDown) {
//         py += 10;
//         ySprite = 0;
//         cycle = (cycle + 1) % shots;
//         xSprite = spriteW * cycle;
//       }
//   if (bottomPressedUp) {
//         py -= 10;
//         ySprite = 144;
//         cycle = (cycle + 1) % shots;
//         xSprite = spriteW * cycle;
//       }
//   if (bottomPressedLeft) {
//         px -= 10;
//         ySprite = 48;
//         cycle = (cycle + 1) % shots;
//         xSprite = spriteW * cycle;
//       }
//   if (bottomPressedRight) {
//         px += 10;
//         ySprite = 96;
//         cycle = (cycle + 1) % shots;
//         xSprite = spriteW * cycle;
//       }
//   if (bottomPressedControl) {
//         magic = (magic += 144) % 288;
//       }
//       py = outerWall(py);
//       px = outerWall(px, true);
//       ctx.clearRect(0, 0, 600, 600);
//       //drawBackground();
//       ctx.drawImage(img, xSprite + magic, ySprite, spriteW, spriteH, px, py, 48, 48);
//     window.requestAnimationFrame(walk)
// }
//
// document.addEventListener('keydown', keyDownHandler);
// document.addEventListener('keyup', keyUpHandler);
//
// img.addEventListener('load', () => {
//   window.requestAnimationFrame(walk)
//
// });
