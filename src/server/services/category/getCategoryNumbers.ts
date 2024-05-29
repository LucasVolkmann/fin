import { CategoryService } from '.';
import { Transaction } from '../../models/Transaction';
import { InternalServerError } from '../../shared/exceptions/InternalServerError';
import { CategoryNumberType } from '../../types/CategoryNumberType';
import { CategorySummaryType } from '../../types/CategorySummaryType';
import { TransactionService } from '../transaction';

export const getCategoryNumbers = async (userId: number): Promise<CategorySummaryType | void> => {

  const allTransactions = await TransactionService.getAll(userId);
  const allCategories = await CategoryService.getAll(userId);
  if (!allTransactions || !allCategories) {
    throw new InternalServerError('Erro ao gerar os dados de categoria.');
  }

  const handleCategories: CategoryNumberType[] = allCategories.map((category) => {
    return {
      id: category.id,
      name: category.name,
      amount: 0,
    };
  });
  const currentMonthCategoryNumbers: CategoryNumberType[] = JSON.parse(JSON.stringify(handleCategories));
  const currentDate = new Date();

  allTransactions.forEach(({categoryId, date, amount}: Transaction) => {
    const arrayId = handleCategories.findIndex((cat) => cat.id == categoryId);
    handleCategories[arrayId].amount += amount;
    console.log(`currentMonth    -> ${currentDate}`);
    console.log(`date.getMonth() -> ${date.getMonth()}`);
    console.log('------------------------');


    if (date.getMonth() === currentDate.getMonth() && date.getFullYear() === currentDate.getFullYear()) {
      console.log(`OK ${amount}`);

      currentMonthCategoryNumbers[arrayId].amount += amount;
    }
  });

  const summaryReturn: CategorySummaryType = {
    generalCategoryNumbers: handleCategories,
    byMonth: {
      month: currentDate.getMonth() + 1,
      categoryNumbers: currentMonthCategoryNumbers,
    }
  };
  return summaryReturn;
};