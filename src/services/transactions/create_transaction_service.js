const account = require('../../models/account');
const transactionModel = require('../../models/transaction');
const listTransactionHistoryService = require('./list_transaction_history_service');

exports.create = transaction => {
  if (accountNotExists(transaction))
    return violationError('account_not_initialized');

  if (transactionModel.list().length > 0) {
    return checkConditions(transaction);
  } else {
    return prepareTransactionCreate(transaction);
  }
}

const prepareTransactionCreate = transaction => {
  transaction.datetime = new Date();

  let receiverLimit = updateReceiverLimit(transaction);
  transaction['available-limit'] = updateAccountLimit(transaction);

  let responseTransaction = JSON.stringify(transaction);

  updateSenderHistory(responseTransaction);
  updateReceiverHistory(responseTransaction, receiverLimit);

  return transactionModel.create(responseTransaction);
}

const updateSenderHistory = senderTransaction => {
  senderTransaction = JSON.parse(senderTransaction);

  senderTransaction.value = -senderTransaction.value;

  transactionModel.createHistory(
    senderTransaction['sender-document'],
    senderTransaction
  );
}

const updateReceiverHistory = (receiverTransaction, new_limit) => {
  receiverTransaction = JSON.parse(receiverTransaction);

  receiverTransaction['available-limit'] = new_limit;

  transactionModel.createHistory(
    receiverTransaction['receiver-document'],
    receiverTransaction
  );
}

const updateAccountLimit = transaction => {
  let sender = account.getAccounts().find(acc => acc.document === transaction['sender-document']);

  return account.updateSenderAvailableLimit(sender, transaction.value);
}

const updateReceiverLimit = transaction => {
  let receiver = account.getAccounts().find(acc => acc.document === transaction['receiver-document']);

  return account.updateReceiverAvailableLimit(receiver, transaction.value);
}

const checkConditions = transaction => {
  if (insufficientLimit(transaction)) {
    return violationError('insufficient_limit')
  } else if (preventDuplicatedTransaction(transaction)) {
    return violationError('double_transaction')
  } else {
    return prepareTransactionCreate(transaction);
  }
}

const violationError = err => {
  return { violation: err }
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
  let warning_transaction = transactionModel.list().find(t => {
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
