import { CategoryNumberType } from './CategoryNumberType';

export interface CategorySummaryType {
  generalCategoryNumbers: CategoryNumberType[],
  byMonth: {
    month: number,
    categoryNumbers: CategoryNumberType[]
  }
}