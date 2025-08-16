# 🧩 1. **Named Exports**

👉 Used when you want to export **multiple functions/objects** from the same file.

### Example (`math.js`)

```js
// Named exports
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

module.exports = { add, sub };   // CommonJS
// or (ESM)
// export { add, sub };
```

### Import (`app.js`)

```js
const { add, sub } = require("./math");
// (ESM) import { add, sub } from "./math.js";

console.log(add(5, 2)); // 7
console.log(sub(5, 2)); // 3
```

✅ Good for when you have **multiple utilities** in one module.

---

# 🧩 2. **Name Aliasing**

👉 You can **rename** an imported function or variable. Useful if names collide or you want shorter names.

### Example (`app.js`)

```js
const { add: sum, sub: difference } = require("./math");
// (ESM) import { add as sum, sub as difference } from "./math.js";

console.log(sum(10, 5));       // 15
console.log(difference(10, 5)); // 5
```

✅ Prevents **naming conflicts** and makes code more readable.

---

# 🧩 3. **Index Exports (Barrel Export)**

👉 A common pattern where you create an `index.js` file to **re-export everything** from multiple modules.

* This helps shorten import paths and organize code better.

### Example Project Structure

```
/utils
   math.js
   string.js
   index.js
app.js
```

### math.js

```js
function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }

module.exports = { add, sub };
```

### string.js

```js
function upper(str) { return str.toUpperCase(); }
function lower(str) { return str.toLowerCase(); }

module.exports = { upper, lower };
```

### index.js (barrel file)

```js
const math = require("./math");
const string = require("./string");

module.exports = {
  ...math,
  ...string,
};
```

### app.js

```js
const utils = require("./utils");

console.log(utils.add(2, 3));    // 5
console.log(utils.upper("hello")); // HELLO
```

✅ Instead of importing `math` and `string` separately, you import everything from `index.js`.

---

# ✅ Summary

* **Named Exports** → Export multiple items from a module.
* **Name Aliasing** → Rename imports to avoid conflicts or for clarity.
* **Index Exports (Barrel)** → Central file (`index.js`) that re-exports from many modules for cleaner imports.

