import { Client } from 'pg';

const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect().then(() => {
  console.log('Database connected successfully');
});

export default db;
