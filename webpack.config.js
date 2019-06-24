'use strict';

const path = require('path');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  context: __dirname,

  entry: ['@babel/polyfill', './todo_manager/todo/static/index'],

  output: {
    path: path.resolve('./todo_manager/todo/static/bundles/'),
    filename: 'bundle.js'
  },

  plugins: [new BundleTracker({ filename: './todo_manager/webpack-stats.json' })],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './todo_manager/todo/static'
  },
  watchOptions: {
    ignored: /node_modules/
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
};
