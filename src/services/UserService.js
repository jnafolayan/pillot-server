import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User';

import { jwtSecret } from '../config';
import { createError } from '../util';

export default class UserService {
  static createUser({ username, password }) {
    return User.findOne({ username })
      .then(checkIfUserExists)
      .then(generatePasswordHash)
      .then(createUser);

    function checkIfUserExists(userDoc) {
      if (userDoc)
        throw createError(422, 'Account already exists');
      return userDoc;
    }

    function generatePasswordHash() {
      return bcrypt.hash(password, 11);
    }

    function createUser(hash) {
      return User.create({
        username,
        password: hash
      });
    }
  }

  static loginUser({ username, password }) {
    return User.findOne({ username })
      .then(checkIfUserExists)
      .then(verifyPassword)
      .then(generateToken);

    function checkIfUserExists(userDoc) {
      if (!userDoc)
        throw createError(404, 'User account not found');       
      return userDoc;
    }

    function verifyPassword(userDoc) {
      return bcrypt.compare(password, userDoc.password)
        .then(result => {
          if (!result)
            throw createError(404, 'Incorrect password');
          else
            return userDoc;
        });
    }

    function generateToken({ _id }) {
      const token = jwt.sign({ id: _id }, jwtSecret, { expiresIn: '7d' });
      return token;
    }
  }
}