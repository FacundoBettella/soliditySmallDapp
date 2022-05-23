const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { abi, bytecode } = require("./compile");

// run ganache-cli, put here the new mnemonic and then npm run deploy.
const mnemonic =
  "stomach rack poem raise shove feature monkey piano hurdle egg father fee";
const provider = new HDWalletProvider(mnemonic, "http://localhost:8545");

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const argumentsConstructor = ["Igno Coin", "ICOIN", 18, 21000000];

  const gasEstimate = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: argumentsConstructor })
    .estimateGas({ from: accounts[0] });

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: argumentsConstructor })
    .send({ gas: gasEstimate, from: accounts[0] });

    console.log("Contract deployed to: ", result.options.address);
};
deploy();
// npm run deploy && result.options.address: Contract Address || In ganache-cli console we can found it below the transaction hash.
// Contract compiled in source solidity code and deployed in the blockchain.
// 0xcec302B84097Dca78f362fe259Af00fA4Db1A528