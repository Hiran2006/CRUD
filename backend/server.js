import express from 'express';
import 'dotenv/config.js';
import bodyParser from 'body-parser';
import api from './routes/api.js';

const app = express();
app.use(bodyParser.json());

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
