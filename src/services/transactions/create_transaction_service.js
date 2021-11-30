const account = require('../../models/account');
const transactionModel = require('../../models/transaction');

exports.create = transaction => {
  if (transactionModel.getQttTransactions() > 0) {
    if (accountNotExists(transaction)) {
      return { violation: 'account_not_initialized' }
    } else if (insufficientLimit(transaction)) {
      return { violation: 'insufficient_limit' }
    } else if (preventDuplicatedTransaction(transaction)) {
      return { violation: 'double_transaction' }
    } else {
      return transactionModel.create(transaction);
    }
  } else {
    if (accountNotExists(transaction)) {
      return { violation: 'account_not_initialized' }
    } else {
      return transactionModel.create(transaction);
    }
  }
}

const insufficientLimit = transaction => {
  const accounts = account.getAccounts();

  let sender = accounts.find(acc => acc.document == transaction['sender-document']);

  return (sender['available-limit'] < transaction.value);
}

const accountNotExists = transaction => {
  const accounts = account.getAccounts();

  if (accounts.length == 0) return true;

  let sender = accounts.filter(acc => acc.document == transaction['sender-document']).length > 0;
  let receiver = accounts.filter(acc => acc.document == transaction['receiver-document']).length > 0;

  return !(sender && receiver);
}

const preventDuplicatedTransaction = transaction => {
  let warning_transaction = transactions.find(t => {
    let current_t = JSON.parse(t);

    return (current_t.value === transaction.value &&
      current_t['sender-document'] === transaction['sender-document'] &&
        current_t['receiver-document'] === transaction['receiver-document']);
  });

  if (warning_transaction) {
    return ((new Date() - new Date(JSON.parse(warning_transaction).datetime)) < 120000); 
  } else {
    return false;
  }
}