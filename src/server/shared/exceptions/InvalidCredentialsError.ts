import { StatusCodes } from 'http-status-codes';
import { ResponseErrorInterface } from './ResponseErrorInterface';

export class InvalidCredentialsError extends Error  implements ResponseErrorInterface {
  status = StatusCodes.BAD_REQUEST;
  constructor(message?: string){
    super(message || 'Invalid credentials.');
  }
}