import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema, ValidationError } from 'yup';

type TProperty = 'body' | 'query' | 'header' | 'params';
type TGetSchema = <T>(schema: Schema<T>) => Schema<T>;
type TAllSchemas = Record<TProperty, Schema>;
type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;
type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validateData: TValidation = (getAllSchemas) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const schemas = getAllSchemas((schema) => schema);

    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        schema.validateSync(req[key as TProperty], { abortEarly: false });

      } catch (error) {
        const yupError = error as ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach((err) => {
          if (!err.path) return;
          errors[err.path] = err.message;
        });
        errorsResult[key] = errors;
      }
    });

    if (Object.entries(errorsResult).length === 0) {
      return next();
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
    }
  };

