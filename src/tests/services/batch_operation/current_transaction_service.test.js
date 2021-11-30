const currentTransaction = require('../../../services/batch_operation/current_transaction_service');

describe('Current transaction service test ', () => {
  const anyObject = { id: 1, name: 'name' }

  it('Should register one transaction', () => {
    expect(currentTransaction.getCurrentTransactions.length).toEqual(0);

    currentTransaction.appendTransaction(anyObject);

    expect(currentTransaction.getCurrentTransactions().length).toEqual(1);
  });
});
