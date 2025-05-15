// sign.js

// This file handles signing transactions using the private key of the sender


async function signTransaction(tx, userId) {
    const privateKey = getPrivateKey(userId); // from keys.js
    
    const txString = JSON.stringify(tx);
  
    const encoder = new TextEncoder();
    const data = encoder.encode(txString);
  
    // Import the private key for signing
    const importedKey = await window.crypto.subtle.importKey(
      'pkcs8',
      str2ab(atob(privateKey)),
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256'
      },
      false,
      ['sign']
    );
  
    const signatureBuffer = await window.crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      importedKey,
      data
    );
  
    const signature = btoa(ab2str(signatureBuffer));
    return signature;
  }
  
  // Convert string to ArrayBuffer
  function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0; i < str.length; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
  
  // Convert ArrayBuffer to string
  function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  }
  