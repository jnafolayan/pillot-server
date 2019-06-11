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

  static getAllQuizzes(req, res, next) {
    return Quiz.find()
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
    return Quiz.findOne({ refId: req.body.refId })
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

  static getQuestion(req, res, next) {
    const dto = {
      quizId: req.params.quizId,
      questionId: req.params.questionId
    };

    return QuizService.getQuestion(dto)
      .then(sendResponse)
      .catch(next);

    function sendResponse(questionDoc) {
      res.status(200)
        .json({
          status: 200,
          data: questionDoc
        });
    }
  }

  static verifyAnswer(req, res, next) {
    const dto = {
      quizId: req.params.quizId,
      questionId: req.params.questionId,
      answer: req.body.answer
    };
    
    return QuizService.verifyAnswer(dto)
      .then(sendResponse)
      .catch(next);

    function sendResponse(correct) {
      res.status(200)
        .json({
          status: 200,
          data: {
            correct
          }
        });
    }
  }
}
