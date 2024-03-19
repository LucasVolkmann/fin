import { StatusCodes } from 'http-status-codes';
import { ResponseError } from './ResponseError';

export class CategoryAlreadyExistsError extends ResponseError {
  constructor(message?: string){
    super(StatusCodes.CONFLICT, message || 'This category already exists.');
  }
}