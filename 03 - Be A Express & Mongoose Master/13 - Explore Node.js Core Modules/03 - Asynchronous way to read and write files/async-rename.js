const fs = require("fs");

fs.rename("hello-world.js", "main.js", (err) => {
    if (err) {
        console.error("Error renaming file:", err);
        return;
    }
    console.log("File renamed successfully!");
});