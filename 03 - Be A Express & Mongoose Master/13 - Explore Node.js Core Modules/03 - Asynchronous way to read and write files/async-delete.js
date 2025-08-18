const fs = require("fs");

fs.unlink("main.js", (err) => {
    if (err) {
        console.log("Error occurs while deleting the file.");
        return
    }
    console.log("File delete successfully.");
});