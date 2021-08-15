import levelCfg from '../configs/world.json';
import ClientCell from './ClientCell';
import PositionedObject from '../common/PositionedObject';

class ClientWorld extends PositionedObject {
  constructor(game, engine, levelCfg) {
    super(game, engine, levelCfg);
    const worldHeight = levelCfg.map.length;
    const worldWidth = levelCfg.map[0].length;
    const cellSize = engine.canvas.height / levelCfg.camera.height;
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: worldHeight * cellSize,
      width: worldWidth * cellSize,
      worldWidth,
      worldHeight,
      cellWidth: cellSize,
      cellHeight: cellSize,
      map: [],
    });
  }
  init() {
    //console.log('map init');
    const { levelCfg, map, worldWidth, worldHeight } = this;
    for (let row = 0; row < worldHeight; row++) {
      for (let col = 0; col < worldWidth; col++) {
        if (!map[row]) {
          map[row] = [];
        }
        map[row][col] = new ClientCell({
          world: this,
          cellCol: col,
          cellRow: row,
          cellCfg: levelCfg.map[row][col],
        });
      }
    }
  }

  render(time) {
    const { levelCfg, map, worldWidth, worldHeight } = this;
    for (let layerId = 0; layerId < levelCfg.layers.length; layerId++) {
      for (let row = 0; row < worldHeight; row++) {
        for (let col = 0; col < worldWidth; col++) {
          map[row][col].render(time, layerId);
        }
      }
    }
  }

  cellAt(col, row) {
    return this.map[row] && this.map[row][col];
  }
}
export default ClientWorld;
