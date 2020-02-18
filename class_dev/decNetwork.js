const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const Blockchain  = require('./blockchain');
const uuid        = require('uuid/v1')
const port        = process.argv[2];

const rp          = require('request-promise')

const bitcoin     = new Blockchain();
const nodeAddress = uuid().split('-').join('');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// fetch entire Blockchain
app.get('/blockchain', (req, res) => {
	res.send(bitcoin)
});

// create a new Transaction
app.post('/transaction', (req, res) => {
  const body       = req.body;
  const blockIndex = bitcoin.createNewTx(body.amount, body.sender, body.recipient);

  res.json({ msg: `The newly created transaction will be added in block number ${blockIndex}` })
});

// create a new Block
app.get('/mine', (req, res) => {
  const lastBlock  = bitcoin.getLastBlock();
  const parentHash = lastBlock['hash'];
  const currentBlockData = {
    index       : parentHash['index'] + 1,
    timestamp   : Date.now(),
    transaction : this.pendingTxs,
  };
  const nonce    = bitcoin.pow(parentHash, currentBlockData)
  const hashData = bitcoin.hashBlock(parentHash, currentBlockData, nonce)

  bitcoin.createNewTx(12.5, "00", nodeAddress)

  const newBlock = bitcoin.createNewBlock(parentHash, hashData, nonce);
  
  res.json({
    msg      : 'New block mined successfully',
    newBlock : newBlock
  })
});

app.post('/node/registration-broadcasting', (req, res) => {
  const newNodeUrl = req.body.newNodeUrl;
  
  if (!bitcoin.networkNodes.includes(newNodeUrl)) {
    bitcoin.networkNodes.push(newNodeUrl);
  }

  const nodeRegCompleted = [];
  // networkNodes에 포함된 모든 노드에게 새로운 노드 전파하기
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri    : networkNodeUrl + '/node/registration',
      method : 'POST',
      body   : { newNodeUrl:newNodeUrl },
      json   : true
    };
    nodeRegCompleted.push(rp(requestOptions));
  });

  Promise.all(nodeRegCompleted)
    .then(data => {
      const allRegistrationOpt = {
        uri    : newNodeUrl + '/node/registration/all',
        method : 'POST',
        body   : { allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]},
        json   : true
      };
      return rp(allRegistrationOpt);
    })
    .then(data => {
      res.json({ msg: 'New node registered successfully'})
    });
});

// register a node across network nodes
app.post('/node/registration', (req, res) => {
  const newNodeUrl       = req.body.newNodeUrl;
  const nodeNotInNetwork = (!bitcoin.networkNodes.includes(newNodeUrl));
  const notCurrentNode   = bitcoin.currentNodeUrl !== newNodeUrl;

  if (nodeNotInNetwork && notCurrentNode) {
    bitcoin.networkNodes.push(newNodeUrl);
  };
  res.json({ msg: 'successful new node registration'})
})

// register multiple nodes at once
app.post('/node/registration/all', (req, res) => {
  const allNetworkNodes = req.body.allNetworkNodes;
  allNetworkNodes.forEach(networkNodeUrl => {
    const nodeNotInNetwork = (!bitcoin.networkNodes.includes(networkNodeUrl));
    const notCurrentNode   = bitcoin.currentNodeUrl !== networkNodeUrl;
    
    if (nodeNotInNetwork && notCurrentNode) {
      bitcoin.networkNodes.push(networkNodeUrl)
    }
  })
  res.json({ msg: 'All nodes synchronized successfully' })
});


app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});

