import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { move, initOrReset } from '../actions'
import Grid from '../components/grid'
import styles from '../styles/App.sass'

class App extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  }
  handleKeyDown($event) {
    const { dispatch } = this.props
    dispatch(move($event.keyCode));
  }
  render() {
    // Injected by connect() call:
    const { dispatch, tiles, cells, width, height } = this.props
    
    return (
      <div className='container'>
        <Grid
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
    tiles: state.tiles,
    cells: cells
  }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App)