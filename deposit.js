const Web3 = require("web3");
const web3 = new Web3("http://192.168.0.170:8545");

const abi = require("./artifacts/contracts/deposit_contract.sol/DepositContract.json");
const ca = "0x6744399f1D767d932BF4855bFD8a02d8b4C41bfE";
const depositContract = new web3.eth.Contract(abi.abi, ca);

const deposit_data = require("./deposit_data-1670987629.json");
const dd = deposit_data[0];

/* 
  personal.sendTransaction({from : eth.coinbase, to : '0xb56f4cbecc4c2c705b101432cbfa65176561ac86', value : web3.toWei(1000, 'ether')}, '1234')
  personal.sendTransaction({from : eth.coinbase, to : '0x1d61b265007c71bde64ea2858bc31ece265c1e42', value : web3.toWei(1000, 'ether')}, '1234')
  const amount = ethers.utils.parseUnits('0.1')
*/

const acc = "0x1d61b265007c71bde64ea2858bc31ece265c1e42";
const pk = "97aab27a6f4ec78f190fa53562e8b1ef511452b38debc600daf908a4f2b9b3e1";

const acc1 = "0xaca8126914b246634b08d4f9fdf31a1970ed9005";
const pk1 = "c0065e1f826cf3126ce244a0087b903537b68f34906495e7f1fb90962335b4de";

const account = web3.eth.accounts.privateKeyToAccount(pk);

const account1 = web3.eth.accounts.privateKeyToAccount(pk1);

const bufferHex = (x) => Buffer.from(x, "hex");
const main = async () => {
        const tx = depositContract.methods.deposit(
                bufferHex(dd.pubkey),
                bufferHex(dd.withdrawal_credentials),
                bufferHex(dd.signature),
                bufferHex(dd.deposit_data_root)
        );

        const txs = [account, account1];

        for (let i = 0; i < txs.length; i++) {
                await txs[i].signTransaction(
                        {
                                chainId: "32382",
                                to: ca,
                                data: tx.encodeABI(),
                                value: web3.utils.toWei("32", "ether"),
                                gas: "215769",
                        },
                        (err, signedTx) => {
                                web3.eth
                                        .sendSignedTransaction(
                                                signedTx.rawTransaction
                                        )
                                        .on("receipt", (result) => {
                                                console.log(
                                                        "Sent deposit successfully in transaction",
                                                        result.transactionHash
                                                );
                                        });
                        }
                );
        }
};

main().then(console.log(new Date().toUTCString()));
console.log(Date.now());
