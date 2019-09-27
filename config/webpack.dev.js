const paths = require('./paths');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: paths.appPublic,
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },
  devServer: {
    // clientLogLevel: 'silent',
    compress: true,
    overlay: true,
    hot: true,
    watchContentBase: true,
    contentBase: paths.appSrc,
    historyApiFallback: true,
    // noInfo: true,
    open: true,
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: `${paths.appConfig}/postcss.config.js`,
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
});
