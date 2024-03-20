import { Router } from 'express';
import { ensureAuth } from '../shared/middlewares/ensureAuth';
import { CategoryController } from '../controllers/category';

const categoryRoutes = Router();

categoryRoutes.get('/category',
  ensureAuth,
  CategoryController.getAllValidator,
  CategoryController.getAll
);

categoryRoutes.post('/category',
  ensureAuth,
  CategoryController.createValidator,
  CategoryController.create
);

categoryRoutes.put('/category',
  ensureAuth,
  CategoryController.updateValidator,
  CategoryController.update
);

categoryRoutes.get('/category/:id',
  ensureAuth,
  CategoryController.getByIdValidator,
  CategoryController.getById
);

categoryRoutes.delete('/category/:id',
  ensureAuth,
  CategoryController.deleteByIdValidator,
  CategoryController.deleteById
);

export default categoryRoutes;

