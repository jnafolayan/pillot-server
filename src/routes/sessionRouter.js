import { Router } from 'express';
import SessionController from '../controllers/SessionController';
import { verifyAuth } from '../util';

const sessionRouter = new Router();

sessionRouter.post('/', verifyAuth, SessionController.createSession);
sessionRouter.post('/:sessionId/start', verifyAuth, SessionController.startSession);
sessionRouter.post('/:sessionId/end', verifyAuth, SessionController.endSession);

sessionRouter.get('/:sessionId/questions/:questionId', verifyAuth, SessionController.getQuestion);

export default sessionRouter;
