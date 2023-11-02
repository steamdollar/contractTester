const arg = process.argv[2];
const txNum = parseInt(process.argv[3]);
const fs = require("fs");

const ethers = require("ethers");
const { CounterContract } = require("./Counter");
const { ixconfig } = require("./config.js");

const { w1, w2, w3 } = require("./wallet").wallet;

const configs = new ixconfig(w1.private);

const myCounterContract = new CounterContract(
        "./artifacts/contracts/counter.sol/Counter.json",
        configs.signer,
        configs.provider
);

// 1. balance
const getBalance = async () => {
        const balance = await configs.provider.getBalance(w3.public);
        console.log(ethers.utils.formatEther(balance));
};

// 2. tx
const sendTx = async () => {
        const nonce = await configs.provider.getTransactionCount(w1.public);

        // 다음과 같이 tx 객체를 만들어 서명 후, 보내면 된다.
        const tx = {
                to: w2.public,
                value: ethers.utils.parseEther("12"),
                gasLimit: configs.gasLimit,
                gasPrice: ethers.utils.parseUnits("30", "gwei"),
                chainId: configs.chainId,
                nonce: nonce,
        };

        const signedTx = await configs.signer.signTransaction(tx);
        const txResponse = await configs.provider.sendTransaction(signedTx);
        console.log("Transaction sent:", txResponse.hash);

        // const txReceipt = await provider.getTransactionReceipt(txResponse.hash)
        // console.log(txReceipt)

        // 이건 tx가 컨펌되건 말건 상관없이 요청을 보내 응답을 가져오므로
        // 영수증이 null이 뜰 수가 있다.
        // 방금 보낸 tx를 받고 싶다면 위의 waitForTransaction method를 사용할 것.
};

// 2.1 txs
const sendTxs = async () => {
        // nonce 값은 tx 보내고 confirm되기 전까지 바뀌지 않는다.
        // 값이 업데이트 되기 전까지 시간이 걸리는데 연속적으로 tx를 보내려면
        const nonce = await configs.provider.getTransactionCount(w1.public);

        // 연속적으로 tx를 보내고 싶다면 다음과 같이 nonce값, gasprice를 증가시키며 반복
        for (let i = nonce; i < nonce + txNum; i++) {
                const tx = {
                        nonce: i,
                        to: w2.public,
                        value: ethers.utils.parseEther(`${(i + 1) / 100}`),
                        gasLimit: configs.gasLimit,
                        gasPrice: ethers.utils.parseUnits(
                                `${10 * i + 1}`,
                                "gwei"
                        ),
                        chainId: configs.chainId,
                };

                const signedTx = await configs.signer.signTransaction(tx);
                const txResponse = await configs.provider.sendTransaction(
                        signedTx
                );
                if (i % 200 == 0 || i == 999) {
                        console.log("Transaction sent:", txResponse.hash);
                }
        }
};

// 3. counter contract deploy
const deployContract = async () => {
        await myCounterContract.contractDeploy();
        await myCounterContract.printInitialNumber();
};

// 4. call contract (not modifying state)
const getCurrentNumber = async () => {
        await myCounterContract.getCurrentNum();
};

// 5. modify contract state
const decreaseNumber = async () => {
        await myCounterContract.decreaseNum();
};

// 이거 class로 바꾸자..

// 5. ix w/ contract (modifying state)
const depositEther = async () => {
        const nonce = await provider.getTransactionCount(
                "0x1D61b265007c71BDE64ea2858bc31ECe265c1e42"
        );

        const contractJSON = require("./artifacts/contracts/deposit_contract.sol/DepositContract.json");
        const abi = contractJSON.abi;

        const ca = configs.readCa("ca.txt");

        const contractInstance = new ethers.Contract(ca, abi, provider);

        const deposit_data = require("./deposit_data-1670987629.json");
        const dd = deposit_data[0];

        const bufferHex = (x) => Buffer.from(x, "hex");

        const params = [
                bufferHex(dd.pubkey),
                bufferHex(dd.withdrawal_credentials),
                bufferHex(dd.signature),
                bufferHex(dd.deposit_data_root),
        ];

        const data = contractInstance.interface.encodeFunctionData(
                "deposit",
                params
        );

        const tx = {
                nonce: nonce + 1,
                to: ca,
                value: ethers.utils.parseEther("32"),
                gasLimit: 210000,
                gasPrice: ethers.utils.parseUnits("30", "gwei"),
                chainId: 32382,
                data: data,
        };

        const signedTx = await signer.signTransaction(tx);
        const txResponse = await provider.sendTransaction(signedTx);
        console.log("Transaction sent:", txResponse.hash);

        const txReceipt = await provider.waitForTransaction(txResponse.hash);
        console.log(txReceipt);
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
                        deployContract();
                        break;
                case "getNum":
                        getCurrentNumber();
                        break;
                case "dec":
                        decreaseNumber();
                        break;
                default:
                        console.log("specify functions");
                        console.log("1. getBalance");
                        console.log("2. SendTx");
                        console.log("3. SendTxs");
                        console.log("4. deploy");
                        console.log("5. getNum");
                        console.log("6. dec");
        }
};

main();
