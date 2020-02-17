const Blockchain = require('./Blockchain');

const bitcoin = new Blockchain();

/* Consensus Test
const btc_validation = 
 


console.log('Valid => ', bitcoin.chainIsValid(btc_validation.chain));
*/

///* hash Test

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
