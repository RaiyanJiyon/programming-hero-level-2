const fs = require("fs");

fs.writeFileSync("example.txt", "Hello Node.js");

fs.appendFileSync("example.txt", "\nThis is an append text");

console.log("Filed written successfully");
