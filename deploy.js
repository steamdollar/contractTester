const ethers = require("ethers");

class Deploy {
        contractJSON;
        signer;
        provider;
        contractFactory;
        contract;

        constructor(filepath, configs) {
                this.contractJSON = require(filepath);
                this.signer = configs.signer;
                this.provider = configs.provider;
                this.createContractFactory();
        }

        createContractFactory() {
                this.contractFactory ??= new ethers.ContractFactory(
                        this.contractJSON.abi,
                        this.contractJSON.bytecode,
                        this.signer
                );
        }

        async contractDeploy(...initVar) {
                this.createContractFactory();
                const contract = await this.contractFactory.deploy(...initVar);

                console.log(`ca : ${contract.target}`);
                const deployed = await contract.waitForDeployment();
        }
}

module.exports = { Deploy };
