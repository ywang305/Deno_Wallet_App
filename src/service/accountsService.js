const { web3, accounts, utils, contract } = require('../config/web3');

function createAccts(numberOfAccts = 0, password = null) {
    return Array.from({ length: numberOfAccts }, () => {
        let acct = accounts.create();
        //加密私钥
        if (password) {
            acct = encrypt(ç.privateKey, password);
        }
        return acct;
    });
}

function createAcct() {
    return accounts.create();
}

function encryptToAcctKeyStore(acct, password = '') {
    const keystoreJson = accounts.encrypt(acct.privateKey, password);
    return keystoreJson;
}

function encrypt(privateKey, password) {
    const keystoreJson = accounts.encrypt(privateKey, password);
    return keystoreJson;
}

function decryptFromAcctKeyStore(keystoreJson, password) {
    const { address, privateKey } = accounts.decrypt(keystoreJson, password);
    return { address, privateKey };
}

// only for ETH
async function getEthBalance(address) {
    const balance = await web3.eth.getBalance(address);
    return utils.fromWei(balance, 'ether');
}

module.exports = {
    createAcct,
    encryptToAcctKeyStore,
    decryptFromAcctKeyStore,
    getEthBalance,
};
