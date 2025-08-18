const fs = require("fs");

fs.writeFile("example.txt", "Hello Node.js", (err) => {
    if (err) {
        console.log("Error writing file", err);
        return;
    }
    console.log("Successfully written the file");
});


fs.appendFile("example.txt", "\nThis is an append line.", (err) => {
    if (err) {
        console.log("Error append file", err);
        return;
    }
    console.log("Successfully append the file");
})