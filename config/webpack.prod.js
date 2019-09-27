const paths = require('./paths');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const MiniCssPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: paths.appPublic,
    filename: 'js/[name].js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: `${paths.appConfig}/postcss.config.js`,
              },
            },
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  plugins: [
    new CompressionPlugin({
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new BundleAnalyzerPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'imgs',
        to: 'imgs',
      },
      {
        from: 'fonts',
        to: 'fonts',
      },
    ]),
  ],
});
