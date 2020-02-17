// Indicate a unique Transaction Id
const uuid = require('uuid/v1'); 

class Blockchain {
  constructor() {
    this.chain = [];
    this.pendingTxs = [];

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
}
module.exports = Blockchain
