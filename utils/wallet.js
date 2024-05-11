const keythereum = require("keythereum");

const getPk = (
        publicKey,
        datadir = "../keys",
        pw = "1234"
) => {
        let keyobj = keythereum.importFromFile(publicKey, datadir);

        let pk = keythereum.recover(Buffer.from(pw), keyobj);
        console.log("pk : ", pk.toString("hex"));
        return pk;
};

const wallet = {
        w1: {
                private: "5bb4f24546981bfcbe5573bf23351a6d06d3e23a01f2f3257b6486492ad73ee7",
                public: "0xed33a15de74827eff973a1967db3320359d9e215",
        },
        w2: {
                private: "93fff6e82529fae9965b69784d5c3366ffdbc5d6f078c1d862b2c203bc4d74fe",
                public: "0x20a511d8df9a9127a46a252c4f21940105b42dd8",
        },
        w3: {
                private: "e74a08b2ade51d0857f23ef7f3b20a336e84a83938122dec82566dd5003ebb2c",
                public: "0x2dee553cd7947d2062ccd5c6014b3e75f6ff994c",
        },
};

module.exports = { getPk, wallet };

// const main = () => {
//         getPk("0x2dee553cd7947d2062ccd5c6014b3e75f6ff994c");
// };

// main();
