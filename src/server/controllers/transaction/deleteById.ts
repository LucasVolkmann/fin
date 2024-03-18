import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

export const deleteById: RequestHandler = async (req, res) => {
  res.sendStatus(StatusCodes.NOT_IMPLEMENTED);
};
