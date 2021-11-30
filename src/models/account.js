if (!accounts) {
    var accounts = [];
}

exports.getAccounts = () => {
    return accounts;
}

exports.cleanAccounts = () => {
    accounts = [];
}

exports.create = account => {
  accounts.push(account);

  return account;
}

exports.updateSenderAvailableLimit = (account, debit_value) => {
    let i = accounts.findIndex(acc => acc.document === account.document);

    accounts[i]['available-limit'] -= debit_value;

    return accounts[i]['available-limit'];
}

exports.updateReceiverAvailableLimit = (account, credit_value) => {
    let i = accounts.findIndex(acc => acc.document === account.document);
    
    accounts[i]['available-limit'] += credit_value;
    
    return accounts[i]['available-limit'];
}
