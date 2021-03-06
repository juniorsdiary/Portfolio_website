const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default

const paths = require('./paths');

const PAGES_DIR = `${paths.appSrc}/pug/pages/`;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter(fileName => fileName.endsWith('.pug'));
  
module.exports = {
  entry: ['@babel/polyfill', paths.appSrc],
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
      {
        test: /\.scss|css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            }
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }, {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: `${paths.appConfig}/postcss.config.js` } }
          }, {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebPackPlugin([{from: `${paths.appAssets}/imgs`, to: 'imgs'}]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      optipng: {
        optimizationLevel: 9
      },
      jpegtran: {
        progressive: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: './[name].[hash].css',
    }),
    ...PAGES.map(
      page =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          favicon: `${paths.appSrc}/logo.ico`,
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
