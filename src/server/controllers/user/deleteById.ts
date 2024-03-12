import { Request, RequestHandler } from 'express';
import { validateData } from '../../shared/middlewares/validateData';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../../services/user';

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
    const userId = Number(req.headers.userId);
    const { email, password } = req.body;
    const user = await UserService.auth(email, password);
    if (!user || user.id != userId) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: 'Error while deleting register.'
      });
    }
    const updateResult = await UserService.deleteById(user.id);
    if (!updateResult || updateResult <= 0) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: 'Error while deleting register.'
      });
    }
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: error.message
      });
    } else {
      return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
};
