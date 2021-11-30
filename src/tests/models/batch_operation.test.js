const batch_operation = require('../../models/batch_operation');

describe('Batch operation model test ', () => {
  const anyObject = { id: 1, name: 'name' }

  it('Should register one transaction', () => {
    expect(batch_operation.getCurrentTransactions.length).toEqual(0);

    batch_operation.appendTransaction(anyObject);

    expect(batch_operation.getCurrentTransactions().length).toEqual(1);
  });
});
