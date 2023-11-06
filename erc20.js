const ethers = require("ethers");

class ERC20 {
        contractJSO;
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

        // 이렇게 하는거 아닌것 같음..
        // 컨트랙트의 method를 사용하고 싶은데..
        async transfer(amount) {
                this.newContractInstance();
                const w1 = "0x1d61b265007c71bde64ea2858bc31ece265c1e42";
                const w2 = "0xaca8126914b246634b08d4f9fdf31a1970ed9005";

                // Transfer is not a function
                // const transfer = await this.contract.Transfer(w1, w2, 10);

                //console.log(transfer);
                const data = this.contract.interface.encodeFunctionData(
                        "transfer",
                        [w2, ethers.parseEther(amount)]
                );

                const tx = await this.signer.sendTransaction({
                        to: this.ca,
                        from: this.signer.address,
                        value: ethers.parseEther("0"),
                        data: data,
                });

                const receipt = await tx.wait();

                console.log(receipt);
        }
}

module.exports = { ERC20 };
