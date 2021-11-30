const createTransactionService = require('../../../services/transactions/create_service');
const listTransactionService = require('../../../services/transactions/list_history_service');
const account = require('../../../models/account');

describe('Create transaction service test', () => {
  let new_account = { name: 'test', document: '111.111.111-11', "available-limit": 400 }
  let new_account2 = { name: 'test2', document: '999.999.999-99', "available-limit": 300 }

  account.create(new_account);
  account.create(new_account2);
  
  it('Should create a transaction', () => {
    let new_transaction = {
      'sender-document': new_account.document,
      'receiver-document': new_account2.document,
      value: 100
    };

    createTransactionService.create(new_transaction);
    
    expect(listTransactionService.showQuantity()).toEqual(1);
  });

  it('Should create a transaction after one transaction already exists', () => {
    let new_transaction = {
      'sender-document': new_account.document,
      'receiver-document': new_account2.document,
      value: 200
    };

    createTransactionService.create(new_transaction);
    
    expect(listTransactionService.showQuantity()).toEqual(2);
  });
  
  it('Should not create a transaction, account not exists', () => {
    let unknow_account = { name: 'test3', document: '154.548.889-99', "available-limit": 100 }
    let fail_transaction = {
      'sender-document': unknow_account.document,
      'receiver-document': new_account2.document,
      value: 100
    };

    const response = createTransactionService.create(fail_transaction);

    expect(response).toEqual({ violation: 'account_not_initialized' });
  });

  it('Should not create a transaction, insufficient limit', () => {
    let fail_transaction = {
      'sender-document': new_account.document,
      'receiver-document': new_account2.document,
      value: 1000
    };

    const response = createTransactionService.create(fail_transaction);

    expect(response).toEqual({ violation: 'insufficient_limit' });
  });

  it('Should not create a transaction, double_transaction', () => {
    let new_transaction = {
      'sender-document': new_account.document,
      'receiver-document': new_account2.document,
      value: 100
    };

    createTransactionService.create(new_transaction);
    let response = createTransactionService.create(new_transaction);
    
    expect(response).toEqual({ violation: 'double_transaction' });
  });
});
