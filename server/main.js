const express = require('express');
const app = express();
const compression = require('compression');
const PORT = process.env.PORT || 8080;
app.use(compression({ filter: shouldCompress }));
function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
}
app.use(express.static('public'));
app.get('/users', function(req, res) {
  res.send('users end point');
});
app.listen(PORT, () => {
  console.log(`Connected to port ${PORT}`);
});
