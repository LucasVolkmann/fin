import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../../services/user';

export const getUserByToken: RequestHandler = async (req, res) => {

  const { userId } = req.headers;

  try {
    if (!Number.isInteger(Number(userId))){
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Error while getting user.'
      });
    }
    const recoveredUser = await UserService.getById(Number(userId));
    if (!recoveredUser?.id || !recoveredUser?.email || !recoveredUser?.username) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Error while getting user. 1',
      });
    }
    const user = {
      id: recoveredUser.id,
      username: recoveredUser.username,
      email: recoveredUser.email,
    };
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Error while getting user. 2',
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: 'Unexpected error.',
    });
  }
};