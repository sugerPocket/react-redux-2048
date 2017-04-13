let webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'index.js',
    publicPath: '/build'
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
      loader: 'style-loader!css-loader!sass-loader'
    }]
  },
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true
  }
}