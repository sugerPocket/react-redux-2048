import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from './cell';
import Tile from './tile';
import style from '../styles/grid.sass';

export default class Grid extends Component {
  render() {
    const { tiles, cells, height, width, dispatch } = this.props;
    return (
      <div className='game-container'>
        <div className='cells-container'>
          <div className='cells-wrapper'>
            {this.props.cells.map((cell, index) => 
              <Cell {...cell}
                    height={height}
                    width={width}
                    key={index} />
            )}
          </div>
        </div>
        <div className='tiles-container'>
          <div className='tiles-wrapper'>
            {
              this.props.tiles.map((tile, index) => {
                if (tile)
                 return (<Tile {...tile}
                      dispatch={dispatch}
                      height={height}
                      width={width}
                      key={index} />)
                else return;
              }
            )}
          </div>
        </div>
      </div>
    )
  }
}

Grid.propTypes = {
  cells: PropTypes.array.isRequired,
  tiles: PropTypes.array.isRequired
}