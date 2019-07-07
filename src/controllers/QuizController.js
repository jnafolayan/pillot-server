import Quiz from '../models/Quiz';
import QuizService from '../services/QuizService';
import SessionService from '../services/SessionService';

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
    let query = {};
    if (req.query && req.query.search) {
      query['$text'] = {
        '$search': req.query.search
      };
    }

    return Quiz.find(query)
      .select('refId title description questions backdrop')
      .exec()
      .then(sendResponse)
      .catch(next);

    function sendResponse(docs) {
      docs = docs.map(({ refId, title, description, questions, backdrop }) => {
        return {
          refId,
          title,
          description,
          backdrop,
          questionCount: questions.length
        }
      });

      res.status(200)
        .json({
          status: 200,
          data: docs
        });
    }
  }

  static getQuiz(req, res, next) {
    let quiz = null;

    return Quiz.findOne({ refId: req.params.quizId })
      .select('refId title description questions creator backdrop')
      .populate('creator')
      .exec()
      .then(fetchUserSession)
      .then(sendResponse)
      .catch(next);

    function fetchUserSession(quizDoc) {
      quiz = quizDoc;
      return req.user ? 
        SessionService.getQuizSession({ user: req.user, quizId: req.params.quizId })
          .catch(() => null) :
        Promise.resolve();
    }

    function sendResponse(session) {
      const { refId, title, description, questions, creator, backdrop } = quiz;

      res.status(200)
        .json({
          status: 200,
          data: {
            refId,
            title,
            description,
            backdrop,
            session: session ? session._id : null,
            creator: creator.username,
            questionCount: questions.length
          }
        });
    }
  }

  static getQuizSession(req, res) {
    const dto = {
      quizId: req.params.quizId,
      user: req.user
    };

    SessionService.getQuizSession(dto)
      .then(sendResponse)
      .catch(next);

    function sendResponse(session) {
      res.status(200)
        .json({
          status: 200,
          data: {
            sessionId: session._id
          }
        });
    }
  }
}
