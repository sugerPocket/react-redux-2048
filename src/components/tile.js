import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tile extends Component {
  render() {
    const { value, x, y, viewWidth, viewHeight } = this.props;
    return (
      <div className='tile'
           style={
             
           } >
        {value + ' x: ' + x + ' y: ' + y}
      </div>
    );
  }
}

Tile.propTypes = {
  value: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};
