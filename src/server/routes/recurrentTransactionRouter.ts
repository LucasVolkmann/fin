import express, { Request } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

const recurrentTransactionRouter = express.Router();

recurrentTransactionRouter.get('/recurrent_transaction', (_, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED)
    .send('GET ALL');
});

recurrentTransactionRouter.post('/recurrent_transaction', (_, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED)
    .send(getReasonPhrase(StatusCodes.NOT_IMPLEMENTED));
});

recurrentTransactionRouter.put('/recurrent_transaction', (_, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED)
    .send(getReasonPhrase(StatusCodes.NOT_IMPLEMENTED));
});

recurrentTransactionRouter.get('/recurrent_transaction/:id', (req: Request, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED)
    .send(req.params.id);
});

recurrentTransactionRouter.delete('/recurrent_transaction/:id', (req: Request, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED)
    .send(req.params.id);
});

export default recurrentTransactionRouter;

