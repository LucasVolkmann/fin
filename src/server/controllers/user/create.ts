import { Request, RequestHandler } from 'express';
import { validateData } from '../../shared/middlewares/validateData';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { UserService } from '../../services/user';
import { InputUserDTOType } from '../../types/dtos/InputUserDTOType.dto';
import { ResponseError } from '../../shared/exceptions/ResponseError';

interface CreateUserBodyProps extends InputUserDTOType {}

export const createValidator = validateData((getSchema) => ({
  body: getSchema<CreateUserBodyProps>(yup.object().shape({
    username: yup.string().min(3).max(100).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(100).required(),
  })),
}));

export const create: RequestHandler = async (req: Request<unknown, unknown, CreateUserBodyProps>, res) => {

  try {
    const {
      username,
      email,
      password
    } = req.body;
    const userId = await UserService.create({
      username,
      email,
      password
    });
    return res.status(StatusCodes.CREATED).json(userId);

  } catch (error) {
    if (error instanceof ResponseError) {
      return res.status(error.status)
        .send({errors: error.message});
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({errors: 'Unexpected error.'});
  }

};