const arg = process.argv[2];
const txNum = parseInt(process.argv[3]);
const fs = require("fs");

const ethers = require("ethers");
const { CounterContract } = require("./Counter");
const { ixconfig } = require("./config.js");
const { makeTx } = require("./func/tx");

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
                gasLimit: configs.gasLimit,
                gasPrice: ethers.parseUnits("30", "gwei"),
                chainId: configs.chainId,
                nonce: null,
        };

        const txObj = new makeTx(txConfig, configs);
        txObj.sendTx();
};

// 2.1 txs
const sendTxs = async () => {
        // nonce 값은 tx 보내고 confirm되기 전까지 바뀌지 않는다.
        // 값이 업데이트 되기 전까지 시간이 걸리는데 연속적으로 tx를 보내려면
        const nonce = await configs.provider.getTransactionCount(w1.public);

        // 연속적으로 tx를 보내고 싶다면 다음과 같이 nonce값, gasprice를 증가시키며 반복
        for (let i = nonce; i < nonce + txNum; i++) {
                const txConfig = {
                        nonce: i,
                        to: w2.public,
                        value: ethers.parseEther(`${(i + 1) / 100}`),
                        gasLimit: configs.gasLimit,
                        gasPrice: ethers.parseUnits(`${10 * i + 1}`, "gwei"),
                        chainId: configs.chainId,
                };
                const tx = await configs.signer.sendTransaction(txConfig);

                console.log(tx.hash);
        }
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
                default:
                        console.log("specify functions");
                        console.log("1. getBalance");
                        console.log("2. SendTx");
                        console.log("3. SendTxs n");
                        console.log("4. deploy");
                        console.log("5. getNum");
                        console.log("6. dec i/d");
        }
};

main();
