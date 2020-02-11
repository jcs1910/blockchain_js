const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require('uuid/v1');
const port = process.argv[2]; // package.json에 start에 포트를 의미함
const rp = require('request-promise');

// console.log('process.argv[3] ', process.argv[3])

const nodeAddress = uuid().split('-').join('');
// console.log('uuid() ', uuid())

const bitcoin = new Blockchain();

//const jsonParser = bodyParser.json();
app.use(bodyParser.json());

// const urlencodedParser = bodyParser.urlencoded({ extended:false })
app.use(bodyParser.urlencoded({ extended:false }))

// send entire blockchain
app.get('/blockchain', function(req, res) {
  res.send(bitcoin); 
});

// send a new tx to all nodes
app.post('/transaction', (req, res) => {
  const newTransaction = req.body
  console.log('newTransaction => ', newTransaction) 
  // error handling / if empty object delivered, send an error message
  if (Object.entries(newTransaction).length > 0) {
    const blockIndex = bitcoin.addTransactionToPendingTransactions(newTransaction);
    res.json({ note: `Transaction will be added in block ${blockIndex}.` })
  } else {
    res.json({note: 'error'})
  }
});

app.post('/transaction/broadcast', (req, res) => {
  const body = req.body;


  const newTransaction = bitcoin.createNewTransaction(body.amount, body.sender, body.recipient);
  bitcoin.addTransactionToPendingTransactions(newTransaction);

  const requestPromises = [];
  // use  '/transaction' api to broadcast the new Tx to all network nodes
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    console.log('netNodeUrl ', networkNodeUrl)
    const requestOptions = {
      uri: networkNodeUrl + '/transaction',
      method: 'POST',
      body: newTransaction,
      json: true
    };
    requestPromises.push(rp(requestOptions));
  });
  
   
  Promise.all(requestPromises)
    .then(data => {
      res.json({ note: 'Transaction created and broadcast successfully' })
    });
});

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
  const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash)

  const requestPromises = [];
  // loop through all other nodes inside a network and make a request to them and send this new block along with data
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    const requestOptions = {
      uri: networkNodeUrl + '/receive-new-block',
      method: 'POST',
      body: { newBlock: newBlock },
      json: true
    };
    requestPromises.push(rp(requestOptions));
  });

  Promise.all(requestPromises)
    .then(data => {
      const requestOptions = {
        uri: bitcoin.currentNodeUrl + '/transaction/broadcast',
        method: 'POST',
        body: {
          amount: 12.5,
          sender: "00",
          recipient: nodeAddress
        },
        json: true
      };
      return rp(requestOptions);
    })
    .then(data => {
    res.json({
      note: "New block mined and broadcast Successfully",
      block: newBlock
    })
  });
});


app.post('/receive-new-block', (req, res) => { 
  // 블록 유효성 확인을 위해 1. 해시 검증 2. 인덱스(번호) 검증
  const newBlock = req.body.newBlock;
  const lastBlock = bitcoin.getLastBlock();
  const validHash = lastBlock.hash === newBlock.previousBlockHash 
  const validIndex = lastBlock['index'] + 1 === newBlock['index']

  if (validHash && validIndex) {
    // chain은 어디에??????????????????????
    bitcoin.chain.push(newBlock);
    bitcoin.pendingTransactions = [];
    res.json({
      note: 'New block received and accepted',
      newBlock: newBlock
    });
  } else {
    res.json({
      note: 'New Block rejected',
      newBlock: newBlock
    });
  }
});

// register a node and broadcast it to the entire network
app.post('/register-and-broadcast-node', (req, res) => {
  // console.log('newNodeUrl ', req.body.newNodeUrl)
  const newNodeUrl = req.body.newNodeUrl;
  // console.log('newNodeUrl ', newNodeUrl)
  if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) { // 새로운 노드가 기존의 추가되지 않았다면
    bitcoin.networkNodes.push(newNodeUrl) // 생성된 블록체인의 네트워크 노드에 새로운 노드 추가
    // console.log('bitcoin.networkNodes => ', bitcoin.networkNodes)
  }
  const registerNodesPromise = [];


  // broadcast a new node to the network
  // console.log('bitcoin.networkNodes ', bitcoin.networkNodes) // ['http://localhost:3002']
  bitcoin.networkNodes.forEach(networkNodeUrl => {
    // '/register-node' 
    const requestOptions = {
      uri: networkNodeUrl + '/register-node',
      method: 'POST',
      body: {
        newNodeUrl: newNodeUrl
      },
      json: true
    };
    registerNodesPromise.push(rp(requestOptions));
    // console.log('requestOptions ', requestOptions)
    // console.log('rp ', rp)
    // console.log('registerNodesPromise.push(rp(requestOptions))', registerNodesPromise.push(rp(requestOptions)));
  })
  Promise.all(registerNodesPromise)
    .then(data => {
      // use the data...
      const bulkRegisterOptions = {
        uri: newNodeUrl + '/register-nodes-bulk',
        method: 'POST',
        body: {
          allNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]
        },
        json: true,
      };
      return rp(bulkRegisterOptions);
    })
    .then(data => {
      res.json({
        Notes: 'New node registered with network successfully.'
      });
    });
});


// register a node with the nework. 
app.post('/register-node', (req, res) => {
  const newNodeUrl = req.body.newNodeUrl;
  const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(newNodeUrl) == -1;
  // if a new node is not the same URL as a current Node Url
  const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
  // console.log('nodeNotAlreadyPresent =>', nodeNotAlreadyPresent);
  // console.log('notCurrentNode => ', notCurrentNode)
  // console.log('before networkNodes ', bitcoin.networkNodes)
  if (nodeNotAlreadyPresent && notCurrentNode) {
    bitcoin.networkNodes.push(newNodeUrl);
    console.log('after push networkNodes => ', bitcoin.networkNodes);
  }
  res.json({
    Note: 'New node registered successfully'
  });
});

//  register multiple nodes at once 
app.post('/register-nodes-bulk', (req, res) => {
  const allNetworkNodes = req.body.allNetworkNodes;
  console.log('allNetworkNodes => ', allNetworkNodes);
  allNetworkNodes.forEach(networkNodeUrl => {
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) == -1;
    const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
    if (nodeNotAlreadyPresent && notCurrentNode) bitcoin.networkNodes.push(networkNodeUrl);
  })
  res.json({ note: 'Successful Bulk registration '})
});


app.listen(port, () => {
  console.log(`Listening on port ${port}.....changed`)
});

