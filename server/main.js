const express = require('express');
const app = express();
const compression = require('compression');
const PORT = process.env.PORT || 8080;
function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
}
app.use(compression({ filter: shouldCompress }));
app.use(express.static('public'));
app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
