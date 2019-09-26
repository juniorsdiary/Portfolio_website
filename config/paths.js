const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appPublic: resolveApp('public'), // Prod built files end up here
  appConfig: resolveApp('config'), // App config files
  appSrc: resolveApp('src'), // source
  appHtml: resolveApp('src/index.html'),
  appIndex: resolveApp('src/index.js'), // Main entry point
  appAssets: resolveApp('src/assets'), // For images and other assets
};
