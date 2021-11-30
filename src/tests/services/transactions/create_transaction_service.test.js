const createTransactionService = require('../../../services/transactions/create_transaction_service');
const listTransactionService = require('../../../services/transactions/list_transaction_history_service');
const account = require('../../../models/account');

describe('Create transaction service test', () => {
  let new_transaction = { 'sender-document': '111.111.111-11', 'receiver-document': '999.999.999-99', value: 100 };
  let new_account = { name: 'test', document: '111.111.111-11', "available-limit": 300 }
  let new_account2 = { name: 'test', document: '999.999.999-99', "available-limit": 300 }

  account.create(new_account);
  account.create(new_account2);

  it('Should create a transaction', () => {
    createTransactionService.create(new_transaction);

    expect(listTransactionService.getQttTransactions()).toEqual(1);
  });
});
