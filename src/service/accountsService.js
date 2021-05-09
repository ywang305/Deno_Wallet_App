const { web3, accounts, utils, contract } = require('../config/web3');

function createAccts(numberOfAccts = 0, password = null) {
    return Array.from({ length: numberOfAccts }, () => {
        let acct = accounts.create();
        //加密私钥
        if (password) {
            acct = encrypt(acct.privateKey, password);
        }
        return acct;
    });
}

function encrypt(privateKey, password) {
    const keystoreJson = accounts.encrypt(privateKey, password);
    return keystoreJson;
}

function decrypt(keystoreJson, password) {
    const { address, privateKey } = accounts.decrypt(keystoreJson, password);
    return { address, privateKey };
}

// only for ETH
async function getEthBalance(address) {
    const balance = await web3.eth.getBalance(address);
    return utils.fromWei(balance, 'ether');
}

module.exports = { createAccts, decrypt, getEthBalance };
