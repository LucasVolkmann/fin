import { Request, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validateData } from '../../shared/middlewares/validateData';
import * as yup from 'yup';
import { CategoryService } from '../../services/category';
import { ResponseError } from '../../shared/exceptions/ResponseError';

interface IBodyProps {
  id: number,
  name: string,
}

export const updateValidator = validateData((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
    name: yup.string().required().min(3).max(100),
  }))
}));

export const update: RequestHandler = async (req: Request<unknown, unknown, IBodyProps>, res) => {
  try {
    const { id, name } = req.body;
    await CategoryService.update(Number(req.headers.userId), { id, name });

    return res.sendStatus(StatusCodes.NO_CONTENT);

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
