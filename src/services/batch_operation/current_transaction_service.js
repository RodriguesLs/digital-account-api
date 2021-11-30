if (!current_transactions) {
  var current_transactions = [];
}

exports.appendTransaction = transaction => {
  current_transactions.push(JSON.stringify(transaction));

  return true;
}

exports.getCurrentTransactions = () => {
  return current_transactions.map(ct => JSON.parse(ct));
}
