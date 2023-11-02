const ethers = require("ethers");
// const web3 = require('web3')

const pk = "e142a25ded2d68fd6456b91d990c828a021031ad402720568a01671e24aa19dd";
const pub = "0xb56f4cbecc4c2c705b101432cbfa65176561ac86";

const url = "http://192.168.0.170:9001";

const abi = require("../artifacts/contracts/deposit_contract.sol/DepositContract.json");

const ca = "0xc1b3d5aaaa0c302b86f52c5cd864e5fc375da3da";

/* 
        personal.sendTransaction({from : eth.coinbase, to : '0xb56f4cbecc4c2c705b101432cbfa65176561ac86', value : web3.toWei(1000, 'ether')}, '')
        personal.sendTransaction({from : eth.coinbase, to : '0xaca8126914b246634b08d4f9fdf31a1970ed9005', value : web3.toWei(1000, 'ether')}, '')
        const amount = ethers.utils.parseUnits('0.1')
    */

async function main() {
        const provider = new ethers.providers.JsonRpcProvider({ url });

        const signer = new ethers.Wallet(pk, provider);

        provider.getBalance(pub).then((balance) => {
                const balanceInEth = ethers.utils.formatEther(balance);
                console.log(balanceInEth);
        });

        const contract = new ethers.Contract(ca, abi.abi, signer);
        const qwe = await contract.get_deposit_count();
        console.log(`get_deposit_count :` + qwe);

        const qwe2 = await contract.get_deposit_root();
        console.log(`get_deposit_root : ` + qwe2);

        console.log(
                `eta to be active validator : ` +
                        (10 * 32 + 40 * 32) / 60 +
                        `min`
        );

        console.log(new Date().toUTCString());
}

main();
