import db from '../../config/db.js';
import bcrypt from 'bcryptjs';
export default async (req, res) => {
  if (!req.body.otp) {
    return onSignUp(req, res);
  }
  return onOtpSignUp(req, res);
};

const onOtpSignUp = async (req, res) => {
  const { email, otp } = req.body;
  const result = await db.query(
    'select * from temp_users where email = $1 and otp = $2',
    [email, otp]
  );
  if (result.rows.length === 0) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
  const { password, name } = result.rows[0];
  await db.query(
    'insert into users (email, password, name) values ($1, $2, $3)',
    [email, password, name]
  );
  res.status(201).json({ message: 'User created successfully' });
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
