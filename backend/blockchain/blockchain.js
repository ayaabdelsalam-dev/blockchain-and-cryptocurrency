const crypto = require('crypto');

class Block {
  constructor(index, timestamp, transactions, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(
        this.index +
          this.previousHash +
          this.timestamp +
          JSON.stringify(this.transactions) +
          this.nonce
      )
      .digest('hex');
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
  }

  createGenesisBlock() {
    return new Block(0, Date.now().toString(), 'Genesis Block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions() {
    const block = new Block(
      this.chain.length,
      Date.now().toString(),
      this.pendingTransactions,
      this.getLatestBlock().hash
    );
    block.mineBlock(this.difficulty);
    this.chain.push(block);
    this.pendingTransactions = [];
    return block;
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      if (!Array.isArray(block.transactions)) continue;

      for (const tx of block.transactions) {
        if (tx.from === address) {
          balance -= tx.amount;
        }

        if (tx.to === address) {
          balance += tx.amount;
        }
      }
    }

    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      if (current.hash !== current.calculateHash()) return false;
      if (current.previousHash !== previous.hash) return false;
    }
    return true;
  }
}

module.exports = Blockchain;
