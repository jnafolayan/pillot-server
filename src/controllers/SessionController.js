import Session from '../models/Session';
import SessionService from '../services/SessionService';

export default class SessionController {
  static startSession(req, res, next) {
    SessionService.startSession(req.body)
      .then(sendResponse)
      .catch(next);

    function sendResponse(session) {
      res.status(201)
        .json({
          status: 201,
          data: {
            session
          }
        });
    }
  }

  static endSession(req, res, next) {
    SessionService.endSession(req.body)
      .then(sendResponse)
      .catch(next);

    function sendResponse() {
      res.status(200)
        .json({
          status: 200
        });
    }
  }
}
