const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const PORT = process.env.PORT || 8080;
const app = express();

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
}

const middleWares = [
    bodyParser.urlencoded()
]

app.use(compression({ filter: shouldCompress }));
app.use(middleWares);
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('./index.html');
})
app.listen(PORT);