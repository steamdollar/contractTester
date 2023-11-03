const ethers = require("ethers");

class Deploy {
        contractJSON;
        signer;
        contractFactory;
        contract;

        constructor(filepath, signer) {
                this.contractJSON = require(filepath);
                this.signer = signer;
                this.createContractFactory();
        }

        createContractFactory() {
                this.contractFactory ??= new ethers.ContractFactory(
                        this.contractJSON.abi,
                        this.contractJSON.bytecode,
                        this.signer
                );
        }

        async contractDeploy() {
                this.createContractFactory();
                const contract = await this.contractFactory.deploy(2);
                await contract.deployed();
        }
}
