
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { verifySignature } = require('../utils/verify');

module.exports = (blockchain, userKeys) => {
  router.post('/', (req, res) => {
    const { tx, signature, publicKey } = req.body;

    if (!tx || !signature || !publicKey) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const isValid = verifySignature(JSON.stringify(tx), signature, publicKey);
    if (isValid) {
      blockchain.addTransaction(tx);
      res.json({ success: true, message: 'Transaction added' });
    } else {
      res.status(400).json({ error: 'Invalid signature' });
    }
  });

  return router;
};
