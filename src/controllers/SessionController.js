import Session from '../models/Session';
import SessionService from '../services/SessionService';
import QuestionService from '../services/QuestionService';

export default class SessionController {
  static createSession(req, res, next) {
    SessionService.createSession({ ...req.body, user: req.user })
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

  static startSession(req, res, next) {
    const dto = {
      sessionId: req.params.sessionId
    };

    SessionService.startSession(dto)
      .then(sendResponse)
      .catch(next);

    function sendResponse(session) {
      res.status(200)
        .json({
          status: 200,
          data: {
            session
          }
        });
    }
  }

  static endSession(req, res, next) {
    const dto = {
      sessionId: req.params.sessionId
    };

    SessionService.endSession(dto)
      .then(sendResponse)
      .catch(next);

    function sendResponse() {
      res.status(200)
        .json({
          status: 200
        });
    }
  }

  static getQuestion(req, res, next) {
    const dto = {
      sessionId: req.params.sessionId,
      quizId: req.params.quizId,
      questionId: req.params.questionId
    };

    return QuestionService.getQuestion(dto)
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
    
    return QuestionService.verifyAnswer(dto)
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
