import { Request, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validateData } from '../../shared/middlewares/validateData';
import * as yup from 'yup';
import { UserService } from '../../services/user';
import { jwtService } from '../../shared/functions/jwtService';
import { ResponseError } from '../../shared/exceptions/ResponseError';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';

interface AuthBodyParams {
  email: string,
  password: string,
}

export const authValidator = validateData((getSchema) => ({
  body: getSchema<AuthBodyParams>(yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).max(100).required(),
  })),
}));

export const auth: RequestHandler = async (req: Request<unknown, unknown, AuthBodyParams>, res) => {

  try {
    const { email, password } = req.body;
    const user = await UserService.auth(email, password);

    if (!user?.id) {
      throw new InternalServerError('Error while authentication user.');
    }
    return res.status(StatusCodes.OK).json({
      accessToken: jwtService.generateToken({ uid: user!.id })
    });

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
