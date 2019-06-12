import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/User';

import { createError } from '../util';

export default class UserService {
  static createUser({ username, password }) {
    return generatePasswordHash()
      .then(createUser);

    function generatePasswordHash() {
      return bcrypt.hash(password, 11);
    }

    function createUser(hash) {
      return User.create({
        username: username,
        password: hash,
      });
    }
  }

  static loginUser({ username, password }) {
    return User.findOne({ username })
      .catch(checkIfUserExists)
      .then(verifyPassword)
      .then(generateToken);

    function checkIfUserExists(userDoc) {
      if (!userDoc)
        throw createError(404, 'User account not found');       
    }

    function verifyPassword(userDoc) {
      return bcrypt.compare(password, userDoc.password)
        .then(result => {
          if (!result)
            throw createError(401, 'Incorrect password');
          else
            return userDoc;
        });
    }

    function generateToken({ _id }) {
      const token = jwt.sign({ id: _id }, config.jwtSecret, { expiresIn: '7d' });
      return token;
    }
  }
}