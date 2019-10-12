const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const nodemailer = require('nodemailer');

let testAccount = nodemailer.createTestAccount();

let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
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
app.use(bodyParser.json());

app.post('/', (req, res) => {
  
  const {name, email, message} = req.body;

  transporter.sendMail({
    from: 'tralivaliustavali@gmail.com',
    to: 'vlad.evstigneev@mail.ru',
    subject: 'Message from portfolio web-site',
    text: `
      ${name} - ${email}
      ${message}
    `
  }, (err) => {
    if (err) {
      res.json({
        status: false,
        message: 'Something went wrong',
        data: err
      });
    } else {
      res.json({
        status: true,
        message: 'Your message delivered'
      });
    }
  });
})

app.listen(PORT);