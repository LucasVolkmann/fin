import { ErrorMessageEnum } from './ErrorMessagesEnum';

export class InvalidTokenError extends Error {
  constructor(message?: string){
    super(message || ErrorMessageEnum.INVALID_TOKEN_MESSAGE);
  }
}