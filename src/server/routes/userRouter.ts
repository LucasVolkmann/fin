import express from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { UserController } from '../controllers/user';

const userRouter = express.Router();

userRouter.post('/auth', (_, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED)
    .send(getReasonPhrase(StatusCodes.NOT_IMPLEMENTED));
});

userRouter.get('/user/:id', UserController.getByIdValidator, UserController.getByIdController);

userRouter.post('/user', UserController.createValidator, UserController.createController);

export default userRouter;

