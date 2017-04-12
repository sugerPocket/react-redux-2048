import React, { Component, PropTypes } from 'react';
import Cell from './cell';
import Tile from './tile';

export default class Grid extends Component {
  render() {
    return (
      <ul>
        {this.props.cells.map((cell, index) =>
          <Cell {...cell}
                key={index} />
        )}
        {this.props.tiles.map((tile, index) =>
          <Tile {...tile}
                key={index} />
        )}
      </ul>
    )
  }
}

Grid.propTypes = {
  cells: PropTypes.array.isRequired,
  tiles: PropTypes.array.isRequired
}