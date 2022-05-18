const path = require("path"); //para acceder
const fs = require("fs"); //para leer
const solc = require("solc"); // para compilar en bite code

const ERC20 = path.join(__dirname, "../ERC20Basic.sol");
const code = fs.readFileSync(ERC20, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "ERC20Basic.sol": {
      content: code,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

console.log(output);

module.exports = {
  abi: output.contracts['ERC20Basic.sol'].ERC20Basic.abi,
  bytecode: output.contracts['ERC20Basic.sol'].ERC20Basic.evm.bytecode.object,
};
