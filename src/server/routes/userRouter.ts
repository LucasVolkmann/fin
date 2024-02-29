import express from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

const userRouter = express.Router();

userRouter.post('/auth', (_, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED)
    .send(getReasonPhrase(StatusCodes.NOT_IMPLEMENTED));
});

userRouter.get('/user', (_, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED)
    .send(getReasonPhrase(StatusCodes.NOT_IMPLEMENTED));
});

userRouter.post('/user', (_, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED)
    .send(getReasonPhrase(StatusCodes.NOT_IMPLEMENTED));
});

export default userRouter;

