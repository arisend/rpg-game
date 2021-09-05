import ClientEngine from './ClientEngine';
import sprites from '../configs/sprites';
import ClientWorld from './ClientWorld';
import levelCfg from '../configs/world.json';
import gameObjects from '../configs/gameObjects.json';
import ClientApi from "./ClientApi";

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      gameObjects:cfg.gameObjects,
      player: null,
      players: {},
      api:new ClientApi({
        game:this,
        ...cfg.apiCfg,

      }),
      spawPoint:[],

    });
    this.api.connect();

    this.engine = this.createEngine();
    this.map = this.createWorld();
    this.initEngine();
  }
  setPlayer(player) {
    this.player = player;
  }
  createWorld() {
    return new ClientWorld(this, this.engine, this.cfg.world);
  }
  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId), this);
  }
  getWorld() {
    return this.map;
  }

  initEngine() {
    this.engine.loadSprites(this.cfg.sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, time) => {
        this.player && this.engine.camera.focusAtGameObject(this.player);
        this.map.render(time);
      });
      this.engine.start();
      this.initKeys();
      this.engine.focusCanvas();
      this.api.join(this.cfg.playerName);
    });
  }
  setPlayers(playerList){
    playerList.forEach((player) => this.createPlayer(player));
  }
  createCurrentPlayer(playerCfg){
    const playerObj = this.createPlayer(playerCfg);
    this.setPlayer(playerObj);
  }
  createPlayer({id,col,row,layer,skin,name}){
      if (!this.players[id]){
        const cell = this.map.cellAt(col,row);
        const playerObj = cell.createGameObject({
          'class':'player',
          type:skin,
          playerId: id,
          playerName: name,
        }, layer);

        cell.addGameObject(playerObj);
        this.players[id]=playerObj;
      }
      return this.players[id];
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => keydown && this.movePlayerToDir('left'),
      ArrowRight: (keydown) => keydown && this.movePlayerToDir('right'),
      ArrowUp: (keydown) => keydown && this.movePlayerToDir('up'),
      ArrowDown: (keydown) => keydown && this.movePlayerToDir('down'),
    });
  }

  movePlayerToDir(dir) {
    this.api.move(dir)
  }
  playerMoveAnimation() {
    const dirs = {
      left: [-1, 0],
      right: [1, 0],
      up: [0, -1],
      down: [0, 1],
    };
    const { player } = this;
    if (player && player.motionProgress === 1) {
      const canMovie = player.moveByCellCoord(
        dirs[dir][0],
        dirs[dir][1],
        (cell) => cell.findObjectsByType('grass').length,
      );

      if (canMovie) {
        player.setState(dir);
        player.once('motion-stopped', () => player.setState('main'));
      }
    }
  }


  addSpawnPoint(spawPoint){
    this.spawPoint.push(spawPoint);
  }
  getPlayerById(id){
    return this.players[id];
  }
  removePlayerById(id){
    const player =this.getPlayerById(id);
    if (player){
      player.detouch();
      delete this.players[id];
    }

  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
      console.log('Game INIT');
    }
  }
}
export default ClientGame;
