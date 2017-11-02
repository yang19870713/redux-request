const path = require('path')
const webpack = require('webpack')

const {
  UglifyJsPlugin
} = webpack.optimize

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, '../src/index')
  },
  output: {
    filename: '[name].js'
  },
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
      path.join(__dirname, '../src'),
      'node_modules',
      path.join(__dirname, '../libs')
    ]
  },
  plugins: [new UglifyJsPlugin({commnents: false, compress: { warnings: false }})]
}
