let webpack = require('webpack');

module.exports = {
  entry: './build/entry.js',
  output: {
    path: __dirname,
    filename: 'index.js'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.sass$/,
      loader: 'style!css!sass'
    }]
  }
}