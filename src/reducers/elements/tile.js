class Tile {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.merged = false;
    this.isNew = true;
    this.isExisting = true;
  }
  getPosition(propertyName) {
    if (propertyName !== 'x' && propertyName !== 'y') return null;
    return this[propertyName];
  }
  setPosition(propertyName, value) {
    if (typeof value === 'number') this[propertyName] = value;
  }
  merge() {
    this.merged = true;
  }
  readyToRemove() {
    this.isExisting = false;
  }
}

export default Tile;