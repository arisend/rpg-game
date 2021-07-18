import ClientEngine from './ClientEngine';
import sprites from '../configs/sprites';
import EventSourceMixin from '../common/EventSourceMixin';
import ClientWorld from './ClientWorld';
import levelCfg from '../configs/world.json';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      player: null,
    });

    this.engine = this.createEngine();
    this.map = this.createWorld();
    this.initEngine();
    //console.log('this.engine',this.engine);
  }
  setPlayer(player) {
    this.player = player;
  }
  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId));
  }
  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.engine.on('render', (_, time) => {
        this.map.init();
      });
      this.engine.start();
      this.initKeys();
    });
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => {
        console.log(keydown);
        console.log(this);
        if (keydown) {
          this.player.moveByCellCoord(-1, 0, (cell) => {
            return true;
          });
        }
      },
    });
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
      console.log('Game INIT');
    }
  }
}
export default ClientGame;
