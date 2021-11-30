const transaction = require('../../models/transaction');
const account = require('../../models/account');

exports.showQuantity = () => {
  return transaction.list().length;
};

exports.perform = document => {
  let customer_account = account.getAccounts().find(acc => acc.document === document);

  if (customer_account) {
    return transaction.history(document);
  } else {
    return { violation: 'account_not_initialized' }
  }
}
