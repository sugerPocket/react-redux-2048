import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../styles/control.sass';

export default class Alert extends Component {
  render() {
    const { score } = this.props;
    return (
      <div className='modal fade' role='dialog'>
        
      </div>
    );
  }
}

Control.propTypes = {
  score: PropTypes.number.isRequired
};