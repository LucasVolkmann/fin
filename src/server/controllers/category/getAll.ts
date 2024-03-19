import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CategoryService } from '../../services/category';
import { ResponseError } from '../../shared/exceptions/ResponseError';

export const getAll: RequestHandler = async (req, res) => {
  try {
    const allCategories = await CategoryService.getAll(Number(req.headers.userId));

    return res.status(StatusCodes.OK).json(allCategories);

  } catch (error) {
    if (error instanceof ResponseError) {
      return res.status(error.status).json({
        errors: error.message
      });
    }
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }

};
