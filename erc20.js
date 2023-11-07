const ethers = require("ethers");

class ERC20Contract {
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
                this.ca = "0x27b2DcD2326B0FdC87c63F48A60Ac86B9a99a947";
        }

        newContractInstance() {
                this.contract ??= new ethers.Contract(
                        this.ca,
                        this.contractJSON.abi,
                        this.signer
                );
        }

        async transfer(to, amount) {
                this.newContractInstance();
                const w2 = "0xaca8126914b246634b08d4f9fdf31a1970ed9005";

                const token = new ethers.Contract(
                        this.ca,
                        this.contractJSON.abi,
                        this.signer
                );

                await this.contract
                        .transfer(to, ethers.parseEther(amount))
                        .then((result) => {
                                console.log(result.hash);
                        })
                        .catch((e) => console.log(e));
        }
}

module.exports = { ERC20Contract };
