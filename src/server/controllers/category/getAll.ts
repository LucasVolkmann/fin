import { Request, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CategoryService } from '../../services/category';
import { ResponseError } from '../../shared/exceptions/ResponseError';
import { validateData } from '../../shared/middlewares/validateData';
import * as yup from 'yup';

interface IQueryProps {
  filter?: string
}

export const getAllValidator = validateData((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    filter: yup.string().min(3).max(100)
  }))
}));

export const getAll: RequestHandler = async (req: Request<unknown, unknown, unknown, IQueryProps>, res) => {
  try {
    const { userId } = req.headers;
    const { filter } = req.query;
    const allCategories = await CategoryService.getAll(Number(userId), filter);

    return res.status(StatusCodes.OK).json(allCategories);

  } catch (error) {

    if (error instanceof ResponseError) {
      return res.status(error.status).json({
        errors: error.message
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: 'Unexpected error.'
    });
  }

};
