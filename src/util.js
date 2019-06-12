import { jwtSecret } from './config';

export function createError(status, msg) {
  const error = new Error(msg);
  error.status = status;
}

export function verifyAuth(req, res, next) {
  const tokenBearer = req.headers['Authorization'];
  
  let token;

  try {
    token = tokenBearer.split(' ')[1];
  } catch (error) {
    return next(error);
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err)
      return next(err);
    req.user = { id: decoded.id };
  });
}