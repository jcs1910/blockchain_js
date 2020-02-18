const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();




/*
const parentHash = 'dsrahsrfagh3245321';
const currentBlockData = [
  {
    amount: 100,
    sender: 'jarryadshreastt4324',
    recipient: 'luniverse2wreagr3q543',
  },
  {
    amount: 500,
    sender: 'jarryadshreastt4324',
    recipient: 'upbitdfgafdswreagr3q543',
  },
  {
    amount: 1000,
    sender: 'jarryadshreastt4324',
    recipient: 'lambdaaesdg2wreagr3q5431',
  },
];

const result = bitcoin.pow(parentHash, currentBlockData);
console.log(result);
*/

/* hashBlock 메서드 테스트 
const parentHash = 'dsrahsrfagh3245321';
const currentBlockData = [
  {
    amount: 100,
    sender: 'jarryadshreastt4324',
    recipient: 'luniverse2wreagr3q543',
  },
  {
    amount: 500,
    sender: 'jarryadshreastt4324',
    recipient: 'upbitdfgafdswreagr3q543',
  },
  {
    amount: 1000,
    sender: 'jarryadshreastt4324',
    recipient: 'lambdaaesdg2wreagr3q5431',
  },
];
const nonce = 3000;

const hashBlock = bitcoin.hashBlock(parentHash, currentBlockData, nonce)
console.log(hashBlock);
*/


/* Transaction 이 block에 추가되는 지 확인하는 테스트 
const Blockchain = require('./blockchain');
const bitcoin = new Blockchain();

bitcoin.createNewBlock('hedfhgfda23432', 'dahfedahadasdf213123', 200)

bitcoin.createNewTx(100, 'luniverserwergfrewg43232', 'upbitdsagfrew4325432')

bitcoin.createNewBlock('hrafedghfdaghwet2234', 'sfghfdsagsa2343', 4000)

console.log(bitcoin);
console.log(bitcoin.chain[2])
*/

/*
const Blockchain = require('./blockchain');

const bitcoin = new Blockchain();


bitcoin.createNewBlock('drfsghdrfeah32432', 'hefdasgasg1231231', 1000);
bitcoin.createNewBlock('luniverserfsghdrfeah32432', 'abchefdasgasg1231231', 500);
bitcoin.createNewBlock('bitcoindrfsghdrfeah32432', 'defhefdasgasg1231231', 100);

bitcoin.createNewTransaction(500, 'luniverse23rt432fweg345', 'upbitdfbfedaagraet234523');
  
console.log(bitcoin)

const result = bitcoin.createNewBlock('rdhfdghfdgde', 'dfhbfdgfdg3fdg', 40);

console.log(bitcoin.chain[4])

*/

/*
const parentHash = 'fsdret3425sdgsdg'
const currentBlockData = [
  {
    amount: 10,
    sender: 'fdbfdgbfdg3at423',
    recipient: 'gfhjgds3eyer234df',
  },
  {
    amount: 100,
    sender: 'abcfdbfdgbfdg3at423',
    recipient: 'abcgfhjgds3eyer234df',
  },
  {
    amount: 500,
    sender: 'qwerfdbfdgbfdg3at423',
    recipient: 'qwergfhjgds3eyer234df',
  },
]
const nonce = 100;

const hashBlock = bitcoin.hashBlock(parentHash, currentBlockData, nonce);
console.log(hashBlock);
*/
