import { StatusCodes } from 'http-status-codes';
import { ErrorMessageEnum } from './ErrorMessagesEnum';
import { ResponseError } from './ResponseError';

export class EmailAlreadyExistsError extends ResponseError {
  constructor(message?: string){
    super(StatusCodes.CONFLICT, message || ErrorMessageEnum.EMAIL_ALREADY_EXISTS);
  }
}