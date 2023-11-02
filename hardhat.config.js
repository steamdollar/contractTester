require("@nomicfoundation/hardhat-toolbox");

const walletsInfo = require("./wallet.js").wallet;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
        solidity: "0.8.9",
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

// npm install --save-dev hardhat
// npx hardhat compile
