import React, { Component, PropTypes } from 'react';

export default class Tile extends Component {
  render() {
    return (
      <li
         x={this.props.x}
         y={this.props.y}>
        {this.props.value}
      </li>
    );
  }
}

Tile.propTypes = {
  value: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};
