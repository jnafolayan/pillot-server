import User from '../models/User';
import UserService from '../services/UserService';

export default class UserController {
  static signupUser(req, res, next) {
    UserService.createUser(req.body)
      .then(sendResponse)
      .catch(next);

    function sendResponse(userDoc) {
      res.status(201)
        .json({
          status: 201,
          data: {
            username: userDoc.username
          }
        });
    }
  }

  static loginUser(req, res, next) {
    UserService.loginUser(req.body)
      .then(sendResponse)
      .catch(next);

    function sendResponse(token) {
      res.status(200)
        .json({
          status: 200,
          data: {
            token
          }
        });
    }
  }
}
