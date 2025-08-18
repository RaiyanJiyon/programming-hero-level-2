const fs = require("fs");

fs.renameSync("hello.txt", "rename.txt");

console.log("File rename complete");
