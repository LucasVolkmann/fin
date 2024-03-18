import { StatusCodes } from 'http-status-codes';
import { ErrorMessageEnum } from './ErrorMessagesEnum';
import { ResponseError } from './ResponseError';

export class RegisterNotFoundError extends ResponseError {
  constructor(message?: string){
    super(StatusCodes.NOT_FOUND , message || ErrorMessageEnum.REGISTER_NOT_FOUND);
  }
}