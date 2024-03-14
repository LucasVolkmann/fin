import { ErrorMessageEnum } from './ErrorMessagesEnum';

export class CustomTokenExpiredError extends Error {
  constructor(message?: string){
    super(message || ErrorMessageEnum.EXPIRED_TOKEN_MESSAGE);
  }
}