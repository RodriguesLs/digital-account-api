if (!accounts) {
    var accounts = [];
}

exports.create = account => {
    let response;

    if (accounts.length > 0) {
        if (accountExists(account.document)) {
            response = {violation: 'account already exists'}
        } else {
            accounts.push(account);
            response = { status: 'sucess' }
        }
    } else {
        accounts.push(account);
        response = { status: 'sucess' }
    }

    return response;
}

const accountExists = document => {
    let x = accounts.filter(a => a.document == document);

    return (x.length > 0) ? true : false;
}

/* const initialize = () => {
    if (accounts) {
        return;
    }
    else {
        var accounts = [];
        return
    }
} */