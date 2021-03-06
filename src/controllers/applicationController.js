const currentTransaction = require('../services/batch_operation/current_transaction_service');
const createTransactionService = require('../services/transactions/create_service');
const listTransactionHistoryService = require('../services/transactions/list_history_service');
const createAccountService = require('../services/accounts/create_service');

exports.initialize = req => {
  const { payload } = req.body;
  const data = JSON.parse(payload);

  return selectOperationAndExecute(data);
}

const initializeAccount = operation => {
  let result = createAccountService.perform(operation.payload);

  return preparePayload(result, operation.type);
}

const executeTransaction = operation => {
  let result = createTransactionService.create(operation.payload);

  return preparePayload(result, operation.type);
}

const transactionHistory = operation => {
  let result = listTransactionHistoryService.perform(operation.payload.document);

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
        currentTransaction.appendTransaction(executeTransaction(operation));

        break;
      case('transaction_history'):
        currentTransaction.appendTransaction(transactionHistory(operation));

        break;
      default:
        currentTransaction.appendTransaction({ status: "unprocessable_entity", violation: "operation_not_found" });
    }
  });

  return currentTransaction.getCurrentTransactions();
}
