const transaction = require('../../models/transaction');
const account = require('../../models/account');

describe('Transaction model test', () => {
  let new_transaction = { 'sender-document': '111.111.111-11', 'receiver-document': '999.999.999-99', value: 100 };
  let new_account = { name: 'test', document: '111.111.111-11', "available-limit": 300 }
  let new_account2 = { name: 'test', document: '999.999.999-99', "available-limit": 300 }

  account.create(new_account);
  account.create(new_account2);

  it('Should register a transaction', () => {
    expect(transaction.getQttTransactions()).toEqual(0);

    let response = transaction.create(new_transaction);

    expect(response['sender-document']).toEqual(new_transaction['sender-document']);
    expect(response['available-limit']).toEqual(200);
  });

  it('Should register sender-transaction correctly', () => {
    let response = transaction.history(new_account.document);

    expect(response).toEqual([{
      "sender-document": "111.111.111-11",
      "receiver-document": "999.999.999-99",
      value: -100,
      datetime: expect.anything(),
      "available-limit": 200
    }]);
  });

  it('Should register receiver-transaction correctly', () => {
    let response = transaction.history(new_account2.document);

    expect(response).toEqual([{
      "receiver-document": "999.999.999-99",
      "sender-document": "111.111.111-11",
      value: 100,
      datetime: expect.anything(),
      "available-limit": 400
    }]);
  });
});
