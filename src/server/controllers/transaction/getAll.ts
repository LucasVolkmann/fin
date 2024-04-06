import { Request, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ResponseError } from '../../shared/exceptions/ResponseError';
import { TransactionService } from '../../services/transaction';
import moment from 'moment';
import { validateData } from '../../shared/middlewares/validateData';
import * as yup from 'yup';


interface IQueryProps {
  month?: number
}

export const getAllValidator = validateData((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    month: yup.number().integer().required().moreThan(0)
  }))
}));

export const getAll: RequestHandler = async (req: Request<IQueryProps>, res) => {

  try {
    const { userId } = req.headers;
    let month: number | undefined;
    if (req.query.month) {
      month = Number(req.query.month);
    } else {
      month = undefined;
    }
    const allTransactions = await TransactionService.getAll(Number(userId), month);

    if (!allTransactions) {
      throw new Error();
    }
    const returnValue = allTransactions.sort((transactionA, transactionB) => {
      if (moment(transactionA.date).isBefore(moment(transactionB.date))) {
        return -1;
      } else {
        return 1;
      }
    });

    return res.status(StatusCodes.OK).json(returnValue);

  } catch (error) {
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
