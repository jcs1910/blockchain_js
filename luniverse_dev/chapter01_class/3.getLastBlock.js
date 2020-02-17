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
}
module.exports = Blockchain
