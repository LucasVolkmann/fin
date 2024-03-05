import { Request, RequestHandler, Response } from 'express';
import { validateData } from '../../shared/middlewares/validateData';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface CreateUserBodyProps {
  username: string,
  email: string,
  password: string,
}

export const createValidator = validateData((getSchema) => ({
  body: getSchema<CreateUserBodyProps>(yup.object().shape({
    username: yup.string().min(3).max(100).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(100).required(),
  })),
}));


export const create: RequestHandler = (req: Request<unknown, unknown, CreateUserBodyProps>, res: Response) => {
  return res.status(StatusCodes.OK).send(req.body);
};