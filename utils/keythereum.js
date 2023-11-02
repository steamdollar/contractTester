const keythereum = require("keythereum");

const datadir = "/home/lsj/eth/hardhat/keys";

let keyobj = keythereum.importFromFile(
        "0x1d61b265007c71bde64ea2858bc31ece265c1e42",
        datadir
);

let pk = keythereum.recover(Buffer.from("1234"), keyobj);
console.log(pk.toString("hex"));
