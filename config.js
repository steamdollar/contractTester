const ethers = require("ethers");

class ixconfig {
        chainRPC;
        provider;
        wallet;
        signer;
        chainId = 32382;
        gasLimit = 21000;

        constructor(pk) {
                this.chainRPC = "http://192.168.0.170:8545";
                this.provider = new ethers.providers.JsonRpcProvider(
                        this.chainRPC
                );
                this.wallet = new ethers.Wallet(pk, this.provider);
                this.signer = this.wallet.connect(this.provider);
        }

        async readCa(fileName) {
                try {
                        const ca = fs.readFileSync(fileName, "utf8");
                        return ca;
                } catch (e) {
                        console.error(e);
                }
        }
}

module.exports = { ixconfig };
