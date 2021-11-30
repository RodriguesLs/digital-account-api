if (!accounts) {
  var accounts = [];
}

exports.all = () => {
  return accounts;
}

exports.destroyAll = () => {
  accounts = [];
}

exports.create = account => {
  accounts.push(account);

  return account;
}

exports.update = (account_id, value) => {
  accounts[account_id]['available-limit'] += value;

  return accounts[account_id]['available-limit'];
}
