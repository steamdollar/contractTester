const ethers = require("ethers");
const fs = require("fs");

class CounterContract {
        contractJSON;
        abi;
        bytecode;
        signer;
        contractFactory;
        contract;
        contractSigner;
        ca;

        // "./artifacts/contracts/counter.sol/Counter.json"
        constructor(filepath, signer, provider) {
                this.contractJSON = require(filepath);
                this.abi = this.contractJSON.abi;
                this.bytecode = this.contractJSON.bytecode;
                this.signer = signer;
                // this.provider = provider;

                if (fs.readFileSync("./ca.txt")) {
                        this.ca = fs.readFileSync("./ca.txt").toString("utf8");
                }

                this.newContractFactory();
        }

        newContractFactory() {
                this.contractFactory ??= new ethers.ContractFactory(
                        this.abi,
                        this.bytecode,
                        this.signer
                );
        }

        newContractInstance() {
                this.contract ??= new ethers.Contract(
                        this.ca,
                        this.abi,
                        this.signer
                );
        }

        // newContractSigner(signer) {
        //         this.contractSigner ??= new ethers.Contract(
        //                 this.ca,
        //                 this.abi,
        //                 signer
        //         );
        // }

        async contractDeploy() {
                const contract = await this.contractFactory.deploy(2);
                await contract.deployed();

                console.log(`ca : ${contract.address}`);
                this.ca = contract.address;

                fs.writeFile("ca.txt", this.ca, (err) => {
                        if (err) throw err;
                        console.log("ca saved to ca.txt");
                });
        }

        async printInitialNumber() {
                this.newContractInstance();
                const initialNumber = await this.contract.showNum();
                console.log(`initial number : ${initialNumber}`);
        }

        async getCurrentNum() {
                this.contract ??= new ethers.Contract(
                        this.ca,
                        this.abi,
                        this.signer
                );
                const currentNumber = await this.contract.showNum();
                console.log(`current number : ${currentNumber}`);
        }

        async decreaseNum() {
                this.contract ??= new ethers.Contract(
                        this.ca,
                        this.abi,
                        this.signer
                );

                const tx = await this.contract.decrease();
                await tx.wait();
                this.getCurrentNum();
        }
}

module.exports = { CounterContract };
