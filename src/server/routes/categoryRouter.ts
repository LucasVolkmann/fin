import { Router } from 'express';
import { ensureAuth } from '../shared/middlewares/ensureAuth';
import { CategoryController } from '../controllers/category';

const categoryRoutes = Router();

export enum CategoryRoutesEnum {
  CATEGORY = '/category',
  CATEGORY_ID = '/category/:id',
}

categoryRoutes.get(CategoryRoutesEnum.CATEGORY,
  ensureAuth,
  CategoryController.getAllValidator,
  CategoryController.getAll
);

categoryRoutes.post(CategoryRoutesEnum.CATEGORY,
  ensureAuth,
  CategoryController.createValidator,
  CategoryController.create
);

categoryRoutes.put(CategoryRoutesEnum.CATEGORY,
  ensureAuth,
  CategoryController.updateValidator,
  CategoryController.update
);

categoryRoutes.get(CategoryRoutesEnum.CATEGORY_ID,
  ensureAuth,
  CategoryController.getByIdValidator,
  CategoryController.getById
);

categoryRoutes.delete(CategoryRoutesEnum.CATEGORY_ID,
  ensureAuth,
  CategoryController.deleteByIdValidator,
  CategoryController.deleteById
);

export default categoryRoutes;

