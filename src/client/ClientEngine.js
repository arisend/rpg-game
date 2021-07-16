import EventSourceMixin from '../common/EventSourceMixin';
import ClientCamera from './ClientCamera';

const spritew = 48;
const spriteh = 48;

class ClientEngine {
  constructor(canvas) {
    Object.assign(this, {
      canvas,
      ctx: null,
      imageLoaders: [], // хранит промисы на загрузку sprites
      sprites: {}, // хранит объекты sprites , включая тип, ссылку и диапазон пикселей
      images: {}, // хранит только уникальные ссылки на  sprites
      camera: new ClientCamera({ canvas, engine: this }),
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
    this.imageLoader = [];
    Object.keys(sprites).forEach((v) => {
      const group = sprites[v];
      this.sprites[v] = group;
      Object.keys(group).forEach((i) => {
        const { img } = group[i];
        if (!this.images[img]) {
          this.imageLoaders.push(this.loadImage(img));
        }
      });
    });

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
}

Object.assign(ClientEngine.prototype, EventSourceMixin); // добавляем методы паттерна подписки

export default ClientEngine;
