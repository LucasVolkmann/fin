import { Request, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validateData } from '../../shared/middlewares/validateData';
import * as yup from 'yup';
import { TransactionService } from '../../services/transaction';
import { ResponseError } from '../../shared/exceptions/ResponseError';

interface IParamsProps {
  id?: number
}

export const deleteByIdValidator = validateData((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
  }))
}));

export const deleteById: RequestHandler = async (req: Request<IParamsProps>, res) => {

  try {
    const { userId } = req.headers;
    const { id } = req.params;
    await TransactionService.getById(Number(userId), Number(id));
    await TransactionService.deleteById(Number(userId), Number(id));
    return res.sendStatus(StatusCodes.NO_CONTENT);

  } catch (error) {
    console.log(error);

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
