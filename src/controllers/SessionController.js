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
            sessionId: session._id
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

  static getSession(req, res, next) {
    const dto = { 
      user: req.user,
      sessionId: req.params.sessionId 
    }; 

    return SessionService.getSession(dto)
      .then(sendResponse)
      .catch(next);

    function sendResponse(session) {
      delete session.sessionDoc;
      
      res.status(200)
        .json({
          status: 200,
          data: { ...session }
        });
    }
  }

  static recordAnswer(req, res, next) {
    const dto = {
      questionId: req.body.questionId,
      answer: req.body.answer
    };

    return QuestionService.verifyAnswer(dto)
      .then(updateSession)
      .then(sendResponse)
      .catch(next);

    function updateSession(correct) {
      return SessionService.getSession({ user: req.user, sessionId: req.params.sessionId })
        .then(recordQuestion)
        .then(saveSession);

      function recordQuestion({ sessionDoc, questionCount, question }) {
        sessionDoc.questions.push({
          correct,
          questionId: question.refId
        });

        sessionDoc.cursor += 1;
        if (sessionDoc.cursor == questionCount)
          sessionDoc.status = Session.ENDED;

        return sessionDoc;
      }

      function saveSession(sessionDoc) {
        return sessionDoc.save();
      }
    }

    function sendResponse(sessionDoc) {
      res.status(200)
        .json({
          status: 200,
          data: null
        });
    }
  }
}
