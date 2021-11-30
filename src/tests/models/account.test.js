const account = require('../../models/account');

describe('Account model tests', () => {
  const new_account = { name: 'test', document: '123456', "available-limit": 300 }

  it('Should create an account', () => {
    account.create(new_account);

    expect(account.getAccounts().length).toEqual(1);
  });
  
  it('Should return all exists accounts', () => {
    for (let i = 1; i < 4; i++) {
      account.create({ name: `test${i}`, document: `12345${i}`, "available-limit": (10 * i) });
    }

    expect(account.getAccounts().length).toEqual(4);
  });

  it('Should update available-limit of an account', () => {
    account.create(new_account);

    account.updateSenderAvailableLimit(new_account, 100);

    expect(account.getAccounts()[0]['available-limit']).toEqual(200);
  });

  it('Should update available-limit of an account', () => {
    account.create(new_account);

    account.updateReceiverAvailableLimit(new_account, 100);

    expect(account.getAccounts()[0]['available-limit']).toEqual(300);
  });
});
