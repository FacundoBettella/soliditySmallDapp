const { default: Web3 } = require("web3");

const addressContract = "0xcec302B84097Dca78f362fe259Af00fA4Db1A528";

const abi = [
  {
    inputs: [{ internalType: "string", name: "name_", type: "string" }],
  },
];
//necesary to web3 comunication.

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false,
});

let web3;
let account;
let ICOIN;

function init() {
  // metamask create ethereum object.
  if (typeof window.ethereum !== "undefined") {
    const metamaskBtn = document.getElementById("enableEthereumButton");
    metamaskBtn.classList.remove("d-none");

    metamaskBtn.addEventListener("click", async () => {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      account = accounts[0];

      metamaskBtn.classList.add("d-none");
      document.getElementById("accountSelected").innerHTML = account;
      document.getElementById("accountSelected").classList.add("border");

      Toast.fire({
        icon: "success",
        title: "Cuenta conectada",
      });

      detectChangeAccount();
      contract();

      document.getElementById("login").style.display = "none";
      document.getElementById("main").classList.remove("d-none");
    });
  }
}

function detectChangeAccount() {
  window.ethereum.on("accountsChanged", function (accounts) {
    console.log(accounts);
    account = accounts[0];
    document.getElementById("accountSelected").innerHTML = account;

    Toast.fire({
      icon: "success",
      title: "Cuenta conectada",
    });
  });
}

function contract() {
  web3 = new Web3(window.ethereum);
  ICOIN = new web3.eth.Contract(abi, addressContract);

  interact();
}

function interact() {
  const btnGetBalance = document.getElementById("btnGetBalance");
  btnGetBalance.addEventListener("click", () => {
    const address = document.getElementById("addressGetBalance");
    const value = address.value;

    ICOIN.methods
      .balanceOf(value)
      .call()
      .then((res) => {
        const amount = web3.utils.fromWei(res, "ether");
        const valueSpan = document.getElementById("balance");
        valueSpan.innerHTML = amount;
      });
  });

  const transfer = document.getElementById("transferir");
  transfer.addEventListener("click", () => {
    const address = document.getElementById("addressBenefiaria");
    const addressValue = address.value;

    const amount = document.getElementById("cantidad");
    const amountString = amount.value.toString();
    const amountTransfer = web3.utils.toWei(amountString, "ether");

    ICOIN.methods
      .transfer(addressValue, amountString)
      .send({ from: account })
      .then((res) => {
        address.value = "";
        amount.value = 0;

        Toast.fire({
          icon: "success",
          title: "Transferencia realizada",
        });
      });
  });
}

window.onload = init();
