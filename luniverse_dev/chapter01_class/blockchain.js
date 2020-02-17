const uuid = require('uuid/v1'); 
const sha256 = require('sha256');

const currentNodeUrl = process.argv[3];

class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTxs = [];

    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];

    // create a Genesis Block
    this.createNewBlock('', '', 0);
  }

  createNewBlock(parentHash, hash, nonce) {
    const newBlock = {
      index: this.chain.length,
      timestamp: Date.now(),
      parentHash: parentHash,
      hash: hash,
      nonce: nonce,
      transactions: this.pendingTxs,
    };
    this.chain.push(newBlock);
    this.pendingTxs = [];

    return newBlock;
  } 
  // get a last block
  getLastBlock() {
    return this.chain[this.chain.length - 1];
  } 
  
  // create a new transaction included in a block
  createNewTx(amount, sender, recipient) {
    const newTx = {
      txId: uuid().split('-').join(''),
      amount: amount,
      sender: sender,
      recipient: recipient,
    };
    this.pendingTxs.push(newTx);

    // the number of the block that this tx will be added to
    return this.getLastBlock()['index'] + 1
  }

  // hash a block by using previous block hash and current block data and nonce
  hashBlock(parentHash, currentBlockData, nonce) {
    const stringData = parentHash + JSON.stringify(currentBlockData) + nonce.toString();
    const hashedData = sha256(stringData);

    return hashedData
  }

  // proofOfWork
  pow(parentHash, currentBlockData) {
    let nonce = 0;
    let hashVal = this.hashBlock(parentHash, currentBlockData, nonce);
    while (hashVal.substring(0, 5) !== '00000') {
      nonce++;
      hashVal = this.hashBlock(parentHash, currentBlockData, nonce);
      console.log('hash ', hashVal)
    }
    return nonce;
  };
}

module.exports = Blockchain

