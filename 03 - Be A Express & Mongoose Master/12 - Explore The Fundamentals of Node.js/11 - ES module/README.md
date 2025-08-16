# 📦 ES Modules (ESM) in Node.js

## ✅ What is an ES Module?

* **ESM (ECMAScript Modules)** is the official **JavaScript module system** introduced in ES6 (2015).
* Instead of `require` / `module.exports` (CommonJS), ESM uses `import` / `export`.
* Node.js has supported ESM **natively since v12+**.

---

## 🔑 Key Differences (CommonJS vs ESM)

| Feature         | CommonJS (CJS)            | ES Modules (ESM)                               |
| --------------- | ------------------------- | ---------------------------------------------- |
| Import syntax   | `const x = require("x")`  | `import x from "x"`                            |
| Export syntax   | `module.exports = x`      | `export default x` / `export {}`               |
| Loading         | Synchronous               | Asynchronous                                   |
| File extensions | `.js` (default)           | `.mjs` or `"type": "module"` in `package.json` |
| Scope           | Wrapped in function (CJS) | Strict mode by default                         |

---

## 🛠️ Enabling ESM in Node.js

You can use ESM in **two ways**:

1. **Use `.mjs` extension**

   ```bash
   node app.mjs
   ```
2. **Set `"type": "module"` in `package.json`**

   ```json
   {
     "type": "module"
   }
   ```

---

## 📌 Example 1: Default Export

### math.mjs

```js
export default function add(a, b) {
  return a + b;
}
```

### app.mjs

```js
import add from "./math.mjs";

console.log(add(2, 3)); // 5
```

---

## 📌 Example 2: Named Exports

### math.mjs

```js
export function add(a, b) {
  return a + b;
}

export function sub(a, b) {
  return a - b;
}
```

### app.mjs

```js
import { add, sub } from "./math.mjs";

console.log(add(10, 5)); // 15
console.log(sub(10, 5)); // 5
```

---

## 📌 Example 3: Aliasing (Rename Imports)

```js
import { add as sum, sub as difference } from "./math.mjs";

console.log(sum(7, 3));       // 10
console.log(difference(7, 3)); // 4
```

---

## 📌 Example 4: Index Export (Barrel)

```
/utils
   math.mjs
   string.mjs
   index.mjs
app.mjs
```

### index.mjs

```js
export * from "./math.mjs";
export * from "./string.mjs";
```

### app.mjs

```js
import { add, upper } from "./utils/index.mjs";

console.log(add(2, 2));     // 4
console.log(upper("hello")); // HELLO
```

---

## ⚡ Benefits of ESM

* Official JavaScript standard → works in both **browser** and **Node.js**.
* Supports **async loading** (great for frontend).
* Cleaner, more consistent syntax.
* Tree-shaking support → removes unused code (important in bundlers).

---

✅ **In short:**

* CommonJS → `require` / `module.exports` (Node.js legacy).
* ESM → `import` / `export` (modern standard).
* Node.js supports both, but ESM is the **future**.

