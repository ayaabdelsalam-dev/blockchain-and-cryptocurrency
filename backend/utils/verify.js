// Function to verify the transaction signature

const crypto = require('crypto');

function verifyTransaction(tx, signature, publicKey) {
  const verifier = crypto.createVerify('SHA256');
  verifier.update(JSON.stringify(tx));
  verifier.end();
  return verifier.verify(publicKey, signature, 'base64');
}

module.exports = { verifyTransaction };


