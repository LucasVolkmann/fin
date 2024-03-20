import { Category } from '../../../models/Category';
import { User } from '../../../models/User';

export interface CategoryDTO extends Category{
  id: number,
  name: string,
  user: User,
}