const uuid = require('uuid/v1');
const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];

class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTxs = [];

    this.currentNodeUrl = currentNodeUrl;
    this.networkNodes = [];

    this.createNewBlock('', '', 0)
  }

  createNewBlock(parentHash, hash, nonce) {
    const newBlock = {
      index: this.chain.length,
      timestamp: Date.now(),
      parentHash: parentHash,
      hash: hash,
      nonce: nonce,
      transactions: this.pendingTxs
    };
    this.chain.push(newBlock);
    this.pendingTxs = [];

    return newBlock
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  createNewTx(amount, sender, recipient) {
    const newTx = {
      txId: uuid().split('-').join(''),
      amount,
      sender,
      recipient
    };
    this.pendingTxs.push(newTx);

    // return the number of the block that this transaction will be added to
    //console.log(1,  this.getLastBlock());
    //console.log(2, this.getLastBlock()['index'])
    // console.log(3, this.getLastBlock()['index'] + 1)
    
    return this.getLastBlock()['index'] + 1
  }
  
  /*
  addTxToPendingTx(transactionObj) {
    this.pendingTransactions.push(transactionObj);

    return this.getLastBlock()['index'] + 1;
  }
  */

  hashBlock(parentHash, currentBlockData, nonce) {
    const stringData = parentHash + JSON.stringify(currentBlockData) + nonce.toString()
    const hashData = sha256(stringData);
    return hashData;
  }
  
  pow(parentHash, currentBlockData) {
    let nonce = 0; // 논스 값이 계속 변경되기 때문 let 사용
    let hashVal = this.hashBlock(parentHash, currentBlockData, nonce);
    while (hashVal.substring(0, 5) !== '00000') {
      nonce++;
      hashVal = this.hashBlock(parentHash, currentBlockData, nonce);
    }
    return nonce
  };
}

module.exports = Blockchain;
