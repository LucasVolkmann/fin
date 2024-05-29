import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ResponseError } from '../../shared/exceptions/ResponseError';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';
import { CategoryService } from '../../services/category';

export const getCategoryNumbers: RequestHandler = async (req, res) => {

  try {
    if (!req.headers.userId) {
      throw new InternalServerError('Erro na aquisição de dados de categoria.');
    }

    const categoryNumbers = await CategoryService.getCategoryNumbers(Number(req.headers.userId));

    return res.status(StatusCodes.OK).json(categoryNumbers);

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