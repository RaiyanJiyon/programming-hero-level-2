# 📦 CommonJS Modules in Node.js

## ✅ What is CommonJS?

* **CommonJS (CJS)** is the **module system** Node.js has used since its beginning (2009).
* It defines how to **import** and **export** functionality between files.
* Designed for **synchronous loading** (good for server-side code).

---

## 🔑 Key Features

1. **Each file = its own module**.
2. Variables/functions inside a file are **private** by default.
3. To share code → use `module.exports`.
4. To use shared code → use `require()`.

---

## 🛠️ Basic Example

### math.js

```js
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

// Exporting multiple things
module.exports = {
  add,
  sub,
};
```

### app.js

```js
const math = require("./math");

console.log(math.add(5, 3)); // 8
console.log(math.sub(10, 4)); // 6
```

---

## 📌 How `module.exports` Works

* By default, every file in Node.js has a `module` object.
* `module.exports` is what gets returned when you call `require()`.

### Example:

```js
// logger.js
console.log(module); // shows module info
```

Output (simplified):

```json
{
  "id": ".",
  "path": "/my-app",
  "exports": {},
  "filename": "/my-app/logger.js"
}
```

👉 So when you do:

```js
module.exports = myFunction;
```

and then:

```js
const log = require("./logger");
```

➡️ `log` will be equal to `myFunction`.

---

## 🔄 `exports` vs `module.exports`

* **Both refer to the same object** initially.
* But ⚠️ if you reassign `exports`, it breaks the link.

Example:

```js
// correct
exports.sayHello = () => console.log("Hello");

// incorrect (this breaks it)
exports = () => console.log("Hello");
```

👉 Always prefer `module.exports` for exporting a single thing.

---

## 🔁 Require Caching

* Node.js **caches modules** after the first `require()`.
* If you `require` the same file multiple times, it does **not reload** it.

Example:

```js
// counter.js
let count = 0;
module.exports = () => ++count;
```

```js
// app.js
const counter = require("./counter");

console.log(counter()); // 1
console.log(counter()); // 2

const counterAgain = require("./counter");
console.log(counterAgain()); // 3 (same cached module)
```

---

## ⚡ Pros of CommonJS

* Simple and easy to use.
* Synchronous loading → fine for backend.
* Huge ecosystem (npm modules originally built on CJS).

## ⚠️ Cons

* Not suitable for frontend/browser (since browsers need async loading).
* ES Modules (`import/export`) are now the modern standard.

---

✅ **In short:**

* CommonJS = `require()` + `module.exports`.
* Each file is a module.
* Supports reusability, modularity, and caching.
