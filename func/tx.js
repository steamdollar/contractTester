const ethers = require("ethers");

class makeTx {
        txConfig;
        configs;
        signer;
        provider;

        constructor(txConfig, configs) {
                this.txConfig = txConfig;
                this.configs = configs;
        }

        async getNonce() {
                const nonce = await this.configs.provider.getTransactionCount(
                        this.configs.signer.address
                );
                return nonce;
        }

        async sendTxAndWait() {
                const nonce = await this.getNonce();
                console.log(nonce)

                this.txConfig.nonce = nonce;

                const tx = await this.configs.signer.sendTransaction(
                        this.txConfig
                );
                console.log(`waiting for tx to be included...`);

                await tx.wait();
                console.log(`Tx sent : ${tx.hash}`);
        }

        async sendTxs(txNum) {
                const nonce = await this.getNonce();

                for (let i = nonce; i < nonce + txNum; i++) {
                        const txConfig = {
                                nonce: i,
                                to: "0xaca8126914b246634b08d4f9fdf31a1970ed9005",
                                value: ethers.parseEther(`${(i + 1) / 100}`),
                                gasPrice: ethers.parseUnits(
                                        `${10 * i + 1}`,
                                        "gwei"
                                ),
                                chainId: this.configs.chainId,
                        };

                        const tx = await this.configs.signer.sendTransaction(
                                txConfig
                        );

                        console.log(tx.hash);
                }
        }
}

module.exports = { makeTx };
