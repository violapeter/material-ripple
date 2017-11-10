const webpack = require('webpack')
const path = require('path')

const config = {
  entry: ['./src/index.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'material-ripple.min.js',
    library: 'MaterialRipple',
    libraryTarget: 'var'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}

config.plugins = config.plugins || []

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
} else {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  )

  config.devServer = {
    contentBase: path.join(__dirname, 'public'),
    filename: 'material-ripple.min.js'
  }
}

module.exports = config
