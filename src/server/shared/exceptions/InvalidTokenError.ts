import { StatusCodes } from 'http-status-codes';
import { ErrorMessageEnum } from './ErrorMessagesEnum';
import { ResponseError } from './ResponseError';

export class InvalidTokenError extends ResponseError {
  constructor(message?: string){
    super(StatusCodes.BAD_REQUEST, message || ErrorMessageEnum.INVALID_TOKEN);
  }
}