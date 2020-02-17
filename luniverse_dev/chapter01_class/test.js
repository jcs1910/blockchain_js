const Blockchain = require('./6.proofOfWork.js');
const bitcoin = new Blockchain();

const parentHash = 'dsrahsrfagh3245321';
const currentBlockData = [
  {
    amount: 1000,
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

const nonce = bitcoin.pow(parentHash, currentBlockData);
console.log(nonce);
