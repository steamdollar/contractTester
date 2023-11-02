const fs = require("fs");

const readShit = () => {
        const data = fs.readFileSync("./ca.txt");
        console.log(data);
        return data.toString("utf8");
};

const check = (caData) => {
        if (caData) {
                console.log(caData);
        } else {
                console.log("bbbb");
        }
};

const caData = readShit();
check(caData);
