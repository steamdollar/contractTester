const arg = process.argv[2];
const txNum = parseInt(process.argv[3]);
const fs = require("fs");

const ethers = require("ethers");
const { CounterContract } = require("./Counter");
const { ixconfig } = require("./config.js");
const { makeTx } = require("./func/tx");
const { DeployContract } = require("./deploy");
const { ERC20Contract } = require("./erc20");

const { w1, w2, w3 } = require("./utils/wallet").wallet;

const configs = new ixconfig(w1.private);

const myCounterContract = new CounterContract(
        "./artifacts/contracts/counter.sol/Counter.json",
        configs
);

// 1. balance
const getBalance = async () => {
        const balance = await configs.provider.getBalance(w3.public);
        console.log(ethers.formatEther(balance));
};

// 2. tx
const sendTx = async () => {
        const txConfig = {
                to: w2.public,
                value: ethers.parseEther("12"),
                gasPrice: ethers.parseUnits("30", "gwei"),
                chainId: configs.chainId,
                nonce: null,
        };

        const txObj = new makeTx(txConfig, configs);
        txObj.sendTxAndWait();
};

// 2.1 txs
const sendTxs = async () => {
        const txObj = new makeTx(null, configs);
        await txObj.sendTxs(txNum);
};

const main = async () => {
        switch (arg) {
                case "balance":
                        getBalance();
                        break;
                case "sendTx":
                        sendTx();
                        break;
                case "sendTxs":
                        sendTxs();
                        break;
                // simple contract
                case "deploy":
                        await myCounterContract.contractDeploy();
                        break;
                case "getNum":
                        const curNum = await myCounterContract.getCurrentNum();
                        console.log(curNum);
                        break;
                case "mani":
                        await myCounterContract.manipulateNum(process.argv[3]);
                        break;

                // erc20 token
                case "erc20":
                        const deployer = new DeployContract(
                                configs.filepath + "myToken.sol/MyToken.json",
                                configs
                        );
                        await deployer.contractDeploy(
                                ethers.parseEther("10000")
                        );
                        break;
                case "tokenSend":
                        const erc20contract = new ERC20Contract(
                                configs.filepath + "myToken.sol/MyToken.json",
                                configs
                        );

                        await erc20contract.transfer(w2.public, "10");

                        break;

                // erc 721 deploy
                case "erc721":
                        const erc721Contract = new DeployContract(
                                configs.filepath + "MyNFT.sol/MyToken.json",
                                configs
                        );

                        await erc721Contract.contractDeploy(w1.public);
                        break;

                case "nftMint":
                // const

                default:
                        console.log("specify functions");
                        console.log("1. balance");
                        console.log("2. SendTx");
                        console.log("3. SendTxs n");
                        console.log("4. deploy");
                        console.log("5. getNum");
                        console.log("6. mani i/d");
        }
};

main();
