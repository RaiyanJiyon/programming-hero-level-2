# 🧩 Module Wrapper in Node.js

In Node.js, **every module (file)** is wrapped inside a **function** before execution.
This is done automatically by Node.js (using an IIFE — Immediately Invoked Function Expression).

---

## 🔒 Why a Wrapper?

* Keeps variables/functions **scoped to the module** (so they don’t pollute the global scope).
* Provides special objects (`require`, `module`, `exports`, `__dirname`, `__filename`) to each module.

---

## 🛠️ How It Works

Suppose you write this in `math.js`:

```js
const a = 10;
const b = 20;

module.exports = a + b;
```

👉 Behind the scenes, Node.js wraps it like this:

```js
(function (exports, require, module, __filename, __dirname) {
  const a = 10;
  const b = 20;

  module.exports = a + b;
});
```

Then Node.js immediately **invokes** this function (IIFE).

---

## 🧩 The Parameters

When Node.js wraps a file, it gives you these 5 arguments:

1. **exports** → Shortcut to `module.exports`.
2. **require** → Function to load other modules.
3. **module** → Object representing the current module (`{ exports: {} }`).
4. **\_\_filename** → Absolute path of the current file.
5. **\_\_dirname** → Absolute path of the current directory.

---

## 📌 Example Demonstration

```js
// demo.js
console.log(arguments);
```

Run with:

```bash
node demo.js
```

Output (simplified):

```js
[Arguments] {
  '0': {},                    // exports
  '1': [Function: require],   // require
  '2': Module { ... },        // module
  '3': '/path/demo.js',       // __filename
  '4': '/path'                // __dirname
}
```

👉 This shows that **your code is inside a hidden function** created by Node.js.

---

## ✅ Why This Matters

* Ensures **modularity & encapsulation**.
* Lets every file be **self-contained**.
* Explains why `require`, `module.exports`, etc. magically exist in every Node.js file.

---

🔑 **In short:**

* Node.js uses an **IIFE (Module Wrapper)** to execute every module.
* That’s how you get `require`, `module`, `exports`, `__dirname`, and `__filename` inside each file.

