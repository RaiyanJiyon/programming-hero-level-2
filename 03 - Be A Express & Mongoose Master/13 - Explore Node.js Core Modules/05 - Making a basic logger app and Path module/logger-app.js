const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "logs", "app.log");

if (!fs.existsSync(path.dirname(logFilePath))) {
    fs.mkdirSync(path.dirname(logFilePath), {recursive: true});
}

function logMessage(message) {
    const time = new Date().toISOString();
    const logEntry = `[${time}] ${message} \n`;

    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) console.error("Error writing log:", err);
    })
};

logMessage("Server started");
logMessage("User logged in");
logMessage("User performed an action");

console.log("Logs written to:", logFilePath);
