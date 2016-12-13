const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const ROOT = path.resolve(__dirname)

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    path.join(ROOT, 'src/js/main.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/elf/',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', ['css-loader?minimize', 'postcss-loader'])
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', ['css-loader?minimize', 'postcss-loader', 'sass-loader'])
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
    new HtmlWebpackPlugin({
      template: path.join(ROOT, 'src/index.html')
    }),
    new ExtractTextPlugin("css/app.css", {
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  postcss: [
    autoprefixer
  ]
}
