import Tile from './tile';

class Cell {
  constructor(tile) {
    this.tile = tile instanceof Tile ? tile : null;
  }
  getTile() {
    return this.tile;
  }
  merge(anotherTile) {
    this.tile.value = anotherTile.value + this.tile.value;
    anotherTile.setPosition('x', this.tile.getPosition('x'));
    anotherTile.setPosition('y', this.tile.getPosition('y'));
    anotherTile.readyToRemove();
    this.tile.merge();
  }
  remove() {
    this.tile = null;
  }
  setTile(newTile) {
    this.tile = newTile;
  }
  isEmpty() {
    return (this.tile == null);
  }
}

export default Cell;