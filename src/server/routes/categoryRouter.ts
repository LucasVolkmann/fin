import { Router } from 'express';
import { ensureAuth } from '../shared/middlewares/ensureAuth';
import { CategoryController } from '../controllers/category';

const categoryRoutes = Router();

categoryRoutes.get('/category',
  ensureAuth,
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

categoryRoutes.get('/category/:id');

categoryRoutes.delete('/category/:id');

export default categoryRoutes;

