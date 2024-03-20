import { StatusCodes } from 'http-status-codes';
import { ResponseError } from './ResponseError';

export class CategoryNameAlreadyInUseError extends ResponseError {
  constructor(message?: string){
    super(StatusCodes.CONFLICT, message || 'This category name is already in use.');
  }
}