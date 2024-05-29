import { Transaction } from '../../models/Transaction';

export interface HistoryElement {
  year: number,
  month: number,
  expenses: number,
  incomes: number,
}

export const getYearHistoryTemplate = ()
  : HistoryElement[] => {

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const yearTemplate = [];
  for (let i = 0; i < 12; i++) {
    if (currentMonth - i < 1) {
      yearTemplate.push({
        expenses: 0,
        incomes: 0,
        year: currentYear - 1,
        month: (currentMonth - i) + 12,
      });
    } else {
      yearTemplate.push({
        expenses: 0,
        incomes: 0,
        year: currentYear,
        month: currentMonth - i,
      });
    }
  }
  return yearTemplate;
};

export const getHistoryByAllTransactions = (allTransactions: Transaction[]): HistoryElement[]  => {
  const yearTemplate = getYearHistoryTemplate();

  const history = yearTemplate.map((month) => {

    const monthTransactions = allTransactions.filter((transaction: Transaction) => {
      return (transaction.date.getMonth()+1) == month.month &&
        (transaction.date.getFullYear()) == month.year;
    });

    const allTransactionAmounts = monthTransactions.map((t) => {
      return t.amount || 0;
    });

    let incomes = 0;
    let expenses = 0;
    allTransactionAmounts.forEach((amount: number) => {
      if (amount > 0) {
        incomes += amount;
      } else {
        expenses += amount * -1;
      }
    });

    return ({
      ...month,
      incomes,
      expenses,
    });

  });

  return history.reverse();
};