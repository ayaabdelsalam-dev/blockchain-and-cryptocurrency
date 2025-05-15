

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Blockchain = require('../blockchain/blockchain');


const chain = new Blockchain();

router.get('/', (req, res) => {
  const block = chain.mineBlock();
  res.json({ message: 'New block mined successfully', block });
});




let blockchain;
const chainFile = path.join(__dirname, '../data/chain.json');

if (fs.existsSync(chainFile)) {
  const data = JSON.parse(fs.readFileSync(chainFile));
  blockchain = new Blockchain(data.chain, data.pendingTransactions);
} else {
  blockchain = new Blockchain();
}

// تعدين بلوك جديد
router.post('/', (req, res) => {
  const { minerAddress } = req.body;

  if (!minerAddress) {
    return res.status(400).json({ error: 'Miner address is required' });
  }

  const newBlock = blockchain.mineBlock(minerAddress);

  // حفظ السلسلة بعد التعديل
  fs.writeFileSync(chainFile, JSON.stringify({
    chain: blockchain.chain,
    pendingTransactions: blockchain.pendingTransactions
  }, null, 2));

  res.json({ message: 'Block mined successfully', block: newBlock });
});

module.exports = router;
