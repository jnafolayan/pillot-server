import Session from '../models/Session';
import Quiz from '../models/Quiz';
import { createError } from '../util';

const { PENDING, STARTED, ENDED } = Session;

export default class SessionService {
  static createSession({ user, quizId: quiz }) {
    return Session.create({ quiz, user: user.id });
  }

  static endSession({ sessionId: _id }) {
    return Session.findOne({ _id })
      .then(checkIfSessionExists)
      .then(checkIfSessionIsActive)
      .then(changeStatus);

    function checkIfSessionExists(sessionDoc) {
      if (!sessionDoc)
        throw createError(404, 'Session not found');
      return sessionDoc;
    }

    function checkIfSessionIsActive(sessionDoc) {
      switch (sessionDoc.status) {
        case PENDING:
          throw createError(403, 'Session has not started');
        case ENDED:
          throw createError(403, 'Session has ended');
      }

      return sessionDoc;
    }

    function changeStatus(sessionDoc) {
      sessionDoc.status = ENDED;
      return sessionDoc.save();
    }
  }

  static getQuizSession(dto) {
    const { user, quizId: quiz } = dto;
    return Session.findOne({ quiz, user: user.id })
      .select('_id')
      .exec()
      .then(checkIfSessionExists);

    function checkIfSessionExists(sessionDoc) {
      if (!sessionDoc)
        throw createError(404, 'Session not found');
      return sessionDoc;
    }
  }

  static getSession(dto) {
    const { user, sessionId } = dto;

    return Session.findOne({ _id: sessionId, user: user.id })
      .then(checkIfSessionExists)
      .then(checkIfSessionEnded)
      .then(getCurrentQuestion);

    function checkIfSessionExists(sessionDoc) {
      if (!sessionDoc)
        throw createError(404, 'Session not found');
      return sessionDoc;
    }
  
    function checkIfSessionEnded(sessionDoc) {
      if (sessionDoc.status == ENDED) {
        return {
          ended: true,
          correctAnswers: sessionDoc.questions.filter(q => q.correct).length,
          questionCount: sessionDoc.questions.length
        };
      } else {
        return sessionDoc;
      }
    }

    function getCurrentQuestion(sessionDoc) {
      if (sessionDoc.ended)
        return Promise.resolve(sessionDoc);

      const { cursor, quiz } = sessionDoc;

      return Quiz.findOne({ refId: quiz })
        .select('questions')
        .populate('questions')
        .then(getQuestionAtCursor)
        .then(makeQuestionSafe);

      function getQuestionAtCursor(quizDoc) {
        return {
          sessionDoc,
          cursor,
          quizId: quiz,
          questionCount: quizDoc.questions.length,
          question: quizDoc.questions[cursor]
        };
      }

      function makeQuestionSafe({ sessionDoc, cursor, quizId, questionCount, question })  {
        const { refId, text, options } = question;

        return {
          sessionDoc,
          cursor,
          quizId,
          questionCount,
          question: { 
            refId, 
            text, 
            options 
          }
        };
      }
    }
  }
}