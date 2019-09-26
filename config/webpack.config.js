const paths = require('./paths');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PAGES_DIR = `${paths.appSrc}/pug/pages/`;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter(fileName => fileName.endsWith('.pug'));

module.exports = {
  entry: ['@babel/polyfill', paths.appIndex],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'imgs',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                quality: '70',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.(otf|woff|woff2|ttf|eot|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'fonts',
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${paths.appAssets}/css/[name].[hash].css`,
    }),
    new CompressionPlugin({
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      deleteOriginalAssets: true,
      minRatio: 0.8,
    }),
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: `${paths.appAssets}/imgs`,
        to: 'imgs',
      },
      {
        from: `${paths.appAssets}/fonts`,
        to: 'fonts',
      },
    ]),
    ...PAGES.map(
      page =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page.replace(/\.pug/, '.html')}`,
          minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
            removeScriptTypeAttributes: true,
          },
        })
    ),
  ],
};
