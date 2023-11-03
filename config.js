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
                this.provider = new ethers.JsonRpcProvider(this.chainRPC);
                this.wallet = new ethers.Wallet(pk, this.provider);
                this.signer = this.wallet.connect(this.provider);
        }
}

module.exports = { ixconfig };
