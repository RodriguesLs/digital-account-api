const accountModel = require('../../models/account');

exports.perform = (document, type, value) => {
  let debit_or_credit_value = (type === 'sender') ? -value : value;

  return updateAvailableLimit(document, debit_or_credit_value);
}

const updateAvailableLimit = (document, debit_or_credit_value) => {
  let i = accountModel.all().findIndex(acc => acc.document === document);

  let new_available_limit = accountModel.update(i, debit_or_credit_value);

  return new_available_limit;
}
