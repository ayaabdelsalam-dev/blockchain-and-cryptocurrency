// keys.js


const receiverSelect = document.getElementById("receiverSelect");
const nodeSelect = document.getElementById("nodeSelect");

const users = [
  { name: "User 1", url: "http://localhost:3000" },
  { name: "User 2", url: "http://localhost:3001" },
  { name: "User 3", url: "http://localhost:3002" },
  { name: "User 4", url: "http://localhost:3003" },
  { name: "User 5", url: "http://localhost:3004" },
  { name: "User 6", url: "http://localhost:3005" },
];


function updateReceivers() {
  const currentNode = nodeSelect.value;
  receiverSelect.innerHTML = "";

  users.forEach(user => {
    if (user.url !== currentNode) {
      const option = document.createElement("option");
      option.value = user.url;
      option.textContent = user.name + " (" + user.url + ")";
      receiverSelect.appendChild(option);
    }
  });
}


nodeSelect.addEventListener("change", updateReceivers);


updateReceivers();




const usersKeys = {
    1: {
      publicKey: `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtT0WjS13x4v2kM4XyrOx
  VWqLB33Qtx0DY6M8NWvI6bo3VZsb+lcTIYgrdzB8EztNq0FMCPeHULpMf+a5d1vH
  JavzEda4bE3No8gN2Rt0klDk3NbeI+2BksU2FDDftmKY0aY6aWH9K6oHjZPH31z7
  ArGhTBCVv4nE5Ey6Rna1odKq5fUObuhyM6C1VJeJrBlQKL9gHuPb08eUvM8XtR3g
  PuvBqML4q4+RKw0Q9gE1AiHntA4MH0XkqpKX2qZEXfl/1rQdcPRdkE6BiZlVZC9Z
  DHPJZZ45IEuwA3yoqv7YYKdDGcwhLXM6TGZe8OMJ+YMG2Do5obJYZ86VrhOXWwID
  AQAB
  -----END PUBLIC KEY-----`,
      privateKey: `-----BEGIN RSA PRIVATE KEY-----
  MIIEpAIBAAKCAQEAtT0WjS13x4v2kM4XyrOxVWqLB33Qtx0DY6M8NWvI6bo3VZsb
  +lcTIYgrdzB8EztNq0FMCPeHULpMf+a5d1vHJavzEda4bE3No8gN2Rt0klDk3Nbe
  I+2BksU2FDDftmKY0aY6aWH9K6oHjZPH31z7ArGhTBCVv4nE5Ey6Rna1odKq5fUO
  buhyM6C1VJeJrBlQKL9gHuPb08eUvM8XtR3gPuvBqML4q4+RKw0Q9gE1AiHntA4M
  H0XkqpKX2qZEXfl/1rQdcPRdkE6BiZlVZC9ZDHPJZZ45IEuwA3yoqv7YYKdDGcwh
  LXM6TGZe8OMJ+YMG2Do5obJYZ86VrhOXWwIDAQABAoIBAC0eQzg9h8z74rIkYk0d
  ...
  -----END RSA PRIVATE KEY-----`
    },
    
  };
  
  function getPrivateKey(userId) {
    return usersKeys[userId]?.privateKey || '';
  }
  
  function getPublicKey(userId) {
    return usersKeys[userId]?.publicKey || '';
  }
  