const sha256 = require('sha256');
const uuid = require('uuid/v1');

const currentNodeUrl = process.argv[3];

console.log('uuid', uuid)
console.log('uuid()', uuid())
console.log('uuid().split('-')', uuid().split('-'))
console.log("uuid().split('-').join('')", uuid().split('-').join(''))

function Blockchain() {
  this.chain = [];
  this.pendingTransactions = [];
  
  this.currentNodeUrl = currentNodeUrl;
  this.networkNodes = [];

  // create Genesis block
  this.createNewBlock(2083236893, '0', '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f');
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash) {
  const newBlock = {
    index: this.chain.length,
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
    transactionId: uuid().split('-').join(''), 
    amount, 
    sender, 
    recipient
  };
  return newTransaction
};

Blockchain.prototype.addTransactionToPendingTransactions = function(transactionObj) { 
  this.pendingTransactions.push(transactionObj);
  
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
  let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  while (hash.substring(0, 4) !== '0000') {
    nonce++;
    hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
  }
  return nonce;
};

Blockchain.prototype.chainIsValid = function(blockchain) {
  let validChain = true;
  
  console.log('validChain => ', validChain) 
  // compare the current block to the previous block
  for (let i = 1; i < blockchain.length; i++) {
    const currentBlock = blockchain[i];
    const previousBlock = blockchain[i - 1];
    const blockHash = this.hashBlock(previousBlock['hash'], { index: currentBlock['index'], transactions: currentBlock['transactions'] }, currentBlock['nonce']);
    
    // 2. 모든 블록이 correct data 가졌는지 체크 
    if (blockHash.substring(0, 4) !== '0000') validChain = false; 

    // 1. 해시 검증
    if (currentBlock['previousBlockHash'] !== previousBlock['hash']) { //chain not valid
      validChain = false;
    };
  }

    console.log('validChain => ', validChain) 
    // 3. Genesis Block 유효성 검증
    const genesisBlock = blockchain[0];
    const correctNonce = genesisBlock['nonce'] === 2083236893;
    const correctPreviousHash = genesisBlock['previousBlockHash'] === '';
    const correctHash = genesisBlock['hash'] === '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f'
    // Genesis Block received 1073 transactions
    const correctTransactions = genesisBlock['transactions'].length === 0;
    console.log('validChain => ', validChain) 
    if(!correctNonce || !correctPreviousHash || !correctHash || !correctTransactions) validChain = false;

    return validChain;
  
}





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

