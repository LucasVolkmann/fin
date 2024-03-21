import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { jwtService } from '../functions/jwtService';
import { CustomTokenExpiredError } from '../exceptions/CustomTokenExpiredError';
import { InvalidTokenError } from '../exceptions/InvalidTokenError';
import { ErrorMessageEnum } from '../exceptions/ErrorMessagesEnum';
import { UserService } from '../../services/user';
import { RegisterNotFoundError } from '../exceptions/RegisterNotFoundError';


export const ensureAuth: RequestHandler = async (req, res, next) => {

  const rawToken = req.headers.authorization;
  if (!rawToken) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: ErrorMessageEnum.TOKEN_REQUIRED
    });
  }

  const [type, token] = rawToken.split(' ');
  if (type != 'Bearer' || !token) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: ErrorMessageEnum.INVALID_TOKEN
    });
  }

  try {
    const decodedToken = jwtService.verify(token);
    await UserService.getById(decodedToken.uid);
    req.headers.userId = decodedToken.uid.toString();
    next();
  } catch (error) {
    if (error instanceof CustomTokenExpiredError ||
      error instanceof InvalidTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        errors: error.message
      });
    }
    if (error instanceof RegisterNotFoundError) {
      return res.status(error.status).json({
        errors: 'The user in token was not found.'
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: 'Authentication error.'
    });
  }


};
