import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ResponseError } from '../../shared/exceptions/ResponseError';
import { TransactionService } from '../../services/transaction';
import { getHistoryByAllTransactions } from '../../shared/functions/history';

export const getMonthlyHistory: RequestHandler = async (req, res) => {

  try {
    const { userId } = req.headers;

    const allTransactions = await TransactionService.getAll(Number(userId));


    if (!allTransactions) {
      throw new Error();
    }

    const history = getHistoryByAllTransactions(allTransactions);

    return res.status(StatusCodes.OK).json(history);

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
