import { Router } from 'express';
import { check } from 'express-validator';
import SessionController from '../controllers/SessionController';
import { verifyAuth, checkRequestErrors } from '../util';

const sessionRouter = new Router();

const sessionCreationCheck = [
  check('quizId').isString(), 
];

sessionRouter.post('/', sessionCreationCheck, checkRequestErrors, verifyAuth, SessionController.createSession);
sessionRouter.post('/:sessionId/end', verifyAuth, SessionController.endSession);

const recordAnswerCheck = [
  check('questionId').isString(),
  check('answer').isString()
];

sessionRouter.get('/:sessionId', verifyAuth, SessionController.getSession);
sessionRouter.post('/:sessionId/answer', recordAnswerCheck, checkRequestErrors, verifyAuth, SessionController.recordAnswer);

export default sessionRouter;
