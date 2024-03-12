import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validateData } from '../../shared/middlewares/validateData';
import * as yup from 'yup';
import { UserService } from '../../services/user';
import { InputUserDTOType } from '../../types/dtos/InputUserDTOType.dto';

interface IUpdateUsernameBodyProps extends InputUserDTOType {}

export const updateUsernameValidator = validateData((getSchema) => ({
  body: getSchema<IUpdateUsernameBodyProps>(yup.object().shape({
    username: yup.string().min(3).max(100).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).max(100).required(),
  })),
}));

export const updateUsername: RequestHandler = async (req, res) => {

  try {
    const { username, email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    const user = await UserService.auth(email, password);
    if (!user) {
      return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
    if (req.headers.userId && user.id !== Number(req.headers.userId)) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        errors: 'Invalid credentials.'
      });
    }
    user.username = username;
    const updateResult = await UserService.updateUsername(user);
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
