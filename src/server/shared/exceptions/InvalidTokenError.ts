import { StatusCodes } from 'http-status-codes';
import { ErrorMessageEnum } from './ErrorMessagesEnum';
import { ResponseErrorInterface } from './ResponseErrorInterface';

export class InvalidTokenError extends Error  implements ResponseErrorInterface {
  status = StatusCodes.BAD_REQUEST;
  constructor(message?: string){
    super(message || ErrorMessageEnum.INVALID_TOKEN);
  }
}