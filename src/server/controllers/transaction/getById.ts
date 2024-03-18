import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';


export const getById: RequestHandler = async (req, res) => {
  return res.sendStatus(StatusCodes.NOT_IMPLEMENTED);
};
