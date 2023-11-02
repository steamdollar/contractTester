// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
        // const DepositContract = await hre.ethers.getContractFactory(
        //         "DepositContract"
        // );
        // const depositContract = await DepositContract.deploy();
        // await depositContract.deployed();
        // console.log("deposit contract deployed");
        //
        const initialNum = 2;
        const CounterContract = await hre.ethers.getContractFactory("Counter");
        const counterContract = await CounterContract.deploy(initialNum);
        await counterContract.deployed();
        console.log("counter contract deployed");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
        console.error(error);
        process.exitCode = 1;
});

// npx hardhat run scripts/deploy.js --network localhost
