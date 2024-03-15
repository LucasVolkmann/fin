import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../../services/user';

export const getUserByToken: RequestHandler = async (req, res) => {


  try {
    const { userId } = req.headers;
    const recoveredUser = await UserService.getById(Number(userId));
    if (!recoveredUser?.id || !recoveredUser?.email || !recoveredUser?.username) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Error while getting user.',
      });
    }
    const user = {
      id: recoveredUser.id,
      username: recoveredUser.username,
      email: recoveredUser.email,
    };
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    //TODO: the user has been deleted
    if (error instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: error.message,
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: 'Unexpected error.',
    });
  }
};