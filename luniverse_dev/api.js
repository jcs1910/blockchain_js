const Blockchain = require('./blockchain');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');

const nodeAddress = uuid().split('-').join('');

const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// fetch entire blockchain
app.get('/blockchain', (req, res) => {
  res.send(bitcoin); 
});

// create a new transaction. This will be in pending until making another block. 
app.post('/transaction', (req, res) => {
  const data = req.body
  const blockIndex = bitcoin.createNewTx(data.amount, data.sender, data.recipient);
  res.json({
    msg: `Transaction will be added in block ${blockIndex}.`
  })
})

// mine(create) a new block
app.get('/mine', (req, res) => {
  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock['hash'] 

  const currentBlockData = {
    transactions: bitcoin.PendingTransactions,
    index: lastBlock['index'] + 1
  }

  const nonce = bitcoin.pow(previousBlockHash, currentBlockData);
  const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

  bitcoin.createNewTx(12.5, "00", nodeAddress);

  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash)

  res.json({
    msg: "New block mined Successfully",
    block: newBlock
  })
});

app.listen(3000, () => {
  console.log('Listening on port 3000.....changed')
});

