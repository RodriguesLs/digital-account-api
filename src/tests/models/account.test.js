const account = require('../../models/account');

describe('Account model tests', () => {
  let new_account;

  beforeEach(() => {
    new_account = { name: 'test', document: '123456', "available-limit": 300 }
  });

  afterEach(() => {
    account.cleanAccounts();
  });

  it('Should create an account', () => {
    account.create(new_account);

    expect(account.getAccounts().length).toEqual(1);
  });
  
  it('Should return all exists accounts', () => {
    for (let i = 1; i < 4; i++) {
      account.create({ name: `test${i}`, document: `12345${i}`, "available-limit": (10 * i) });
    }

    expect(account.getAccounts().length).toEqual(3);
  });

  it('Should not register account twice', () => {
    for (let i = 0; i < 2; i++) {
      account.create(new_account);
    }

    expect(account.getAccounts().length).toEqual(1);
  });

  it('Should return violation: account_already_initialized', () => {
    let result;
    
    for (let i = 0; i < 2; i++) {
      result = account.create(new_account);
    }

    expect(result).toEqual({ violation: 'account_already_initialized' });
  });

  it('Should return violation: invalid_data', () => {
    let account_without_name = JSON.stringify(new_account);

    account_without_name = JSON.parse(account_without_name);

    delete account_without_name['name'];

    let result = account.create(account_without_name);

    expect(result).toEqual({ violation: 'invalid_data' });
  });

  it('Should update available-limit of an account', () => {
    account.create(new_account);

    account.updateSenderAvailableLimit(new_account, 100);

    expect(account.getAccounts()[0]['available-limit']).toEqual(200);
  });

  it('Should update available-limit of an account', () => {
    account.create(new_account);

    account.updateReceiverAvailableLimit(new_account, 100);

    expect(account.getAccounts()[0]['available-limit']).toEqual(400);
  });
});
