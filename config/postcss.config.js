const paths = require('./paths');
const cssMqpacker = require('css-mqpacker');
const cssnano = require('cssnano');
const stylelint = require('stylelint');
const autopref = require('autoprefixer');
const doiuse = require('doiuse');

module.exports = {
  plugins: [
    doiuse({
      browsers: ['ie >= 8', '> 1%'],
      ignore: ['rem'],
    }),
    require('postcss-preset-env')({ stage: 0 }),
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
    autopref,
  ],
};
