import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from './cell';
import Tile from './tile';

export default class Grid extends Component {
  render() {
    return (
      <div className='game-container'>
        <div className='cells-container'>
          {this.props.cells.map((cell, index) =>
          <Cell {...cell}
                key={index} />
          )}
        </div>
        <div className='tiles-container'>
          {this.props.tiles.map((tile, index) =>
            <Tile {...tile}
                  key={index} />
          )}
        </div>
      </div>
    )
  }
}

Grid.propTypes = {
  cells: PropTypes.array.isRequired,
  tiles: PropTypes.array.isRequired
}