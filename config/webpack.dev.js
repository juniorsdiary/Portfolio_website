const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const paths = require('./paths');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: paths.appPublic,
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    publicPath: './'
  },
  resolve: {
    alias: {
      '~': paths.appSrc,
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  devServer: {
    compress: true,
    overlay: true,
    hot: true,
    watchContentBase: true,
    contentBase: paths.appSrc,
    historyApiFallback: true,
    open: true,
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
});
