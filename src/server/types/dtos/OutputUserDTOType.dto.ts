import { Category } from '../../models/Category';

export interface OutputUserDTOType {
  id: number;
  username: string;
  email: string;
  password: string;
  categories?: Category[];
  registration_date: string;
}