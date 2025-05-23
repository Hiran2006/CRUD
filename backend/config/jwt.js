import jwt from 'jsonwebtoken';

const setToken = data => {
  try {
    return jwt.sign(data, process.env.TOKEN_SECRTE_KEY);
  } catch {
    return null;
  }
};
const getToken = token => {
  try {
    return jwt.verify(token);
  } catch {
    console.error(`Error on token ${token}`);
    return null;
  }
};
