import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../styles/cell.sass';

export default class Cell extends Component {
  render() {
    const { value, x, y, width, height } = this.props;
    return (
      <div className='cell'
         x={x}
         y={y}>
         &nbsp;
      </div>
    );
  }
}

Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};
