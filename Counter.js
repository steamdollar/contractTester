const ethers = require("ethers");
const fs = require("fs");

class CounterContract {
        contractJSON;
        provider;
        signer;
        contractFactory;
        contract;
        ca;

        constructor(filepath, signer) {
                this.contractJSON = require(filepath);
                this.signer = signer;

                if (fs.readFileSync("./ca.txt")) {
                        this.ca = fs.readFileSync("./ca.txt").toString("utf8");
                }
        }

        newContractFactory() {
                this.contractFactory ??= new ethers.ContractFactory(
                        this.contractJSON.abi,
                        this.contractJSON.bytecode,
                        this.signer
                );
        }

        newContractInstance() {
                this.contract ??= new ethers.Contract(
                        this.ca,
                        this.contractJSON.abi,
                        this.signer
                );
        }

        async contractDeploy() {
                this.newContractFactory();
                const contract = await this.contractFactory.deploy(2);
                await contract.deployed();

                console.log(`ca : ${contract.address}`);
                this.ca = contract.address;

                fs.writeFileSync("ca.txt", this.ca, (err) => {
                        if (err) throw err;
                        console.log("ca saved to ca.txt");
                });

                this.printInitialNumber();
        }

        async printInitialNumber() {
                this.newContractInstance();
                const initialNumber = await this.contract.showNum();
                console.log(`initial number : ${initialNumber}`);
        }

        async getCurrentNum() {
                this.newContractInstance();
                const currentNumber = await this.contract.showNum();
                console.log(`current number : ${currentNumber}`);
        }

        async manipulateNum(control) {
                this.newContractInstance();

                let tx;

                if (control === "i") {
                        tx = await this.contract.increase();
                } else if (control === "d") {
                        tx = await this.contract.decrease();
                } else {
                        console.log("i or d only");
                        return;
                }

                await tx.wait();
                this.getCurrentNum();
        }
}

module.exports = { CounterContract };
