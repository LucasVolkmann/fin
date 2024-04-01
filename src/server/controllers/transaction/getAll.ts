import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ResponseError } from '../../shared/exceptions/ResponseError';
import { TransactionService } from '../../services/transaction';
import moment from 'moment';

export const getAll: RequestHandler = async (req, res) => {

  try {
    const { userId } = req.headers;
    const allTransactions = await TransactionService.getAll(Number(userId));

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
