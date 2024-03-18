import { StatusCodes } from 'http-status-codes';
import { ResponseErrorInterface } from './ResponseErrorInterface';
import { ErrorMessageEnum } from './ErrorMessagesEnum';

export class EmailAlreadyExistsError extends Error implements ResponseErrorInterface {
  status = StatusCodes.CONFLICT;
  constructor(message?: string){
    super(message || ErrorMessageEnum.EMAIL_ALREADY_EXISTS);
  }
}