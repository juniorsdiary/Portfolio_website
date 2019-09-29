const paths = require('./paths');
const cssMqpacker = require('css-mqpacker');
const cssnano = require('cssnano');
const stylelint = require('stylelint');
// const autoprefixer = require('autoprefixer');
const doiuse = require('doiuse');

module.exports = {
  plugins: [
    require('postcss-plugin-composition')([
      require('postcss-preset-env')({ stage: 4 }),
    ]),
    doiuse({
      browsers: ['> 2%', 'not dead'],
      ignore: ['rem'],
    }),
    cssMqpacker({
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
