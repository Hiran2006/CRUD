import db from '../../config/db.js';
import transporter from '../../config/mailer.js';
import mailer from '../../config/mailer.js';
import bcrypt from 'bcryptjs';
export default async (req, res) => {
  if (!req.body.otp) {
    return onSignUp(req, res);
  }
  return onOtpSignUp(req, res);
};

const onOtpSignUp = async (req, res) => {
  const { email, otp } = req.body;
  res.end();
};

const onSignUp = async (req, res) => {
  const { email, pass, name } = req.body;

  if (!email || !pass || !name) {
    return res
      .status(400)
      .json({ error: 'Email,Name and password are required' });
  }
  try {
    const { rows } = await db.query('select * from users where email = $1', [
      email,
    ]);
    if (rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashPass = await bcrypt.hash(
      pass,
      Number(process.env.BCRYPT_SALT_ROUNDS)
    );
    const otp = Math.floor(100000 + Math.random() * 900000);
    const mailInfo = await mailer.sendMail(
      {
        from: '"Example Team" <team@example.com>', // sender address
        to: 'alice@example.com, bob@example.com', // list of receivers
        subject: 'Hello', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>', // html body
      },
      (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      }
    );
    await db.query(
      'insert into temp_users (email, password, name,otp) values ($1, $2, $3,$4)',
      [email, hashPass, name, otp]
    );
    return res.status(201).json({ message: 'OTP Requested' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Database error' });
  }
};
