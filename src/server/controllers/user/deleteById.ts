import { Request, RequestHandler } from 'express';
import { validateData } from '../../shared/middlewares/validateData';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../../services/user';
import { ResponseError } from '../../shared/exceptions/ResponseError';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';

interface IDeleteUserBodyParams {
  email: string;
  password: string;
}

export const deleteValidation = validateData((getSchema) => ({
  body: getSchema<IDeleteUserBodyParams>(yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(100).required(),
  })),
}));

export const deleteById: RequestHandler = async (req: Request<unknown, unknown, IDeleteUserBodyParams>, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserService.auth(email, password);
    if (!user || user.id != Number(req.headers.userId)) {
      throw new InternalServerError('Unexpected error.');
    }
    await UserService.deleteById(user.id);
    return res.sendStatus(StatusCodes.NO_CONTENT);

  } catch (error) {
    if (error instanceof ResponseError) {
      return res.status(error.status).json({
        errors: error.message
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: 'Unexpected error.'
    });
  }
};
