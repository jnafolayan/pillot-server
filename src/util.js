import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { jwtSecret } from './config';

export function createError(status, msg) {
  const error = new Error(msg);
  error.status = status;
  error.__custom = true;
  return error;
}

export function checkRequestErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array().shift();
    return next(createError(422, `${err.param}: ${err.msg}`));
  }
  next();
}

export function verifyAuth(req, res, next) {
  const tokenBearer = req.headers['authorization'];
  
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
    next();
  });
}

export function appendUser(req, res, next) {
  const tokenBearer = req.headers['authorization'];
  
  let token;

  try {
    token = tokenBearer.split(' ')[1];
  } catch (error) {
    return next();
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err)
      return next();
    req.user = { id: decoded.id };
    next();
  });
}