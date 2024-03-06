import { Request, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validateData } from '../../shared/middlewares/validateData';
import * as yup from 'yup';
import { getByIdUser } from '../../services/user/getByIdUser';

interface GetByIdParamsProps {
  id?: number
}

export const getByIdValidator = validateData((getSchema) => ({
  params: getSchema<GetByIdParamsProps>(yup.object().shape({
    id: yup.number().integer().moreThan(0).required(),
  })),
}));

export const getByIdController: RequestHandler = async (req: Request<GetByIdParamsProps>, res) => {

  try {
    if (!req.params.id) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
    const user = await getByIdUser(req.params.id);
    if (!user) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(req.params.id);
    }
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({errors: error.message});
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({errors: 'Error while getting by id.'});
    }
  }
};