import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../../services/user';
import { ResponseError } from '../../shared/exceptions/ResponseError';

export const getUserByToken: RequestHandler = async (req, res) => {
  try {
    const recoveredUser = await UserService.getById(Number(req.headers.userId));

    const user = {
      id: recoveredUser!.id,
      username: recoveredUser!.username,
      email: recoveredUser!.email,
    };
    return res.status(StatusCodes.OK).json(user);

  } catch (error) {
    if (error instanceof ResponseError) {
      return res.status(error.status).json({
        errors: error.message,
      });
    }
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: 'Unexpected error.',
    });
  }
};