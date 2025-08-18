const fs = require("fs");

const readStream = fs.createReadStream("bigfile.txt", "utf-8");

readStream.on("data", (chunk) => {
    console.log("Receive chunk data - ", chunk);
})

readStream.on("end", () => {
    console.log("Finished reading file");
})
