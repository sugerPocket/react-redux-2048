import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Cell extends Component {
  render() {
    const { value, x, y } = this.props;
    return (
      <div className='cell'
         x={x}
         y={y}>
        {'cell x: ' + x +' y: ' + y}
      </div>
    );
  }
}

Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};
