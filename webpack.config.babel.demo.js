const path = require('path')
const webpack = require('webpack')

const {
  DefinePlugin,
  ProvidePlugin,
  NoEmitOnErrorsPlugin,
  HotModuleReplacementPlugin,
  NamedModulesPlugin
} = webpack

const {
  UglifyJsPlugin
} = webpack.optimize

module.exports = {
  devtool: /* 'cheap-module-eval-source-map' */ 'eval',
  entry: {
    hotloader: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?https://localhost:8000',
      'webpack/hot/only-dev-server'
    ],
    bundle: path.resolve(__dirname, './__demo__/src/index.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './__demo__/dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [['env', {modules: false}], 'react'],
            plugins: ['syntax-dynamic-import']
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    enforceExtension: false,
    modules: [
      path.join(__dirname, './__demo__/src'),
      'node_modules'
    ]
  },
  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, './__demo__/'),
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000',
        secure: false,
        changeOrigin: true
      }
    }
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new UglifyJsPlugin({
      sourceMap: true
    }),
    new ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    })
  ]
}
