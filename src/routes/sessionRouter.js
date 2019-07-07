import { Router } from 'express';
import SessionController from '../controllers/SessionController';
import { verifyAuth } from '../util';

const sessionRouter = new Router();

sessionRouter.post('/', verifyAuth, SessionController.createSession);
sessionRouter.post('/:sessionId/end', verifyAuth, SessionController.endSession);

sessionRouter.get('/:sessionId', verifyAuth, SessionController.getSession);
sessionRouter.post('/:sessionId/answer', verifyAuth, SessionController.recordAnswer);

export default sessionRouter;
