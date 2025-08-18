const fs = require("fs");

const writeStream = fs.createWriteStream("output.txt");

writeStream.write("Hello Node.js");
writeStream.write("\nI am trying to learn Node.js");
writeStream.write("\nI hope i can master Node.js");

writeStream.end();

console.log("Data written to file");
