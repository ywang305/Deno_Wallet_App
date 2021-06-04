const express = require('express');
const router = express.Router();
const {
    createAcct,
    encryptToAcctKeyStore,
    decryptFromAcctKeyStore,
    getEthBalance,
} = require('../service/accountsService');

/*
@return privateKey or keystoreJson
*/
router.post('/accounts', async (req, res, next) => {
    const { number = 0, password } = req.body;

    const accts = Array.from({ length: number }, () => {
        const acct = createAcct();
        return acct;
    });
    res.json(accts);
});

router.post('/keystores', async (req, res) => {
    const { number = 0, password } = req.body;
    const keyStores = Array.from({ length: number }, () => {
        const acct = createAcct();
        //加密私钥
        const keyStore = encryptToAcctKeyStore(acct, password);
        return keyStore;
    });
    res.json(keyStores);
});

router.post('/accounts/decrypt/:password', async (req, res) => {
    const keystoreJson = req.body;
    const { password } = req.params;
    const { address, privateKey } = decryptFromAcctKeyStore(
        keystoreJson,
        password
    );
    res.json({ address, privateKey });
});

router.get('/accounts/eth-balance/:address', async (req, res) => {
    const { address, coin } = req.params;
    const balance = await getEthBalance(address, coin);
    return res.json({ balance });
});

module.exports = router;
