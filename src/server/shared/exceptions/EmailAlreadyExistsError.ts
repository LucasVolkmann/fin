import { ErrorMessageEnum } from './ErrorMessagesEnum';

export class EmailAlreadyExistsError extends Error {
  constructor(message?: string){
    super(message || ErrorMessageEnum.EMAIL_ALREADY_EXISTS);
  }
}