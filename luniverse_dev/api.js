const Blockchain = require('./chapter01_class/blockchain.js');

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
  const newTx = req.body

  // if body contains nothing, send an error msg
  if (Object.entries(newTx).length > 0) {
    const blockIndex = bitcoin.createNewTx(newTx.amount, newTx.sender, newTx.recipient);
    res.json({ msg: `The new transaction will be added in block ${blockIndex}.`})
  } else {
    res.json({ msg: 'no transaction data'})
  }
 });

// mine(create) a new block
app.get('/mine', (req, res) => {
  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock['hash'] 

  const currentBlockData = {
    transactions: bitcoin.PendingTxs,
    index: lastBlock['index'] + 1
  }

  const nonce = bitcoin.pow(previousBlockHash, currentBlockData);
  const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

  
  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash)

  bitcoin.createNewTx(12.5, "00", nodeAddress);

  res.json({
    msg: "New block mined Successfully",
    block: newBlock
  })
});

app.listen(3000, () => {
  console.log('Listening on port 3000.....changed')
});

