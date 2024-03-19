import { Router } from 'express';
import { ensureAuth } from '../shared/middlewares/ensureAuth';
import { CategoryController } from '../controllers/category';

const categoryRoutes = Router();

categoryRoutes.get('/category');

categoryRoutes.post('/category',
  ensureAuth,
  CategoryController.createValidator,
  CategoryController.create
);

categoryRoutes.put('/category');

categoryRoutes.get('/category/:id');

categoryRoutes.delete('/category/:id');

export default categoryRoutes;

