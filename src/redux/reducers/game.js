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
    
    this.cells  = new Array(width);
    
    for (let i = 0; i < width; i++) {
      let cellsCloumn = [];
      for (let j = 0; j < height; j++) cellsCloumn.push(new Cell());

      this.cells[i] = cellsCloumn;
    }

    this.tilesList = new Array(height * width);
  }
}

/**
 * @description reducer 入口
 * @param {GameState} state 当前的 state
 * @param {Object} action redux action
 */
function game(state = getInitState(), action) {
  switch (action.type) {
    case actions.MOVE:
      return move(state, vectors[action.direction]);
    case actions.INITORRESET:
      return getInitState(); 
  }
}


/**
 * @description 获取 初始化的 state (创建两个 tile)
 * @return {GameState} state 初始化的 state
 */
function getInitState() {
  let state = new GameState(config.length, config.width, config.target);

  createTile(state);
  createTile(state);

  return state;
}

/**
 * @description 创建 tile
 * @param {GameState} state  
 * @return {GameState} state 
 */
function createTile(state) {
  let x = Math.floor(Math.random() * config.width);
  let y = Math.floor(Math.random() * config.length);

  while (!state.cells[x][y].isEmpty()) {
    x = Math.floor(Math.random() * config.width);
    y = Math.floor(Math.random() * config.length);
  }

  let value = Math.random() * 100 > 70 ? 4 : 2;

  let newTile = new Tile(x, y, value);
  state.cells[x][y].setTile(newTile);

  let index = findTheOpen(state.tilesList);
  if (index != -1) state.tilesList[index] = newTile;

  return state;
}

/**
 * @description 在数组中找到没有 item 的那一项
 * @param {Array} list 查找的数组
 * @return {Number} index 数组下标(-1 表示未找到)
 */
function findTheOpen(list) {
  let index = -1;

  for (let i = 0; i < config.width * config.length; i++) {
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
 * @param {GameState} state 
 * @param {Object} direction 向量
 * @return {GameState} state 
 */
function move(state, direction) {
  let newState = Object.assign({}, state);
  
  let isConverse = isConverseIter(direction);
  let i = isConverse ? config.width - 1 : 0;
  let j = isConverse ? config.length - 1 : 0;

  while (isConverse ? i >= 0 : i < config.width) {
    while (isConverse ? j >= 0 : j < config.length) {
      if (state.cells[i][j].isEmpty()) {
        isConverse ? j-- : j++;
        continue;
      }

      let tile = state.cells[i][j].getTile();

      while (movable(state, tile, direction)) moveOneTile(state, tile, direction);

      isConverse ? j-- : j++;

      if (overStep(tile, direction)) continue;

      let { x, y } = virtualMove(tile, direction);

      if (isBlocking(state, tile, direction)) {
        let blockTile = state.cells[x][y].getTile();
        if (blockTile.value === tile.value) state.cells[x][y].merge(tile);
      }
    }
    isConverse ? i-- : i++;
  }

  return newState;
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
 * @param {GameState} state 
 * @param {Tile} tile 
 * @param {Object} direction 
 */
function moveOneTile(state, tile, direction) {
  let { x, y } = virtualMove(tile, direction);

  state.cells[x][y].setTile(tile);

  state.cells[tile.getPosition('x')][tile.getPosition('y')].remove();

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

  return x < 0 || y < 0 || x >= config.width || y >= config.length;
}

/**
 * @description 判断是否有tile阻挡
 * @param {GameState} state 
 * @param {Tile} tile 
 * @param {Object} direction 
 * @return {Boolean} isBlocking
 */
function isBlocking(state, tile, direction) {
  let { x, y } = virtualMove(tile, direction);
  
  return state.cells[x][y].isEmpty();
}

/**
 * @description 判断是否可移动
 * @param {GameState} state 
 * @param {Tile} tile 
 * @param {Object} direction 
 * @return {Boolean} movable
 */

function movable(state, tile, direction) {
  if (overStep(tile, direction)) return false;
  else return isBlocking(state, tile, direction);
}

export default game;
