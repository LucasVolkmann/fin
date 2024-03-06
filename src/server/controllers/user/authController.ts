import { Request, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validateData } from '../../shared/middlewares/validateData';
import * as yup from 'yup';
import { authUser } from '../../services/user/authUser';

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

export const authController: RequestHandler = async (req: Request<unknown, unknown, AuthBodyParams>, res) => {

  try {
    const { email, password } = req.body;
    if (!email || !password){
      return res.sendStatus(StatusCodes.BAD_REQUEST);
    }
    const user = await authUser(email, password);

    if (!user) {
      return res.sendStatus(StatusCodes.UNAUTHORIZED);
    }

    return res.status(StatusCodes.OK).json({
      accessToken: 'MOCK_ACCESS_TOKEN'
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
