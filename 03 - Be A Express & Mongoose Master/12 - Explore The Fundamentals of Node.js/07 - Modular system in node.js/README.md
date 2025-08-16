# 🧩 Modular System in Node.js

## ✅ What is a Module?

* A **module** is just a **reusable block of code** (JS file) that performs a specific function.
* Node.js applications are made up of **multiple modules**.
* Each file in Node.js is treated as a **separate module**.

👉 Think of modules like **LEGO blocks** 🧱 — you can assemble them to build large applications.

---

## 📦 Types of Modules in Node.js

### 1. **Core Modules** (Built-in)

* Provided by Node.js itself.
* Examples:

  * `fs` → file system
  * `http` → web server
  * `path` → file paths
  * `os` → operating system info

Usage:

```js
const fs = require("fs");

fs.writeFileSync("hello.txt", "Hello, Node.js!");
```

---

### 2. **Local Modules**

* Created by you (custom code).
* Example:

  ```js
  // math.js
  function add(a, b) {
    return a + b;
  }
  module.exports = add;
  ```

  ```js
  // app.js
  const add = require("./math");
  console.log(add(5, 10)); // 15
  ```

👉 Notice `module.exports` → this is how we **export** functions/objects.

---

### 3. **Third-Party Modules (NPM Packages)**

* Installed from **npm (Node Package Manager)**.
* Examples:

  * `express` → web framework
  * `mongoose` → MongoDB ORM
  * `lodash` → utility library

Usage:

```bash
npm install express
```

```js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000);
```

---

## 🔄 CommonJS vs ES Modules

* **CommonJS (CJS)** → Default in Node.js.

  * Import: `require()`
  * Export: `module.exports`

* **ES Modules (ESM)** → Modern JavaScript (supported in Node.js).

  * Import: `import`
  * Export: `export`

Example:

```js
// math.mjs (ESM)
export function add(a, b) {
  return a + b;
}

// app.mjs
import { add } from "./math.mjs";
console.log(add(2, 3));
```

👉 In `package.json`, set `"type": "module"` to use ESM.

---

## ⚡ Why Modular System is Important

* **Reusability** → Write once, use multiple times.
* **Maintainability** → Easier to debug and organize.
* **Separation of Concerns** → Different functionality in different files.
* **Scalability** → Large apps can be structured into smaller, manageable modules.

---

✅ **In short:**

* Node.js modular system = **Core Modules + Local Modules + NPM Modules**.
* Uses **CommonJS** by default (`require`, `module.exports`).
* Can also use **ESM** (`import`, `export`).