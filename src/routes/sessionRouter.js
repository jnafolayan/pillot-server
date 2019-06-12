import { Router } from 'express';
import SessionController from '../controllers/SessionController';
import { verifyAuth } from '../util';

const sessionRouter = new Router();

sessionRouter.post('/', verifyAuth, SessionController.createSession);
sessionRouter.post('/:sessionId', verifyAuth, SessionController.startSession);
sessionRouter.delete('/:sessionId', verifyAuth, SessionController.endSession);

sessionRouter.get('/:sessionId/questions/:questionId', verifyAuth, SessionController.getQuestion);

export default sessionRouter;
