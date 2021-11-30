const transaction = require('../../models/transaction');

exports.getQttTransactions = () => {
  return transaction.list().length;
};
