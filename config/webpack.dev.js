const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const paths = require('./paths');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: paths.appPublic,
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
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
