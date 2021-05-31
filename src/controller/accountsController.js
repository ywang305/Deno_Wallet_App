const express = require('express');
const router = express.Router();
const {
    createAccts,
    decrypt,
    getEthBalance,
} = require('../service/accountsService');

/*
@return privateKey or keystoreJson
*/
router.post('/accounts', async (req, res, next) => {
    const { number = 0, password } = req.body;

    const accts = createAccts(Number(number), password);
    res.json(accts);
});

router.post('/accounts/decrypt/:password', async (req, res) => {
    const keystoreJson = req.body;
    const { password } = req.params;
    const { address, privateKey } = decrypt(keystoreJson, password);
    res.json({ address, privateKey });
});

router.get('/accounts/eth-balance/:address', async (req, res) => {
    const { address, coin } = req.params;
    const balance = await getEthBalance(address, coin);
    return res.json({ balance });
});

module.exports = router;
