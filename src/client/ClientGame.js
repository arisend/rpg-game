import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';
import sprites from '../../configs/sprites';
import levelCfg from '../../configs/world.json';
import gameObjects from '../../configs/gameObjects.json';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      gameObjects, // присваиваем экземпляру класса переданный конфиг с id canvas в html
      player: null,
    });
    this.engine = this.createEngine();
    this.world = this.createWorld();
    this.initEngine();
  }

  setPlayer(player) {
    this.player = player;
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg); // создаем экземпляр класса ClientWorld
    // передаем классу ClientEngine объект с canvas
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId));
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.world.init();
      this.engine.on('render', (_, time) => {
        console.log(time);
        this.map.render(time);
        // console.log('render TEST');  производим подписку на событие загрузки изображений
      });
      this.engine.start(); //  запускаем метод 'start' для
      // только что созданового класса ClientEngine ,
      // который в свою очередь является оберткой для цикла отрисовки
    });
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg); // эта конструкция нужна чтобы обеспечить
      // защиту от повторной инициализации класса ClientGame
    }
  }
}

export default ClientGame;
