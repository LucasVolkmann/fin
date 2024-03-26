import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ResponseError } from '../../shared/exceptions/ResponseError';
import { TransactionService } from '../../services/transaction';


export const getAll: RequestHandler = async (req, res) => {
  // FIXME: return category 
  try {
    const { userId } = req.headers;
    const allTransactions = await TransactionService.getAll(Number(userId));
    return res.status(StatusCodes.OK).json(allTransactions);

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
