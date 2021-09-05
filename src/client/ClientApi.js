import { io } from 'socket.io-client';
class ClientApi {
  constructor(cfg) {
    Object.assign(this, {
      ...cfg,
      game: cfg.game,
    });
  }
  connect() {
    const { url, path } = this;
    this.io = io(url, { path });
    this.io.on('welcome', this.onWelcome);
    this.io.on('join', this.onJoin.bind(this));
    this.io.on('newPlayer', this.onNewPlayer.bind(this));
    this.io.on('playerMove', this.onPlayerMove.bind(this));
    this.io.on('playerDisconnect', this.onPlayerDisconnect.bind(this));
  }
  onWelcome(serverStatus) {
    console.log('server is online', serverStatus);
  }
  onNewPlayer(player) {
    this.game.createPlayer(player);
  }
  onPlayerDisconnect(id) {
    this.game.removePlayerById(id);
  }
  onJoin(player) {
    this.game.createCurrentPlayer(player.player);
    this.game.setPlayers(player.playersList);
    console.log('#####: player', player);
  }

  onPlayerMove(moveCfg) {
    //console.log(moveCfg);

    const { game } = this;
    const { col, row, oldCol, oldRow, id } = moveCfg;
    const player = this.game.getPlayerById(id);

    if (player && player.motionProgress === 1) {
      const canMovie = player.moveToCellCoord(col, row, (cell) => cell.findObjectsByType('grass').length);
      const dirs = {
        left: [-1, 0],
        right: [1, 0],
        up: [0, -1],
        down: [0, 1],
      };
      const x = col - oldCol;
      const y = row - oldRow;
      if (x === -1 && y === 0) {
        const dir = 'left';
        if (canMovie) {
          player.setState(dir);
          player.once('motion-stopped', () => player.setState('main'));
        }
      } else if (x === 1 && y === 0) {
        const dir = 'right';
        if (canMovie) {
          player.setState(dir);
          player.once('motion-stopped', () => player.setState('main'));
        }
      } else if (x === 0 && y === -1) {
        const dir = 'up';
        if (canMovie) {
          player.setState(dir);
          player.once('motion-stopped', () => player.setState('main'));
        }
      } else if (x === 0 && y === 1) {
        const dir = 'down';
        if (canMovie) {
          player.setState(dir);
          player.once('motion-stopped', () => player.setState('main'));
        }
      }
    }
  }

  move(dir) {
    this.io.emit('move', dir);
  }

  join(playerName) {
    this.io.emit('join', playerName);
  }
}

export default ClientApi;
