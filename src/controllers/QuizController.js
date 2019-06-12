import Quiz from '../models/Quiz';
import QuizService from '../services/QuizService';

export default class QuizController {
  static createQuiz(req, res, next) {
    QuizService.createQuiz({ ...req.body, user: req.user })
      .then(sendResponse)
      .catch(next);

    function sendResponse(refId) {
      res.status(201)
        .json({
          status: 201,
          data: {
            refId
          }
        });
    }
  }

  static deleteQuiz(req, res, next) {
    return QuizService.deleteQuiz({ refId: req.params.quizId, user: req.user })
      .then(console.log)
      .then(sendResponse)
      .catch(next);

    function sendResponse() {
      res.status(200)
        .json({
          status: 200
        });
    }
  }

  static getAllQuizzes(req, res, next) {
    return Quiz.find({})
      .select('refId title description')
      .exec()
      .then(sendResponse)
      .catch(next);

    function sendResponse(docs) {
      res.status(200)
        .json({
          status: 200,
          data: docs
        });
    }
  }

  static getQuiz(req, res, next) {
    return Quiz.findOne({ refId: req.params.quizId })
      .select('refId title description')
      .exec()
      .then(sendResponse)
      .catch(next);

    function sendResponse(quizDoc) {
      res.status(200)
        .json({
          status: 200,
          data: quizDoc
        });
    }
  }
}
