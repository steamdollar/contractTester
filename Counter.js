const ethers = require("ethers");
const fs = require("fs");

class CounterContract {
        contractJSON;
        provider;
        signer;
        contractFactory;
        contract;
        ca;

        constructor(filepath, configs) {
                this.contractJSON = require(filepath);
                this.signer = configs.signer;
                this.provider = configs.provider;
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
                this.contract ??= new ethers.BaseContract(
                        this.ca,
                        this.contractJSON.abi,
                        this.signer
                );
        }

        async contractDeploy() {
                this.newContractFactory();

                const contract = await this.contractFactory.deploy(2);
                console.log(`ca : ${contract.target}`);

                const deployed = await contract.waitForDeployment();

                this.ca = deployed.target;

                // 배포 완료까지 기다리기

                fs.writeFileSync("ca.txt", this.ca, (err) => {
                        if (err) throw err;
                        console.log("ca saved to ca.txt");
                });

                const initNum = await this.getCurrentNum();
                console.log(`initial Number : ${initNum}`);
        }

        async getCurrentNum() {
                this.newContractInstance();
                const currentNumber = await this.contract.showNum();

                return Number(currentNumber);
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
                const curNum = await this.getCurrentNum();
                console.log(curNum);
        }
}

module.exports = { CounterContract };
