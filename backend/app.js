
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const Blockchain = require("./blockchain/blockchain");
const transactionRoutes = require("./routes/transaction");
const mineRoutes = require("./routes/mine");

const app = express();
const PORT = process.env.PORT || 3000;

// Load user keys from file 
const configPath = path.join(__dirname, "keys", `user${PORT - 2999}.json`);
if (!fs.existsSync(configPath)) {
  console.error("Key file not found:", configPath);
  process.exit(1);
}
const userKeys = JSON.parse(fs.readFileSync(configPath));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    publicKey: userKeys.publicKey,
    privateKey: userKeys.privateKey,
  };
  next();
});

// Blockchain instance
app.locals.blockchain = new Blockchain();

// Routes
app.use("/transaction", transactionRoutes);
app.use("/mine", mineRoutes);

// Server Start
app.listen(PORT, () => {
  console.log(` Node running on port ${PORT}`);
});
