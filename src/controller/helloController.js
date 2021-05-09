const express = require('express');
const router = express.Router();

router.get('/hello', async (req, res, next) => {
    const { name } = req.query;
    res.json({ greeting: 'HELLO ' + (name.toUpperCase() ?? 'anonymous') });
});

module.exports = router;
