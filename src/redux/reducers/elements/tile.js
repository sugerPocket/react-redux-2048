class Tile {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.removable = false;
  }
  getPosition(propertyName) {
    if (propertyName !== 'x' && propertyName !== 'y') return null;
    return this[propertyName];
  }
  setPosition(propertyName, value) {
    if (typeof value === 'number') this[propertyName] = value;
  }
  readyToRemove() {
    this.removable = true;
  }
}

export default Tile;