// generateKeys.js
const fs = require('fs');
const crypto = require('crypto');

// عدد المستخدمين
const NUM_USERS = 6;

const users = {};

for (let i = 1; i <= NUM_USERS; i++) {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });

  users[`user${i}`] = {
    publicKey,
    privateKey
  };
}

// حفظ المفاتيح في ملف users.json
fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf-8');
console.log('✅ users.json file created with keys for 6 users.');
