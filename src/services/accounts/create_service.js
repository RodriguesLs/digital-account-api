const accountModel = require('../../models/account');

exports.perform = account => {
  return validateAccount(account);
}

const validateAccount = account => {
  if (missingParameter(account)) return violation_data('invalid_data');

  if (accountExists(account.document)) return violation_data('account_already_initialized');

  return accountModel.create(account);
}

const missingParameter = account => {
  return !(account['available-limit'] && account.name && account.document)
}

const accountExists = document => {
  return (accountModel.getAccounts().filter(a => a.document == document).length > 0);
}

const violation_data = err => ({ violation: err }); 
