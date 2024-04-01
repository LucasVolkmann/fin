import { Request, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ResponseError } from '../../shared/exceptions/ResponseError';
import { validateData } from '../../shared/middlewares/validateData';
import * as yup from 'yup';
import { TransactionService } from '../../services/transaction';
import { Transaction } from '../../models/Transaction';

interface IBodyProps {
  id: number,
  amount: number,
  details: string,
  date: Date,
  categoryId: number,
}

export const updateValidator = validateData((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    id: yup.number().integer().moreThan(0).required(),
    amount: yup.number().required(),
    details: yup.string().required().max(250),
    date: yup.date().required(),
    categoryId: yup.number().required().moreThan(0),
  }))
}));

export const update: RequestHandler = async (req: Request<unknown, unknown, IBodyProps>, res) => {
  try {
    const { userId } = req.headers;
    const transaction: Transaction = req.body;

    await TransactionService.update(Number(userId), transaction);

    return res.sendStatus(StatusCodes.NO_CONTENT);
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
