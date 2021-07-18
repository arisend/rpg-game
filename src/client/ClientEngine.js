import EventSourceMixin from '../common/EventSourceMixin';
import ClientInput from './ClientInput';

class ClientEngine {
  constructor(canvas) {
    //console.log(canvas);

    Object.assign(this, {
      canvas,
      ctx: null,
      imageLoaders: [],
      sprites: {},
      images: {},
      input: new ClientInput(canvas),
    });
    this.ctx = canvas.getContext('2d');
    this.loop = this.loop.bind(this);
  }
  start() {
    this.loop();
  }
  loop(timestamp) {
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
    const [fx, fy, fw, fh] = frame;
    //console.log(sprite,fx,fy,fw,fh,x,y,w,h)
    const terrain = document.createElement('img');
    terrain.src = sprite;
    this.ctx.drawImage(terrain, fx, fy, fw, fh, x, y, w, h);
  }
}

Object.assign(ClientEngine.prototype, EventSourceMixin);

export default ClientEngine;
