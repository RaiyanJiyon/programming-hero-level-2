const fs = require("fs");

fs.readFile("example.txt", "utf-8", (err, data) => {
    if (err) {
        console.log("Something error occurs while reading the file.");
        return;
    } 
    console.log("File contents - \n");
    console.log(data);
});