const path = require('path')
const webpack = require('webpack')
var nodeExternals = require('webpack-node-externals')

const {
  UglifyJsPlugin
} = webpack.optimize

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, './src/index')
  },
  output: {
    filename: 'redux-request.js',
    path: path.resolve(__dirname, './dist'),
    libraryTarget: 'umd'
  },
  externals: nodeExternals(),
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [['env', {modules: false}]]
        }
      }]
    }]
  },
  resolve: {
    extensions: ['.js'],
    enforceExtension: false,
    modules: [
      path.join(__dirname, './src'),
      'node_modules'
    ]
  },
  plugins: [new UglifyJsPlugin({commnents: false, compress: { warnings: false }})]
}
