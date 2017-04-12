import React, { Component, PropTypes } from 'react';

export default class Cell extends Component {
  render() {
    return (
      <li
         x={this.props.x}
         y={this.props.y}>
      </li>
    );
  }
}

Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};
