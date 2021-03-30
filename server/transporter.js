const nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'squadhelp.freshcode.exam@gmail.com',
    pass: 'Freshcode123',
  },
});
