const listTransactionHistoryService = require('../../../services/transactions/list_history_service');
const createTransactionService = require('../../../services/transactions/create_service');
const account = require('../../../models/account');

let sender = { name: 'test', document: '111.111.111-11', "available-limit": 400 }
let receiver = { name: 'test2', document: '999.999.999-99', "available-limit": 300 }
let new_transaction = {
  'sender-document': sender.document,
  'receiver-document': receiver.document,
  value: 200
};

  account.create(sender);
  account.create(receiver);

describe('List transaction history serevice test', () => {
  createTransactionService.create(new_transaction);
  
  it('Show quantity of transactions', () => {
    expect(listTransactionHistoryService.showQuantity()).toEqual(1);
  });

  it('List transactions of an account', () => {
    let response = listTransactionHistoryService.perform(sender.document);

    expect(response).toEqual([
      {
        "receiver-document": "999.999.999-99",
        "sender-document": "111.111.111-11",
        datetime: expect.anything(),
        "available-limit": 200,
        value: -200
      }
    ]);
  });
});
