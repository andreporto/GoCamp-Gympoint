// lib to use JWT
import jwt from 'jsonwebtoken';

// lib to wrap old syntax promise onto new one
import { promisify } from 'util';

// authorization config values
import authConfig from '../../config/auth';

// middleware to verify JWT in sessions
export default async (req, res, next) => {
  // get authorization from header of http request
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided.' });
  }

  // get only token value on 2nd part of authorization header
  const [, token] = authHeader.split(' ');

  try {
    // decode token using jwt lib
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // get user id from JWT
    req.body.admin_id = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};
