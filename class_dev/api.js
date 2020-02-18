const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1')

const bitcoin = new Blockchain(); 
const nodeAddress = uuid().split('-').join('');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// fetch entire Blockchain
app.get('/blockchain', (req, res) => {
	res.send(bitcoin)
});

// create a new Transaction
app.post('/transaction', (req, res) => {
  const body = req.body;
  const blockIndex = bitcoin.createNewTx(body.amount, body.sender, body.recipient);

  res.json({ note: `The newly created transaction will be added in block number ${blockIndex}` })
});

// create a new Block
app.get('/mine', (req, res) => {
  const lastBlock = bitcoin.getLastBlock();
  const parentHash = lastBlock['hash'];
  const currentBlockData = {
    index: parentHash['index'] + 1,
    timestamp: Date.now(),
    transaction: this.pendingTxs,
  };
  const nonce = bitcoin.pow(parentHash, currentBlockData)  
  const hashData = bitcoin.hashBlock(parentHash, currentBlockData, nonce) 

  bitcoin.createNewTx(12.5, "00", nodeAddress)

  const newBlock = bitcoin.createNewBlock(parentHash, hashData, nonce);
  
  res.json({
    note: 'New block mined successfully',
    newBlock: newBlock
  })
});

app.listen(3000, () => {
	console.log('Listening on port 3000...');
})
