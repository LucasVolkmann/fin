import { Request, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validateData } from '../../shared/middlewares/validateData';
import * as yup from 'yup';
import { TransactionService } from '../../services/transaction';
import { Category } from '../../models/Category';
import { User } from '../../models/User';
import { ResponseError } from '../../shared/exceptions/ResponseError';

interface IBodyProps {
  amount: number,
  details: string,
  date: Date,
  categoryId: number,
}

export const createValidator = validateData((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    amount: yup.number().required(),
    details: yup.string().required().max(250),
    date: yup.date().required(),
    categoryId: yup.number().required().moreThan(0),
  }))
}));

export const create: RequestHandler = async (req: Request<unknown, unknown, IBodyProps>, res) => {

  try {
    const { userId } = req.headers;
    const {
      amount,
      details,
      date,
      categoryId
    } = req.body;

    const category = new Category();
    category.id = categoryId;
    const user = new User();
    user.id = Number(userId);

    //FIXME: Refatorar
    const transactionId = await TransactionService.create({
      user,
      amount,
      details,
      date,
      category,
      categoryId
    });
    return res.status(StatusCodes.CREATED).json(transactionId);

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
