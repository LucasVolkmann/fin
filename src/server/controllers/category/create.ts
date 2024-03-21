import { Request, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validateData } from '../../shared/middlewares/validateData';
import * as yup from 'yup';
import { CategoryService } from '../../services/category';
import { ResponseError } from '../../shared/exceptions/ResponseError';

interface IBodyProps {
  name: string,
}

export const createValidator = validateData((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3).max(100)
  }))
}));

export const create: RequestHandler = async (req: Request<unknown, unknown, IBodyProps>, res) => {

  try {
    const { name } = req.body;
    const categoryId = await CategoryService.create(name, Number(req.headers.userId));

    return res.status(StatusCodes.CREATED).json(categoryId);

  } catch (error) {
    if (error instanceof ResponseError) {
      return res.status(error.status).json({
        errors: error.message
      });
    }
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }

};
