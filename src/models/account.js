if (!accounts) {
    var accounts = [];
}

exports.getAccounts = () => {
    return accounts;
}

exports.create = account => {
    let response = validateAccount(account);

    return response;
}

exports.updateSenderAvailableLimit = (account, debit_value) => {
    let i = accounts.findIndex(acc => acc.document === account.document);
    accounts[i]['available-limit'] -= debit_value;

    return accounts[i]['available-limit'];
}

exports.updateReceiverAvailableLimit = (account, debit_value) => {
    let i = accounts.findIndex(acc => acc.document === account.document);
    accounts[i]['available-limit'] += debit_value;

    return accounts[i]['available-limit'];
}

const accountExists = document => {
    return (accounts.filter(a => a.document == document).length > 0);
}

const missingParameter = account => {
    return !(account['available-limit'] && account.name && account.document)
}

const registerAccount = account => {
    accounts.push(account);

    return account;
}

const validateAccount = account => {
    if (accounts.length > 0) {
        if (accountExists(account.document)) {
            return { violation: 'account_already_initialized' }
        } else if (missingParameter(account)) {
            return { violation: 'invalid_data' }
        } else {
            return registerAccount(account);
        }
    } else {
        return registerAccount(account);
    }
}