const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();
// Consensus Test
const btc_validation = {
"chain": [
{
"index": 0,
"timestamp": 1581790208609,
"transactions": [],
"nonce": 2083236893,
"hash": "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
"previousBlockHash": "0"
},
{
"index": 1,
"timestamp": 1581790235968,
"transactions": [],
"nonce": 182255,
"hash": "0000517e93e6a320ea73988a1b9340bde410fb2070ae566c14e969a53bdc0fb8",
"previousBlockHash": "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f"
}
],
"pendingTransactions": [
{
"transactionId": "76c25670501e11ea897c8902f297a1c4",
"amount": 12.5,
"sender": "00",
"recipient": "66702d10501e11ea897c8902f297a1c4"
}
],
"currentNodeUrl": "http://localhost:3001",
"networkNodes": []
}

console.log('Valid => ', bitcoin.chainIsValid(btc_validation.chain));


/* hash Test
const previousBlockHash = 'fdsgfdsg234234dfh324t432';
const currentBlockData = [
  {
    amount: 10,
    sender: 'afhrfedg24432t45hfdhfdhfds',
    recipient: 'hjtjhtreklwgvaw3254325',
  },
  {
    amount: 200,
    sender: 'fhrfedg24432t45hfdhfdhfds',
    recipient: 'hjtjhtreklwgvaw3254325',

  },
  {
    amount: 500,
    sender: 'fhrfedg24432t45hfdhfdhfds',
    recipient: 'hjtjhtreklwgvaw3254325',
  }
];

const nonce = 100;
console.log(bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce));
*/

/* pow Test
const powHash = bitcoin.proofOfWork(previousBlockHash, currentBlockData);
console.log(powHash)

const hashNonce = bitcoin.hashBlock(previousBlockHash, currentBlockData, 88521) 
console.log('hashNonce ', hashNonce);

// const result = bitcoin.hashBlock(previousBlockHash, currentBlockData, nonce);
// console.log(result);
*/

/* 
bitcoin.createNewBlock(1324,'genesisBlock', 'gdsgwg1234');

bitcoin.createNewTransaction(
  100,
  'jamesewrtweqtrw1124sdgdsag',
  'lyn23432sfdgdsfgwqgg245tr42',
);

bitcoin.createNewBlock(54325, 'erhr3ehwer', 'herhergr31243');

bitcoin.createNewTransaction(
  200,
  'jamesewrtweqtrw1124sdgdsag',
  'lyn23432sfdgdsfgwqgg245tr42',
)
bitcoin.createNewTransaction(
  500,
  'jamesewrtweqtrw1124sdgdsag',
  'lyn23432sfdgdsfgwqgg245tr42',
)
bitcoin.createNewTransaction(
  10000,
  'jamesewrtweqtrw1124sdgdsag',
  'lyn23432sfdgdsfgwqgg245tr42',
)

bitcoin.createNewBlock(6326436, 'erwgherhg2345rr', 'eheghbddsfs65765');

console.log(bitcoin);
*/
