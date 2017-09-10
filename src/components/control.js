import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from '../styles/control.sass';

export default class Control extends Component {
  render() {
    const { score } = this.props;
    return (
      <div className='control'>
        <div className='heading clearfix'>
          <h1 className='title'>2048</h1>
          <div className='score pull-right'>
            <div className='current'>
              { score }
            </div>
          </div>
        </div>
        <div className='intro clearfix'>
          <div className='pull-left'>
            <h2>Play <strong>2048</strong> Game Online</h2>
            <p>Join the numbers and get to the <strong>2048 tile!</strong></p>
          </div>
          <div className='new-game pull-right'>
            New Game
          </div>
        </div>
      </div>
    );
  }
}

Control.propTypes = {
  score: PropTypes.number.isRequired
};