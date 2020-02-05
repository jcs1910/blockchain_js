const sha256 = require('sha256');

function Blockchain() {
  this.chain = [];
  this.pendingTransactions = [];

  // create Genesis block
  this.createNewBlock(100, '0', '0');
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
  const newBlock = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    transactions: this.pendingTransactions,
    nonce: nonce,
    hash: hash,
    previousBlockHash: previousBlockHash,
  };
  this.pendingTransactions = [];
  this.chain.push(newBlock);

  return newBlock;
};

Blockchain.prototype.getLastBlock = function() {
  return this.chain[this.chain.length - 1];
};

Blockchain.prototype.createNewTransaction = function(amount, sender, recipient) {
  const newTransaction = {
    amount, 
    sender, 
    recipient
  };
  
  this.pendingTransactions.push(newTransaction);
  
  // return blockIndex 
  return this.getLastBlock()['index'] + 1;
};

Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
  const strData = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
  const hash = sha256(strData);
  return hash
}

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockData) {
  // bitcoin.hashBlock(previousBlockHash, currentBlokchHash, nonce);
  // => Repeatedly hash block until it finds correct hash => '00003ghrehg345t43hgre2t'
  // => use current block data for the hash, but also the previousBlockHash
  // => continuously changes nonce value until it finds the correct hash;
  // => return to us the nonce value that creates the correct hash
  let nonce = 0;
  console.log('this', this)
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  while (hash.substring(0, 4) !== '0000') {
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    console.log('hash ', hash);
  }
  return nonce;
};







// or you can do the same thing in Class

/*
class Blockchain {
  constructor() {
    this.chain = [];
    this.newTransactions = [];
  }
}
*/
module.exports = Blockchain;

