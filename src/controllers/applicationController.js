const account = require('../models/account');
const createTransactionService = require('../services/transactions/create_service');
const currentTransaction = require('../services/batch_operation/current_transaction_service');
const transaction = require('../models/transaction');

exports.initialize = req => {
  const { payload } = req.body;
  const data = JSON.parse(payload);

  return selectOperationAndExecute(data);
}

const initializeAccount = operation => {
  let result = account.create(operation.payload);

  return preparePayload(result, operation.type);
}

const execute_transaction = operation => {
  let result = createTransactionService.create(operation.payload);

  return preparePayload(result, operation.type);
}

const transaction_history = operation => {
  let result = transaction.history(operation.payload.document);

  return preparePayload(result, operation.type);
}

const preparePayload = (result, type) => {
  if (result.violation) {
    return { type, status: 'failure', result }
  } else {
    return { type, status: 'success', result }
  }
}

const selectOperationAndExecute = data => {
  data.forEach(operation => {
    switch(operation.type) {
      case('initialize_account'):
        currentTransaction.appendTransaction(initializeAccount(operation));
        
        break;
      case('transaction'):
        currentTransaction.appendTransaction(execute_transaction(operation));

        break;
      case('transaction_history'):
        currentTransaction.appendTransaction(transaction_history(operation));

        break;
      default:
        currentTransaction.appendTransaction({ status: "unprocessable_entity", violation: "operation_not_found" });
    }
  });

  return currentTransaction.getCurrentTransactions();
}
