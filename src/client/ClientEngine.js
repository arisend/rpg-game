import EventSourceMixin from '../common/EventSourceMixin';
import ClientInput from './ClientInput';
import ClientCamera from './ClientCamera';

class ClientEngine {
  constructor(canvas, game) {
    //console.log(canvas);

    Object.assign(this, {
      canvas,
      ctx: null,
      imageLoaders: [],
      sprites: {},
      images: {},
      camera: new ClientCamera({ canvas, engine: this }),
      input: new ClientInput(canvas),
      game,
      lastRenderTime: 0,
      startTime: 0,
    });
    this.ctx = canvas.getContext('2d');
    this.loop = this.loop.bind(this);
  }
  start() {
    this.loop();
  }
  loop(timestamp) {
    if (!this.startTime) {
      this.startTime = timestamp;
    }
    this.lastRenderTime = timestamp;
    const { ctx, canvas } = this;
    ctx.fillStyle = 'black';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.trigger('render', timestamp);
    this.initNextFame();
  }
  initNextFame() {
    window.requestAnimationFrame(this.loop);
  }
  loadSprites(spritesGroup) {
    this.imageLoaders = [];
    for (let groupName in spritesGroup) {
      const group = spritesGroup[groupName];
      this.sprites[groupName] = group;
      for (let spriteName in group) {
        const { img } = group[spriteName];
        if (!this.images[img]) {
          this.imageLoaders.push(this.loadImage(img));
        }
      }
    }
    return Promise.all(this.imageLoaders);
  }
  loadImage(url, groupName) {
    return new Promise((resolve) => {
      const i = new Image();
      this.images[url] = i;
      i.onload = () => resolve(i);
      i.src = url;
    });
  }
  renderSpriteFrame({ sprite, frame, x, y, w, h }) {
    //console.log(sprite, frame, x, y, w, h)

    const [fx, fy, fw, fh] = this.sprites[sprite[0]][sprite[1]].frames[frame];
    const terrain = document.createElement('img');
    terrain.src = this.sprites[sprite[0]][sprite[1]].img;
    //console.log(fx, fy, fw, fh, x, y, w, h)
    const camera = this.camera;
    this.ctx.drawImage(terrain, fx, fy, fw, fh, x - camera.x, y - camera.y, w, h);
  }
}

Object.assign(ClientEngine.prototype, EventSourceMixin);

export default ClientEngine;
