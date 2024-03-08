import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { InputUserDTOType } from '../../models/dtos/InputUserDTOType';
import { validateData } from '../../shared/middlewares/validateData';
import * as yup from 'yup';
import { authUser } from '../../services/user/authUser';
import { usernameUpdateUser } from '../../services/user/usernameUpdateUser';

interface IUsernameUpdateBodyProps extends InputUserDTOType {}

export const usernameUpdateValidator = validateData((getSchema) => ({
  body: getSchema<IUsernameUpdateBodyProps>(yup.object().shape({
    username: yup.string().min(3).max(100).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(100).required(),
  })),
}));

export const usernameUpdateController: RequestHandler = async (req, res) => {

  try {
    const { username, email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    const user = await authUser(email, password);
    if (!user) {
      return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    user.username = username;
    const updateResult = await usernameUpdateUser(user);
    if (!updateResult) {
      return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    if(error instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: error.message
      });
    } else {
      return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
};
