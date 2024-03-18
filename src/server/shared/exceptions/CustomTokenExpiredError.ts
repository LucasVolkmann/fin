import { StatusCodes } from 'http-status-codes';
import { ErrorMessageEnum } from './ErrorMessagesEnum';
import { ResponseError } from './ResponseError';

export class CustomTokenExpiredError extends ResponseError {
  constructor(message?: string){
    super(StatusCodes.UNAUTHORIZED, message || ErrorMessageEnum.EXPIRED_TOKEN);
  }
}