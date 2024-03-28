import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ResponseError } from '../../shared/exceptions/ResponseError';
import { TransactionService } from '../../services/transaction';
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

export const getById: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.headers;
    const { id: transactionId } = req.params;
    const transaction = await TransactionService.getById(Number(userId), Number(transactionId));
    return res.status(StatusCodes.OK).json(transaction);

  } catch (error) {
    console.log(error);

    if (error instanceof ResponseError) {
      return res.status(error.status).json({
        error: error.message
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: 'Unexpected error.'
    });
  }
};
