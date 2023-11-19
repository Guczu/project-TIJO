import jwt from 'jsonwebtoken';
import config from '../config.js';

const auth = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if (!token) {
    req.isValid = false;
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    req.user = jwt.verify(token, config.JwtSecret);
    req.isValid = true;
    next();
  }
  catch (ex) {
    req.isValid = false;
    res.status(400).send('Invalid token.');
  }
};

export default auth;
