const transaction = require('../../models/transaction');
const account = require('../../models/account');
const listTransactionHistoryService = require('../../services/transactions/list_transaction_history_service');

describe('Transaction model test', () => {
  let sender_account = { name: 'test', document: '111.111.111-11', "available-limit": 300 }
  let receiver_account = { name: 'test', document: '999.999.999-99', "available-limit": 300 }
  let new_transaction = {
    'sender-document': sender_account.document,
    'receiver-document': receiver_account.document,
    datetime: new Date(),
    value: 100
  };

  account.create(sender_account);
  account.create(receiver_account);

  it('Should register a transaction', () => {
    expect(listTransactionHistoryService.showQuantity()).toEqual(0);

    let response = transaction.create(new_transaction);

    expect(response['sender-document']).toEqual(new_transaction['sender-document']);
    expect(response['available-limit']).toEqual(200);
  });

  it('Should register sender-transaction correctly', () => {
    let response = transaction.history(sender_account.document);

    expect(response).toEqual([{
      "sender-document": "111.111.111-11",
      "receiver-document": "999.999.999-99",
      value: -100,
      datetime: expect.anything(),
      "available-limit": 200
    }]);
  });

  it('Should register receiver-transaction correctly', () => {
    let response = transaction.history(receiver_account.document);

    expect(response).toEqual([{
      "receiver-document": "999.999.999-99",
      "sender-document": "111.111.111-11",
      value: 100,
      datetime: expect.anything(),
      "available-limit": 400
    }]);
  });
});
