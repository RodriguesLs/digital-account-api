const account = require('../models/account');

if (!transactions) {
  var transactions = {};
}

exports.create = transaction => {
  if (transactions.length > 0) {
    if (accountNotExists(transaction)) {
      return { violation: 'account_not_initialized' }
    } else if (insufficientLimit(transaction)) {
      return { violation: 'insufficient_limit' }
    } else if (preventDuplicatedTransaction(transaction)) {
      return { violation: 'double_transaction' }
    } else {
      return registerTransaction(transaction);
    }
  } else {
    return registerTransaction(transaction);
  }
}

exports.history = document => {
  let customer_account = account.getAccounts().find(acc => acc.document === document);

  if (customer_account) {
    return transactions[document];
  } else {
    return { violation: 'account_not_initialized' }
  }
}

const registerTransaction = transaction => {
  transaction.datetime = new Date();

  let sender = account.getAccounts().find(acc => acc.document === transaction['sender-document']);
  let new_sender_limit = account.updateSenderAvailableLimit(sender, transaction.value);

  let receiver = account.getAccounts().find(acc => acc.document === transaction['receiver-document']);
  let new_receiver_limit = account.updateReceiverAvailableLimit(receiver, transaction.value);

  transaction['available-limit'] = new_sender_limit;

  let response_transaction = JSON.stringify(transaction);

  updateSenderHistory(transaction);
  updateReceiverHistory(transaction, new_receiver_limit);

  response_transaction = JSON.parse(response_transaction);
  
  delete response_transaction['value'];

  return response_transaction;
}

const preventDuplicatedTransaction = transaction => {
  let warning_transaction = transactions.find(t => {
    return t.value === transaction.value &&
      t['sender-document'] === transaction['sender-document'] &&
        t['receiver-document'] === transaction['receiver-document']
  });

  if (warning_transaction) {
    return ((new Date() - new Date(warning_transaction.datetime)) < 120000); 
  } else {
    return false;
  }
}

const accountNotExists = transaction => {
  const accounts = account.getAccounts();

  let sender = accounts.filter(acc => acc.document == transaction['sender-document']).length > 0;
  let receiver = accounts.filter(acc => acc.document == transaction['receiver-document']).length > 0;

  return !(sender && receiver);
}

const insufficientLimit = transaction => {
  const accounts = account.getAccounts();

  let sender = accounts.find(acc => acc.document == transaction['sender-document']);

  return (sender['available-limit'] < transaction.value);
}

const updateSenderHistory = sender_transaction => {
  sender_transactions = transactions[sender_transaction['sender-document']]

  sender_transaction.value = -sender_transaction.value;

  if (sender_transactions) {
    transactions[sender_transaction['sender-document']].push(sender_transaction)
  } else {
    transactions[sender_transaction['sender-document']] = [sender_transaction];
  }
}

const updateReceiverHistory = (receiver_transaction, new_limit) => {
  receiver_transactions = transactions[receiver_transaction['receiver-document']];

  receiver_transaction['available-limit'] = new_limit;

  if (receiver_transactions) {
    transactions[receiver_transaction['receiver-document']].push(receiver_transaction);
  } else {
    transactions[receiver_transaction['receiver-document']] = [receiver_transaction];
  }
}
