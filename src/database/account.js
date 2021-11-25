class Account {
  constructor(name, document, limit) {
    this.accounts = [];
    this.name = name;
    this.document = document;
    this.limit = limit;  
  }


  create(name, document, limit) {
    this.accounts.push({ name, document, 'available-limit': limit });
  }

  listAccounts() {
    return this.accounts;
  }
}

exports.module = new Account;