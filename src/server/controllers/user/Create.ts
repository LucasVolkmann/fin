import { Request, RequestHandler, Response } from 'express';
import Joi from 'joi';
import { validateData } from '../../shared/middlewares/validateData';
import { StatusCodes } from 'http-status-codes';

interface CreateUserBodyProps {
  username: string,
  email: string,
  password: string,
  address: string,
}

export const createMidValidator = validateData(Joi.object<CreateUserBodyProps>({
  username: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().max(100).required(),
}));

export const create: RequestHandler = (req: Request<unknown, unknown, CreateUserBodyProps>, res: Response) => {
  return res.status(StatusCodes.OK).send(req.body);
};