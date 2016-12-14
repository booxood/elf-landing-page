const path = require('path')
  // const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
  // const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const ROOT = path.resolve(__dirname)

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    path.join(ROOT, 'src/js/main.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css', 'postcss']
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'postcss', 'sass']
    }, {
      test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      include: /node_modules/,
      loader: "url"
    }, {
      test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
      include: /node_modules/,
      loader: 'file'
    }, {
      test: /\.(svg|png|jpe?g|jpg|gif)(\?\S*)?$/,
      exclude: /node_modules/,
      loaders: [
        'url-loader?limit=1&name=img/[name].[ext]'
      ]
    }, {
      test: /\.html$/,
      loaders: [
        'html-loader'
      ]
    }]
  },
  plugins: [
    new FaviconsWebpackPlugin(path.join(ROOT, 'src/img/logo.png')),
    new HtmlWebpackPlugin({
      template: path.join(ROOT, 'src/index.html')
    })
  ],
  postcss: [
    autoprefixer
  ],
  devServer: {
    quiet: true,
    port: 8080,
    host: '0.0.0.0',
    inline: true,
    stats: {
      colors: true
    },
    // historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    contentBase: './dist'
  }
}
