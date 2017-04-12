import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { move, initOrReset } from '../actions'
import Grid from '../components/grid'

class App extends Component {
  render() {
    // Injected by connect() call:
    const { dispatch, tiles, cells } = this.props
    return (
      <div>
        <Grid
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
  let [ { width, length }, cells ] = [ config, [] ];

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < length; y++) {
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
    target: state.config.target,
    tiles: state.tiles,
    cells: cells
  }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App)