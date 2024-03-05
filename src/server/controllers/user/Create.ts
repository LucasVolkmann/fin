import { Request, RequestHandler, Response } from 'express';
import { validateData } from '../../shared/middlewares/validateData';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { createUser } from '../../services/user/createUser';
import { UserDTOType } from '../../models/dtos/UserDTOType';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';

interface CreateUserBodyProps extends UserDTOType {}

export const createValidator = validateData((getSchema) => ({
  body: getSchema<CreateUserBodyProps>(yup.object().shape({
    username: yup.string().min(3).max(100).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(100).required(),
  })),
}));

export const create: RequestHandler = async (req: Request<unknown, unknown, CreateUserBodyProps>, res: Response) => {

  try {
    if (!req.body) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
    const userId = await createUser(req.body);
    return res.status(StatusCodes.CREATED).send(userId);
  } catch (error) {
    if (error instanceof InternalServerError) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({errors: error.message});
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  }

};