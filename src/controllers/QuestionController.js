import Question from '../models/Question';
import QuestionService from '../services/QuestionService';

export default class QuestionController {
  static getQuestion(req, res, next) {
    QuestionService.getQuestion(req.body)
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

  static verifyAnswer(req, res, next) {
    QuestionService.loginQuestion(req.body)
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
