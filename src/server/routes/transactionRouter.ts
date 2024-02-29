import express, { Request } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

const transactionRouter = express.Router();

transactionRouter.get('/transaction', (_, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED)
    .send('GET ALL');
});

transactionRouter.post('/transaction', (_, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED)
    .send(getReasonPhrase(StatusCodes.NOT_IMPLEMENTED));
});

transactionRouter.put('/transaction', (_, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED)
    .send(getReasonPhrase(StatusCodes.NOT_IMPLEMENTED));
});

transactionRouter.get('/transaction/:id', (req: Request, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED)
    .send(req.params.id);
});

transactionRouter.delete('/transaction/:id', (req: Request, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED)
    .send(req.params.id);
});

export default transactionRouter;

