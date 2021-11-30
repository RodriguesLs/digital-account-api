const createAccountService = require('../../../services/accounts/create_service');

describe('Create accouunt service test', () => {
  const new_account = { name: "Joana Bárbara Caldeira", document: "999.999.999-99", "available-limit": 1000 }
  
  it('Should create an account', () => {
    let response = createAccountService.perform(new_account);
    
    expect(response.violation).toBeUndefined();
  });
  
  it('Should not create an account, invalid_data', () => {
    const invalid_account = { name: "Joana Bárbara Caldeira", document: "999.999.999-99" }
    let response = createAccountService.perform(invalid_account);
    
    expect(response).toEqual({ violation: 'invalid_data' });
  });

  it('Should not create an account, account_already_initialized', () => {
    let response = createAccountService.perform(new_account);
    
    expect(response).toEqual({ violation: 'account_already_initialized' });
  });
});
