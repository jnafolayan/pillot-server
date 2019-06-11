import bcrypt from 'bcrypt';

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
      const user = new User({
        username: username,
        password: hash,
      });
    }
  }

  static loginUser({ username, password }) {
    return User.findOne({ username })
      .catch(checkIfUserExists)
      .then(verifyPassword);

    function checkIfUserExists(userDoc) {
      if (!userDoc)
        throw createError(404, 'User account not found');       
    }

    function verifyPassword(userDoc) {
      return bcrypt.compare(password, userDoc.password)
        .then(result => {
          if (!result)
            throw createError(401, 'Incorrect password');
        });
    }
  }
}