import levelCfg from '../configs/world.json';

class ClientWorld {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.length,
      width: levelCfg.map[0].length,
    });
  }
  init() {
    //console.log('map init');

    levelCfg.map.forEach((cfgRow, fy) => {
      cfgRow.forEach((cfgCell, fx) => {
        cfgCell.forEach((cfgL, fl) => {
          //console.log(cfgL[0]);
          if (fl === 0) {
            //console.log(this.engine.sprites.terrain[cfgL[0]].frames)
            this.engine.renderSpriteFrame({
              sprite: 'http://localhost:3000/assets/terrain.png',
              frame: this.engine.sprites.terrain[cfgL[0]].frames[0],
              x: fx * 48,
              y: fy * 48,
              w: 48,
              h: 48,
            });
          } else if ((fl === 1 && cfgL[0] == 'spawn') || cfgL[0] == 'npcSpawn') {
            //console.log(cfgL[0] )
            this.engine.renderSpriteFrame({
              sprite: 'http://localhost:3000/assets/terrain.png',
              frame: this.engine.sprites.terrain[cfgL[0]].frames[0],
              x: fx * 48,
              y: fy * 48,
              w: 48,
              h: 48,
            });
          } else {
            //console.log(cfgL[0].type)
            this.engine.renderSpriteFrame({
              sprite: 'http://localhost:3000/assets/characters.png',
              frame: this.engine.sprites.characters[cfgL[0].type].frames[0],
              x: fx * 48,
              y: fy * 48,
              w: 48,
              h: 48,
            });
          }
        });
      });
    });
  }
}
export default ClientWorld;
