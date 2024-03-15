import { ErrorMessageEnum } from './ErrorMessagesEnum';

export class RegisterNotFoundError extends Error {
  constructor(message?: string){
    super(message || ErrorMessageEnum.REGISTER_NOT_FOUND);
  }
}