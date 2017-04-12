let webpack = require('webpack');

module.exports = {
  entry: './build/entry.js',
  output: {
    path: __dirname,
    filename: 'index.js'
  }
}