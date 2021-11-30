if (!transactions) {
  var transactions = [];
  var transactionHistory = {};
}

exports.list = () => {
  return transactions;
}

exports.create = transaction => {
  return registerTransaction(transaction);
}

exports.history = document => {
  return transactionHistory[document];
}

exports.createHistory = (transactionKey, transaction) => {
  let accountHistoryAlreadyExist = transactionHistory[transactionKey];

  if (accountHistoryAlreadyExist) {
    transactionHistory[transactionKey].push(transaction);
  } else {
    transactionHistory[transactionKey] = [transaction];
  }

  return true;
}

const registerTransaction = transaction => {
  transactions.push(transaction);

  responseTransaction = JSON.parse(transaction);

  delete responseTransaction['value'];

  return responseTransaction;
}
