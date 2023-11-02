// 3. contract deploy
const deployContract = async () => {
        const contractJSON = require("../artifacts/contracts/deposit_contract.sol/DepositContract.json");
        const abi = contractJSON.abi;
        const bytecode = contractJSON.bytecode;

        const contractFactory = new ethers.ContractFactory(
                abi,
                bytecode,
                signer
        );
        const contract = await contractFactory.deploy();
        await contract.deployed();

        console.log(`ca : ${contract.address}`);

        fs.writeFile("ca.txt", contract.address.toString(), (err) => {
                if (err) throw err;
                console.log("ca saved to ca.txt");
        });

        // 이 안에 있는 함수를 사용할 수 있다. contractInstance.deposit 처럼..
        const contractInstance = new ethers.Contract(
                contract.address,
                abi,
                provider
        );
        const depositReq = await contractInstance.get_deposit_count();
        console.log(`deposit count : ${depositReq}`);
};

// 4. call contract (not modifying state)
const callContract = async () => {
        const contractJSON = require("../artifacts/contracts/deposit_contract.sol/DepositContract.json");
        const abi = contractJSON.abi;
        const bytecode = contractJSON.bytecode;

        const ca = readCa("ca.txt");

        const contractInstance = new ethers.Contract(ca, abi, provider);
        const depositReq = await contractInstance.get_deposit_count();
        console.log(`deposit count : ${depositReq}`);
};

// 5. ix w/ contract (modifying state)
const depositEther = async () => {
        const nonce = await provider.getTransactionCount(
                "0x1D61b265007c71BDE64ea2858bc31ECe265c1e42"
        );

        const contractJSON = require("../artifacts/contracts/deposit_contract.sol/DepositContract.json");
        const abi = contractJSON.abi;

        const ca = readCa("ca.txt");

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
