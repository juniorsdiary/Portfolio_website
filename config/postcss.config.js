const cssMQPacker = require('css-mqpacker');
const cssnano = require('cssnano');
const stylelint = require('stylelint');
const doIUse = require('doiuse');
const presetCss = require('postcss-preset-env')
const compose = require('postcss-plugin-composition')
const paths = require('./paths');

module.exports = {
  plugins: [
    compose([
      presetCss({ stage: 4 }),
    ]),
    doIUse({
      browsers: ['> 2%', 'not dead'],
      ignore: ['rem'],
    }),
    cssMQPacker({
      sort: true,
    }),
    cssnano({
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
    stylelint({
      configFile: `${paths.appConfig}/stylelint.config.js`,
      context: paths.appSrc,
      files: '**/*.css',
      failOnError: false,
      quiet: false,
    }),
  ],
};
