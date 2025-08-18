# 📝 1. Path Module in Node.js

The **`path`** module is a core Node.js module used to handle and transform **file paths**.

👉 Why do we need it?

* File paths differ between **Windows (`\`)** and **Linux/Mac (`/`)**.
* `path` makes it **cross-platform safe**.

---

## 📌 Common `path` methods

```js
const path = require("path");

console.log(__dirname);          // Current directory
console.log(__filename);         // Full file path

console.log(path.basename(__filename)); // File name only
console.log(path.dirname(__filename));  // Directory name
console.log(path.extname(__filename));  // Extension (.js)

console.log(path.join(__dirname, "logs", "app.log"));
// Safe path joining (auto adds correct slashes)

console.log(path.resolve("logger.js"));
// Gives absolute path from relative
```

---

# 📝 2. Making a Basic Logger App

We’ll create a simple **Logger utility** that logs messages into a file.

---

## 📌 Step 1: Import Modules

We need:

* `fs` → to write logs to a file.
* `path` → to safely generate the log file path.

```js
const fs = require("fs");
const path = require("path");
```

---

## 📌 Step 2: Define Log File Path

```js
// Store logs inside "logs" folder
const logFilePath = path.join(__dirname, "logs", "app.log");

// Make sure "logs" folder exists
if (!fs.existsSync(path.dirname(logFilePath))) {
  fs.mkdirSync(path.dirname(logFilePath));
}
```

---

## 📌 Step 3: Create Logger Function

```js
function logMessage(message) {
  const time = new Date().toISOString();
  const log = `[${time}] ${message}\n`;

  // Append log into the file asynchronously
  fs.appendFile(logFilePath, log, (err) => {
    if (err) console.error("Error writing log:", err);
  });
}
```

---

## 📌 Step 4: Use the Logger

```js
logMessage("Server started");
logMessage("User logged in");
logMessage("User performed an action");

console.log("Logs written to:", logFilePath);
```

---

# 📂 File Structure Example

```
project/
│
├── logger.js   (your logger code)
└── logs/
    └── app.log
```

---

# ✅ Example `app.log` output

```
[2025-08-16T13:45:12.345Z] Server started
[2025-08-16T13:46:01.123Z] User logged in
[2025-08-16T13:47:25.567Z] User performed an action
```

---

⚡ With this setup:

* You’ve learned how to use **`path`** to safely manage paths.
* You’ve built a **basic logger** that writes timestamped messages to a file.

