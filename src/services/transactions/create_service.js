const account = require('../../models/account');
const transactionModel = require('../../models/transaction');
const updateAccountService = require('../../services/accounts/update_service');

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

  transaction['available-limit'] = updateAccount('sender', transaction);

  let responseTransaction = JSON.stringify(transaction);

  updateSenderHistory(responseTransaction);
  updateReceiverHistory(responseTransaction, updateAccount('receiver', transaction));

  return transactionModel.create(responseTransaction);
}

const updateAccount = (type, transaction) => {
  let document = (type === 'receiver') ? transaction['receiver-document'] : transaction['sender-document'];

  return updateAccountService.perform(document, type, transaction.value);
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
  const accounts = account.all();

  let sender = accounts.find(acc => acc.document == transaction['sender-document']);

  return (sender['available-limit'] < transaction.value);
}

const accountNotExists = transaction => {
  const accounts = account.all();

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
