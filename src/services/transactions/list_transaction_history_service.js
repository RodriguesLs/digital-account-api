const transaction = require('../../models/transaction');

exports.getQttTransactions = () => {
  return transaction.getQttTransactions();
};
