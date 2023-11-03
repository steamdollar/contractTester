const ethers = require("ethers");

class makeTx {
        txConfig;
        signer;
        provider;

        constructor(txConfig, configs) {
                this.txConfig = txConfig;
                this.signer = configs.signer;
                this.provider = configs.provider;
        }

        async getNonce() {
                const nonce = await this.provider.getTransactionCount(
                        this.signer.address
                );
                return nonce;
        }

        async sendTx() {
                const nonce = await this.getNonce();

                this.txConfig.nonce = nonce;

                const tx = await this.signer.sendTransaction(this.txConfig);
                console.log(`waiting for tx to be included...`);

                await tx.wait();
                console.log(`Tx sent : ${tx.hash}`);
        }
}

module.exports = { makeTx };
