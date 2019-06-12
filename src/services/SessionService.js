import Session from '../models/Session';
import { createError } from '../util';

const PENDING = 'pending';
const STARTED = 'started';
const ENDED = 'ended';

export default class SessionService {
  static createSession({ user, quizId }) {
    return Session.create({ user: user.id, quiz: quizId });
  }

  static startSession({ sessionId }) {
    return Session.findOne({ _id: sessionId })
      .then(checkIfSessionIsPending)
      .then(changeStatus);

    function checkIfSessionIsPending(sessionDoc) {
      switch (sessionDoc.status) {
        case STARTED:
          throw createError(403, 'Session already started');
        case ENDED:
          throw createError(403, 'Session has ended');
      }

      return sessionDoc;
    }

    function changeStatus(sessionDoc) {
      sessionDoc.status = STARTED;
      return sessionDoc.save();
    }
  }

  static endSession({ sessionId }) {
    return Session.findOne({ _id: sessionId })
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
}