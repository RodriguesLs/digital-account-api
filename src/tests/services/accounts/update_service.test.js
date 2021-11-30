const updateAccountService = require('../../../services/accounts/update_service');
const createAccountService = require('../../../services/accounts/create_service');
const accountModel = require('../../../models/account');

describe('Update account service test', () => {
  let new_account;

  beforeEach(() => {
    new_account = { name: "Joana Bárbara Caldeira", document: "999.999.999-99", "available-limit": 1000 }

    createAccountService.perform(new_account);
  });

  afterEach(() => {
    accountModel.destroyAll();
  });

  it('Should update account, sender', () => {
    updateAccountService.perform(new_account.document, 'sender', 400);

    let account_updated = accountModel.all()[0];

    expect(account_updated['available-limit']).toEqual(600);
  });

  it('Should update account, receiver', () => {
    updateAccountService.perform(new_account.document, 'receiver', 200);

    let account_updated = accountModel.all()[0];

    expect(account_updated['available-limit']).toEqual(1200);
  });
});
