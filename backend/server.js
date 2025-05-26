import express from 'express';
import 'dotenv/config.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import api from './routes/api.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.SERVER_PORT || 8080;
app.listen(port, err => {
  if (!err) {
    console.log(`Server is open at port ${port}`);
  } else {
    console.error('Server have Error in Starting');
  }
});

app.use('/api', api);

app.get('/', (req, res) => {
  res.redirect('/login');
});
