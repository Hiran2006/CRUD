import nodemailer from 'nodemailer';

let transporter;
const temp = nodemailer.createTestAccount((err, account) => {
  transporter = nodemailer.createTransport({
    host: account.smtp.host,

    port: account.smtp.port,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  transporter.verify().then(res => {
    if (res) {
      console.log('Mailer is ready to send emails');
    }
  });
});

export default transporter;
