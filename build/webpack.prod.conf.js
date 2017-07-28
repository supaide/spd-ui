var path = require('path')
const pkg = require('../package.json');
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: './src/index.js'
  },
  module: {
    rules: [...utils.styleLoaders({ sourceMap: false}), {
      test: /\.vue$/,
      loader: 'vue-loader'
    }]
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: 'spd-ui.min.js',
    library: 'SPD-UI',
    libraryTarget: 'umd'
  },
  /*
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  */
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.BannerPlugin([
      pkg.name + ' v' + pkg.version + ' (' + pkg.homepage + ')',
      'Copyright ' + new Date().getFullYear() + ', ' + pkg.author,
      pkg.license + ' license'
    ].join('\n')),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new UnminifiedWebpackPlugin({
      postfix: ''
    })
  ]
})

module.exports = webpackConfig
