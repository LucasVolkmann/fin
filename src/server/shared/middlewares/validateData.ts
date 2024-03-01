import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {  ObjectSchema, ValidationError } from 'joi';

type ValidateType = (schema: ObjectSchema) => RequestHandler;

export const validateData: ValidateType = (schema) =>
  async (req: Request, res: Response, next: NextFunction) => {

    await schema.validateAsync(req.body, { abortEarly: false }).then(() => {
      return next();
    }).catch((validationError: ValidationError) => {
      let objectResponseError = {};
      validationError.details.forEach(({path, message}) => {
        objectResponseError = {
          ...objectResponseError,
          [path[0]]: message
        };
      });
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: objectResponseError
      });
    });

  };

