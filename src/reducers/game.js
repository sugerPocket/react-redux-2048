import { Cell, Tile } from './elements';
import { combineReducers } from 'redux';
import { actions, config, directions, vectors } from '../constants';

class GameState {
  constructor(width, height, target) {
    target  = typeof target === 'number' ? target : 0;
    width   = typeof width === 'number' ? width : 0;
    height  = typeof height === 'number' ? height : 0;

    this.score  = 0;
    this.target = target;
    this.config = {
      target,
      width,
      height
    };

    this.tiles = new Array(height * width);
  }
}


let cells  = new Array(config.width);
    
for (let i = 0; i < config.width; i++) {
  let cellsCloumn = [];
  for (let j = 0; j < config.height; j++) cellsCloumn.push(new Cell());

  cells[i] = cellsCloumn;
}

/**
 * @description reducer 入口
 * @param {GameState} state 当前的 state
 * @param {Object} action redux action
 */
const game =
  combineReducers({
    tiles,
    score
  });

/**
 * 
 * @description tiles reducer 入口
 * @param {Array} tiles
 * 
 */
function tiles(tiles = new Array(config.height * config.width), action) {
  switch(action.type) {
    case actions.MOVE:
      return move(tiles, action.direction);
    default:
      return tiles;
  }
}

/**
 * 
 * @description score reducer 入口
 * @param {Number} score
 * 
 */
function score(score = 0, action) {
  return score;
}


/**
 * @description 获取 初始化的 state (创建两个 tile)
 * @return {GameState} state 初始化的 state
 */
function getInitState() {
  let state = new GameState(config.height, config.width, config.target);

  createTile(state.tiles);
  createTile(state.tiles);

  return state;
}

/**
 * @description 创建 tile
 * @param {Array} tiles  
 * @return {Array} tiles 
 */
function createTile(tiles) {
  let x = Math.floor(Math.random() * config.width);
  let y = Math.floor(Math.random() * config.height);

  while (!cells[x][y].isEmpty()) {
    x = Math.floor(Math.random() * config.width);
    y = Math.floor(Math.random() * config.height);
  }

  let value = Math.random() * 100 > 90 ? 4 : 2;

  let newTile = new Tile(x, y, value);
  cells[x][y].setTile(newTile);

  let index = findTheOpen(tiles);
  if (index != -1) tiles[index] = newTile;

  return tiles;
}

/**
 * @description 在数组中找到没有 item 的那一项
 * @param {Array} list 查找的数组
 * @return {Number} index 数组下标(-1 表示未找到)
 */
function findTheOpen(list) {
  let index = -1;

  for (let i = 0; i < config.width * config.height; i++) {
    if (!list[i]) {
      index = i;
      break;
    }
  }

  return index;
}

/**
 * @description 根据 direction 判断是否反向遍历
 * @param {Object} direction 
 */
function isConverseIter(direction) {
  return (direction.x >= 0 && direction.y >= 0);
}

/**
 * @description 计算 tile 的 move 的方法
 * @param {Array} tiles 
 * @param {Object} direction 向量
 * @return {Array} tiles 
 */
function move(tiles, direction) {
  let newTiles = tiles.concat();
  if (!direction) return newTiles;
  else direction = vectors[direction];
  
  let isConverse = isConverseIter(direction);
  let i = isConverse ? config.width - 1 : 0;
  
  let hasOperated = false;
  cleanUpTiles(newTiles);
  while (isConverse ? i >= 0 : i < config.width) {
    let j = isConverse ? config.height - 1 : 0;
    while (isConverse ? j >= 0 : j < config.height) {
      if (cells[i][j].isEmpty()) {
        isConverse ? j-- : j++;
        continue;
      }

      let tile = cells[i][j].getTile();

      while (movable(tile, direction)) {
        moveOneTile(tile, direction);
        hasOperated = true;
      }

      isConverse ? j-- : j++;

      if (overStep(tile, direction)) continue;

      let { x, y } = virtualMove(tile, direction);

      if (isBlocking(tile, direction)) {
        let blockTile = cells[x][y].getTile();
        if (blockTile.value === tile.value && !blockTile.merged) {
          cells[tile.x][tile.y].remove();
          cells[x][y].merge(tile);
          hasOperated = true;
        }
      }
    }
    isConverse ? i-- : i++;
  }

  if(hasOperated) createTile(newTiles);

  return newTiles;
}

/**
 * @description 模拟 move 并返回 move 之后的结果
 * @param {Tile} tile 
 * @param {Object} direction 
 * @return {Object} position 返回 move 后的位置
 */

function virtualMove(tile, direction) {
  let x = tile.getPosition('x');
  let y = tile.getPosition('y');

  return {
    x: x + direction.x,
    y: y + direction.y
  };
}

/**
 * @description 移动一个 tile
 * @param {Tile} tile 
 * @param {Object} direction 
 */
function moveOneTile(tile, direction) {
  let { x, y } = virtualMove(tile, direction);

  cells[x][y].setTile(tile);

  cells[tile.getPosition('x')][tile.getPosition('y')].remove();

  tile.setPosition('x', x);
  tile.setPosition('y', y);
}

/**
 * @description 判断是否越界
 * @param {Tile} tile 判断是否越界的块
 * @param {Object} direction 向量
 * @return {Boolean} overStep 
 */
function overStep(tile, direction) {
  let { x, y } = virtualMove(tile, direction);

  return x < 0 || y < 0 || x >= config.width || y >= config.height;
}

/**
 * @description 判断是否有tile阻挡
 * @param {Tile} tile 
 * @param {Object} direction 
 * @return {Boolean} isBlocking
 */
function isBlocking(tile, direction) {
  let { x, y } = virtualMove(tile, direction);
  
  return !cells[x][y].isEmpty();
}

/**
 * @description 判断是否可移动
 * @param {Tile} tile 
 * @param {Object} direction 
 * @return {Boolean} movable
 */

function movable(tile, direction) {
  if (overStep(tile, direction)) return false;
  else return !isBlocking(tile, direction);
}

/**
 * @description 清理无用的tile
 * @param {Array} tiles 
 */
function cleanUpTiles(tiles) {
  tiles.map((tile, index) => {
    if(tile && !tile.isExisting) tiles[index] = null;
    if(tile && tile.merged) tile.merged = false;
    if(tile && tile.isNew) tile.isNew = false;
  });
}

export default game;
