# 📂 Synchronous File Operations in Node.js

👉 When we say **synchronous**, it means the code will **block** execution until the operation is finished.

* ✅ Simpler to write and understand.
* ⚠️ Not recommended for high-performance servers (because it blocks the event loop).

---

## 🛠️ Import the `fs` Module

```js
const fs = require("fs");
```

---

## 📌 1. Synchronous File Write

```js
const fs = require("fs");

// Write to a file (overwrite if exists)
fs.writeFileSync("example.txt", "Hello, Node.js!");

// Append to a file
fs.appendFileSync("example.txt", "\nThis is appended text.");

console.log("File written successfully!");
```

✅ If `example.txt` doesn’t exist → it will be created.
✅ If it exists → `writeFileSync` replaces content, `appendFileSync` adds content.

---

## 📌 2. Synchronous File Read

```js
const fs = require("fs");

// Read file content (returns Buffer by default)
const data = fs.readFileSync("example.txt");

// Convert buffer to string
console.log(data.toString());
```

**Output:**

```
Hello, Node.js!
This is appended text.
```

---

## 📌 3. Synchronous File Delete

```js
fs.unlinkSync("example.txt");
console.log("File deleted!");
```

---

## 📌 4. Synchronous File Rename

```js
fs.renameSync("example.txt", "newname.txt");
console.log("File renamed!");
```

---

# ✅ Summary

* Use `fs.writeFileSync` → Write file.
* Use `fs.appendFileSync` → Append file.
* Use `fs.readFileSync` → Read file.
* Use `fs.unlinkSync` → Delete file.
* Use `fs.renameSync` → Rename file.

---

⚠️ **Best Practice:**

* Use **synchronous** methods for **scripts, setup, or small utilities**.
* Use **asynchronous (callback or promises)** for **servers** to avoid blocking the event loop.

