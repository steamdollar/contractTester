const keythereum = require("keythereum");

const getPk = (
        publicKey,
        datadir = "/home/lsj/eth/hardhat/keys",
        pw = "1234"
) => {
        let keyobj = keythereum.importFromFile(publicKey, datadir);

        let pk = keythereum.recover(Buffer.from(pw), keyobj);
        console.log("pk : ", pk.toString("hex"));
        return pk;
};

const wallet = {
        w1: {
                private: "97aab27a6f4ec78f190fa53562e8b1ef511452b38debc600daf908a4f2b9b3e1",
                public: "0x1d61b265007c71bde64ea2858bc31ece265c1e42",
        },
        w2: {
                private: "c0065e1f826cf3126ce244a0087b903537b68f34906495e7f1fb90962335b4de",
                public: "0xaca8126914b246634b08d4f9fdf31a1970ed9005",
        },
        w3: {
                private: "e142a25ded2d68fd6456b91d990c828a021031ad402720568a01671e24aa19dd",
                public: "0xb56f4cbecc4c2c705b101432cbfa65176561ac86",
        },
};

module.exports = { getPk, wallet };

// const main = () => {
//         getPk("0xb56f4cbecc4c2c705b101432cbfa65176561ac86");
// };

// main();
