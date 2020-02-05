const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');


const nodeAddress = uuid().split('-').join('');
console.log('uuid() ', uuid())
console.log('nodeAddress ', nodeAddress);

const bitcoin = new Blockchain();

// app.use(bodyParser.json());
const jsonParser = bodyParser.json();

// app.use(bodyParser.urlencoded({ extended:false })
const urlencodedParser = bodyParser.urlencoded({ extended:false })

// send entire blockchain
app.get('/blockchain', function(req, res) {
  res.send(bitcoin); 
});

// create a new transaction. This will be in pending until making another block. 
app.post('/transaction', jsonParser, (req, res) => {
  const data = req.body
  const blockIndex = bitcoin.createNewTransaction(data.amount, data.sender, data.recipient);
  res.json({
    note: `Transaction will be added in block ${blockIndex}.`
  })
  // console.log(req.body);
  // res.send(`The amount of the Transaction is ${req.body.amount} bitcoin`)
})

// mine(create) a new block
app.get('/mine', (req, res) => {
  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock['hash'] 

  const currentBlockData = {
    transactions: bitcoin.PendingTransactions,
    index: lastBlock['index'] + 1
  }

  const nonce = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
  const blockHash = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);

  bitcoin.createNewTransaction(12.5, "00", nodeAddress);

  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash)

  res.json({
    note: "New block mined Successfully",
    block: newBlock
  })
});

app.listen(3000, () => {
  console.log('Listening on port 3000.....changed')
});

