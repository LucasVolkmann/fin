import { Request, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CategoryService } from '../../services/category';
import { ResponseError } from '../../shared/exceptions/ResponseError';
import { validateData } from '../../shared/middlewares/validateData';
import * as yup from 'yup';

interface IParamsProps {
  id?: number
}

export const getByIdValidator = validateData((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
  }))
}));

export const getById: RequestHandler = async (req: Request<IParamsProps>, res) => {
  try {
    const { userId } = req.headers;
    const { id } = req.params;
    const category = await CategoryService.getById(Number(userId), Number(id));

    return res.status(StatusCodes.OK).json(category);

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
