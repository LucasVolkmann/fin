import express, { json } from 'express';
import {
  userRouter,
  transactionRouter,
  recurrentTransactionRouter,
  categoryRouter } from './routes';
import { StatusCodes } from 'http-status-codes';

const app = express();

app.use(json());

app.get('/', (_, res) => {
  return res.status(StatusCodes.OK).send('Server on!');
});

app.use(userRouter);
app.use(transactionRouter);
app.use(recurrentTransactionRouter);
app.use(categoryRouter);

export default app;
