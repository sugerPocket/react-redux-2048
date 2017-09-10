import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../styles/tile.sass';

export default class Tile extends Component {
  render() {
    const { value, x, y, width, height, isExisting, isNew, merged, dispatch } = this.props;
    
    let tileMerged = merged ? ' tile-merged' : '';
    let tileNew = isNew ? ' tile-new' : '';
    let tileExsting = isExisting ? '' : ' tile-nonexisted';
    return (
      <div className={`tile value-${value}${tileNew}${tileMerged}${tileExsting}`}
           style={{
             left: '' + (100 / width) * x + '%',
             top: '' + (100 / height) * y + '%'
           }} >
        <span>{value}</span>
      </div>
    );
  }
}

Tile.propTypes = {
  value: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};
