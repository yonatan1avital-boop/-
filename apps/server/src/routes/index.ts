import { Router } from 'express';
import { authRouter } from './auth.route';
import { blueprintRouter } from './blueprint.route';
import { sceneRouter } from './scene.route';
import { eveRouter } from './eve.route';
import { missionRouter } from './mission.route';
import { paymentRouter } from './payment.route';
import { userRouter } from './user.route';
import { notificationRouter } from './notification.route';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/blueprint', blueprintRouter);
apiRouter.use('/scene', sceneRouter);
apiRouter.use('/eve', eveRouter);
apiRouter.use('/missions', missionRouter);
apiRouter.use('/payments', paymentRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/notifications', notificationRouter);
