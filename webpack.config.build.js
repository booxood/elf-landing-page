const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

const ROOT = path.resolve(__dirname)

module.exports = {
  // devtool: 'eval',
  entry: [
    path.join(ROOT, 'src/js/main.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name]-[hash:6].bundle.js'
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
        'url-loader?limit=1&name=img/[name]-[hash:6].[ext]'
      ]
    }, {
      test: /\.html$/,
      loaders: [
        'html-loader'
      ]
    }]
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: path.join(ROOT, 'src/img/logo.png'),
      prefix: 'favicons-[hash:6]/'
    }),
    new HtmlWebpackPlugin({
      template: path.join(ROOT, 'src/index.html')
    }),
    new ExtractTextPlugin("css/app-[hash:6].css", {
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
