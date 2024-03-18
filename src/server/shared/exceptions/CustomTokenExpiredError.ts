import { StatusCodes } from 'http-status-codes';
import { ErrorMessageEnum } from './ErrorMessagesEnum';
import { ResponseErrorInterface } from './ResponseErrorInterface';

export class CustomTokenExpiredError extends Error implements ResponseErrorInterface {
  public status = StatusCodes.UNAUTHORIZED;
  constructor(message?: string){
    super(message || ErrorMessageEnum.EXPIRED_TOKEN);
  }
}