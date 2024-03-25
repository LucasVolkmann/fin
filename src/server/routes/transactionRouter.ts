import express from 'express';
import { TransactionController } from '../controllers/transaction';
import { ensureAuth } from '../shared/middlewares/ensureAuth';

const transactionRouter = express.Router();

export enum TransactionRoutesEnum {
  TRANSACTION = '/transaction',
  TRANSACTION_ID = '/transaction/:id',
}

transactionRouter.get(TransactionRoutesEnum.TRANSACTION,
  ensureAuth,
  TransactionController.getAll,
);

transactionRouter.post(TransactionRoutesEnum.TRANSACTION,
  ensureAuth,
  TransactionController.createValidator,
  TransactionController.create
);

transactionRouter.put(TransactionRoutesEnum.TRANSACTION,
  TransactionController.update
);

transactionRouter.get(TransactionRoutesEnum.TRANSACTION_ID,
  TransactionController.getById
);

transactionRouter.delete(TransactionRoutesEnum.TRANSACTION_ID,
  TransactionController.deleteById
);

export default transactionRouter;

