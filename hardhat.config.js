require("@nomicfoundation/hardhat-toolbox");

const walletsInfo = require("./utils/wallet.js").wallet;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
        solidity: "0.8.20",
        networks: {
                hardhat: {},
                localhost: {
                        url: "http://192.168.0.170:8545",
                        accounts: [walletsInfo.w1.private],
                },
                // goerli: {
                //     url: `https://eth-goerli.g.alchemy.com/v2/8HuCBo-ySB0aMfjxfZia__bD8CYLY7km`,
                //     accounts: [''],
                // },
        },
};

// npm outdated
// npm install --save-dev ethers@latest
// npm install --save-dev @nomicfoundation/hardhat-toolbox@latest
// npm install --save-dev hardhat
// npx hardhat compile
