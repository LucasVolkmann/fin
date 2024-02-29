import { Request, Router } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

const categoryRoutes = Router();

categoryRoutes.get('/category', (_, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED)
    .send('GET ALL');
});

categoryRoutes.post('/category', (_, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED)
    .send(getReasonPhrase(StatusCodes.NOT_IMPLEMENTED));
});

categoryRoutes.put('/category', (_, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED)
    .send(getReasonPhrase(StatusCodes.NOT_IMPLEMENTED));
});

categoryRoutes.get('/category/:id', (req: Request, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED)
    .send(req.params.id);
});

categoryRoutes.delete('/category/:id', (req: Request, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED)
    .send(req.params.id);
});

export default categoryRoutes;

