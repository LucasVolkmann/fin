
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { jwtService } from '../functions/jwtService';
import { CustomTokenExpiredError } from '../exceptions/CustomTokenExpiredError';
import { InvalidTokenError } from '../exceptions/InvalidTokenError';
import { ErrorMessageEnum } from '../exceptions/ErrorMessagesEnum';

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
    req.headers.userId = decodedToken.uid.toString();
    next();
  } catch (error) {
    if (error instanceof CustomTokenExpiredError ||
      error instanceof InvalidTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        errors: error.message
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: 'Authentication error.'
    });
  }


};
