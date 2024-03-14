import { Request, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validateData } from '../../shared/middlewares/validateData';
import * as yup from 'yup';
import { UserService } from '../../services/user';
import { jwtService } from '../../shared/functions/jwtService';

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
    if (!email || !password){
      return res.sendStatus(StatusCodes.BAD_REQUEST);
    }
    console.log(email, password);

    const user = await UserService.auth(email, password);

    if (!user) {
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    return res.status(StatusCodes.OK).json({
      accessToken: jwtService.generateToken({ uid: user.id })
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: error.message
      });
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: 'Unexpected error.'
      });
    }
  }
};
