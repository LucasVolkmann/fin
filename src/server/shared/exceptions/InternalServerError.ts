import { StatusCodes } from 'http-status-codes';
import { ResponseErrorInterface } from './ResponseErrorInterface';

export class InternalServerError extends Error implements ResponseErrorInterface {
  status = StatusCodes.INTERNAL_SERVER_ERROR;
  constructor(message: string){
    super(message);
  }
}