const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});

const PORT = process.env.PORT || 8080;
const app = express();

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
}

app.use(compression({ filter: shouldCompress }));

app.use(express.static('public'));

app.post('/', bodyParser.json(), (req) => {
  
  const {name, email, message} = req.body;
  
  transport.sendMail({
    from: '',
    to: 'vlad.evstigneev@mail.ru',
    subject: 'Message from portfolio web-site',
    text: `
      ${name} - ${email}
      ${message}
    `
  });
})

app.listen(PORT);