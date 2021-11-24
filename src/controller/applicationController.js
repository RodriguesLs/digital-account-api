const account = require('../models/account');
const transaction = require('../models/transaction');
const batchOperation = require('../models/batch_operation');

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
  let result = transaction.create(operation.payload);

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
        batchOperation.appendTransaction(initializeAccount(operation));
        
        break;
      case('transaction'):
        batchOperation.appendTransaction(execute_transaction(operation));

        break;
      case('transaction_history'):
        batchOperation.appendTransaction(transaction_history(operation));

        break;
      default:
        batchOperation.appendTransaction({ status: "unprocessable_entity", violation: "operation_not_found" });
    }
  });

  return batchOperation.getCurrentTransactions();
}