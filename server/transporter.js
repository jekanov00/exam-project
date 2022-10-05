const nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'kailee35@ethereal.email',
    pass: 'tTkn8t6nJ23Q5wf9sf',
  },
});
