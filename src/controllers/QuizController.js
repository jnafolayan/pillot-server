import Quiz from '../models/Quiz';
import QuizService from '../services/QuizService';

export default class QuizController {
  static createQuiz(req, res, next) {
    QuizService.createQuiz(req.body)
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

  static deleteQuiz(req, res, next) {
    return QuizService.deleteQuiz(req.body)
      .then(sendResponse)
      .catch(next);

    function sendResponse(userDoc) {
      res.status(200)
        .json({
          status: 200
        });
    }
  }
}
