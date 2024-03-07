import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getUserByTokenController: RequestHandler = async (req, res) => {
  return res.status(StatusCodes.NOT_IMPLEMENTED).json({userId: req.headers.userId});
};