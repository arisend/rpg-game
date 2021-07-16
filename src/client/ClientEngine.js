/* eslint-disable guard-for-in */
import EventSourceMixin from '../common/EventSourceMixin';

const spritew = 48;
const spriteh = 48;

class ClientEngine {
  constructor(canvas) {
    Object.assign(this, {
      canvas,
      ctx: null,
      imageLoaders: [], // хранит промисы на загрузку sprites
      sprites: {}, // хранит объекты sprites , включая тип, ссылку и диапазон пикселей
      images: {}, // хранит только уникальные ссылки на sprites
    });
    this.ctx = canvas.getContext('2d');
    this.loop = this.loop.bind(this); // привязка контекста который теряется
  }

  start() {
    this.loop();
  }

  loop(timestamp) {
    const { canvas, ctx } = this;
    ctx.fillStyle = 'black';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.initNextFrame(); // рекурсивный вызов
    this.trigger('render', timestamp);
  }

  initNextFrame() {
    window.requestAnimationFrame(this.loop);
  }

  loadSprites(sprites) {
    this.imageLoader = []; // гарантирование наличия массива
    // eslint-disable-next-line no-restricted-syntax
    for (const groupName in sprites) {
      const group = sprites[groupName];
      this.sprites[groupName] = group;
      // eslint-disable-next-line no-restricted-syntax
      for (const spriteName in group) {
        const { img } = group[spriteName];
        if (!this.images[img]) {
          this.imageLoaders.push(this.loadImage(img)); // добавление
          // ссылки на изображение если ее еще нет в массиве,
          // чтобы избежать дублирования загрузки
        }
      }
    }
    return Promise.all(this.imageLoaders); // ожидание выполнения всех промисов
  }

  loadImage(url) {
    return new Promise((resolve) => {
      const i = new Image(); // создание экземпляра класса изображения
      this.images[url] = i; // кладем экземляр картинки в класс engine
      i.onload = () => resolve(i); // ждем загрузки изображения и помечаем выполнение промиса
      i.src = url; // инициализация загрузки изображения по ссылке
    });
  }

  renderSpriteFrame(worldCfg, game) {
    const { map } = worldCfg;
    map.forEach((cfgRow, y) => {
      cfgRow.forEach((cfgCell, x) => {
        const [sX, sY, sW, sH] = this.sprites.terrain[cfgCell[0]].frames[0];
        const terrains = document.createElement('img');
        terrains.src = this.sprites.terrain[cfgCell[0]].img;
        game.engine.ctx.drawImage(terrains, sX, sY, sW, sH,
          x * spritew, y * spriteh, spritew, spriteh);
      });
    });

    //
    // this.ctx.drawImage(img, fx, fy, fw, fh, x, y, w, h);
  }
}

Object.assign(ClientEngine.prototype, EventSourceMixin); // добавляем методы паттерна подписки

export default ClientEngine;
