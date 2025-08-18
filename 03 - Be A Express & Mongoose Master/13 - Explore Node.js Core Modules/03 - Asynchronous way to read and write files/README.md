Node’s **asynchronous file system methods** are non-blocking → meaning the program doesn’t pause while waiting for I/O. This is the recommended way for **servers** and large apps.

---

# 📂 Asynchronous File Operations in Node.js

👉 Import the `fs` module:

```js
const fs = require("fs");
```

---

## 📌 1. Asynchronous File Write

```js
fs.writeFile("example.txt", "Hello, Async Node.js!", (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("File written successfully!");
});
```

✅ If the file doesn’t exist → it gets created.
✅ If it exists → content is replaced.

---

## 📌 2. Asynchronous File Append

```js
fs.appendFile("example.txt", "\nThis is appended asynchronously.", (err) => {
  if (err) {
    console.error("Error appending file:", err);
    return;
  }
  console.log("Data appended successfully!");
});
```

---

## 📌 3. Asynchronous File Read

```js
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File content:");
  console.log(data);
});
```

⚠️ Note: If you don’t pass `"utf8"`, you’ll get a **Buffer** instead of a string.

---

## 📌 4. Asynchronous File Delete

```js
fs.unlink("example.txt", (err) => {
  if (err) {
    console.error("Error deleting file:", err);
    return;
  }
  console.log("File deleted successfully!");
});
```

---

## 📌 5. Asynchronous File Rename

```js
fs.rename("example.txt", "newname.txt", (err) => {
  if (err) {
    console.error("Error renaming file:", err);
    return;
  }
  console.log("File renamed successfully!");
});
```

---

# ✅ Summary

* **Write file:** `fs.writeFile(path, data, callback)`
* **Append file:** `fs.appendFile(path, data, callback)`
* **Read file:** `fs.readFile(path, encoding, callback)`
* **Delete file:** `fs.unlink(path, callback)`
* **Rename file:** `fs.rename(oldPath, newPath, callback)`

---

⚡ Pro Tip: You can also use the **Promise-based API** with `fs.promises` or `util.promisify` + `async/await` for cleaner code.
