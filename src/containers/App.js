import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { move, initOrReset, addScore } from '../actions'
import Grid from '../components/grid'
import Control from '../components/control'
import styles from '../styles/App.sass'

class App extends Component {
  componentDidMount() {
    this.listener = this.handleKeyDown.bind(this);
    window.addEventListener('keydown', this.listener);
  }
  handleKeyDown($event) {
    window.removeEventListener('keydown', this.listener);
    const { dispatch, delay } = this.props;
    dispatch(move($event.keyCode));
    const score = this.calScore();
    dispatch(addScore(score));
    setTimeout(() => window.addEventListener('keydown', this.listener), delay);
  }
  calScore() {
    const { tiles } = this.props
    let score = 0
    tiles.forEach(tile => {
      if (tile !== null && tile.merged) {
        score += tile.value;
      }
    });
    return score;
  }
  render() {
    // Injected by connect() call:
    const { dispatch, tiles, cells, width, height, score } = this.props
    
    return (
      <div className='container'>
        <Control
          score={score}/>
        <Grid
          dispatch={dispatch}
          width={width}
          height={height}
          cells={cells}
          tiles={tiles} />
      </div>
    )
  }
}

App.propTypes = {
  cells: PropTypes.array.isRequired,
  tiles: PropTypes.array.isRequired
}

function createCells(config) {
  let [ { width, height }, cells ] = [ config, [] ];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      cells.push({ x, y });
    }
  }
  return cells;
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  let cells = createCells(state.config);
  return {
    height: state.config.height,
    width: state.config.width,
    target: state.config.target,
    delay: state.config.delay,
    tiles: state.tiles,
    score: state.score,
    cells: cells
  }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App)