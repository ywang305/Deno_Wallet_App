const Web3 = require('web3');

const web3 = new Web3(process.env.WEB3_ADDRESS);

const { accounts, wallet, contract } = web3.eth;
const { utils } = web3;

module.exports = { web3, accounts, wallet, contract, utils };
