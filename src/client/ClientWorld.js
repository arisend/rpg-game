import ClientCell from './ClientCell';
import PositionedObject from '../common/PositionedObject';
import { clamp } from '../common/util';

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
      const layer = levelCfg.layers[layerId];
      if (layer.isStatic) {
        this.renderStaticLayer(time, layer, layerId);
      } else {
        this.renderDynamicLayer(time, layerId, this.getRenderRange());
      }
    }
  }

  cellAt(col, row) {
    return this.map[row] && this.map[row][col];
  }

  cellatXY(x, y) {
    const { width, height, cellWidth, cellHeight } = this;
    return this.cellAt((clamp(x, 0, width - 1) / cellWidth) | 0, (clamp(y, 0, height - 1) / cellHeight) | 0);
  }

  getRenderRange() {
    const { x, y, width, height } = this.engine.camera.worldBounds();
    const { cellWidth, cellHeight } = this;
    return {
      startCell: this.cellatXY(x - cellWidth, y - cellHeight),
      endCell: this.cellatXY(x + width + cellWidth, y + height + cellHeight),
    };
  }

  renderStaticLayer(time, layer, layerId) {
    const { engine } = this;
    const { camera } = engine;
    const layerName = 'static_layer_' + layerId;
    const cameraPos = camera.worldBounds();
    if (!layer.isRendered) {
      engine.addCanvas(layerName, this.width, this.height);
      engine.switchCanvas(layerName);
      camera.moveTo(0, 0, false);
      this.renderDynamicLayer(time, layerId);
      camera.moveTo(cameraPos.x, cameraPos.y, false);
      engine.switchCanvas('main');
      layer.isRendered = true;
    }
    engine.renderCanvas(layerName, cameraPos, { x: 0, y: 0, width: cameraPos.width, height: cameraPos.height });
  }

  renderDynamicLayer(time, layerId, rangeCells) {
    const { map, worldWidth, worldHeight } = this;
    if (!rangeCells) {
      rangeCells = {
        startCell: this.cellAt(0, 0),
        endCell: this.cellAt(worldWidth - 1, worldHeight - 1),
      };
    }
    const { startCell, endCell } = rangeCells;
    for (let row = startCell.row; row <= endCell.row; row++) {
      for (let col = startCell.col; col <= endCell.col; col++) {
        map[row][col].render(time, layerId);
      }
    }
  }
}
export default ClientWorld;
