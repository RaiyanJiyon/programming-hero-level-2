# 🔄 Event Loop in Node.js

## ⚡ Core Idea

* Node.js runs JavaScript **on a single thread**.
* To handle **asynchronous operations** (I/O, timers, network requests), it uses the **event loop**.
* The event loop is provided by **libuv**, a C++ library inside Node.js.

👉 The event loop continuously checks:

* “Do I have work to do?”
* “If yes, where should I process it?”

---

## 🏗️ Event Loop Workflow

### 1. **Call Stack**

* Where your synchronous JavaScript code runs.
* Example:

  ```js
  console.log("Hello");
  ```

  Executes immediately.

---

### 2. **Callback Queue (Task Queue)**

* When async operations finish (like `setTimeout`, `fs.readFile`, or `HTTP requests`), their callbacks go into this queue.

---

### 3. **Event Loop**

* Keeps checking:

  * “Is the call stack empty?”
  * If **yes**, it moves the next callback from the queue into the stack.

---

## 🕐 Event Loop Phases (Step by Step)

The loop goes through phases in order:

1. **Timers Phase**

   * Executes callbacks from `setTimeout()` and `setInterval()`.

2. **Pending Callbacks Phase**

   * Executes some system-level callbacks (rarely used directly).

3. **Idle, Prepare**

   * Internal Node.js stuff.

4. **Poll Phase**

   * The most important phase ⚡.
   * Waits for new I/O events (file read, network).
   * Executes I/O callbacks immediately if available.
   * If no I/O → stays idle until a timer expires.

5. **Check Phase**

   * Executes `setImmediate()` callbacks.

6. **Close Callbacks Phase**

   * Executes close events (e.g., `socket.on("close", ...)`).

---

## 📌 Example in Action

```js
const fs = require("fs");

console.log("Start");

setTimeout(() => {
  console.log("Timeout callback");
}, 0);

setImmediate(() => {
  console.log("Immediate callback");
});

fs.readFile(__filename, () => {
  console.log("File read callback");
});

console.log("End");
```

**Possible Output:**

```
Start
End
File read callback
Immediate callback
Timeout callback
```

👉 Why?

* `"Start"` + `"End"` → synchronous → run first.
* `fs.readFile` finishes in the **poll phase**, so callback executes before timers.
* `setImmediate` runs in **check phase** → before timers.
* `setTimeout` runs in **timers phase** → last.

---

## ✅ Summary

* Event loop lets Node.js **handle many connections concurrently** despite being single-threaded.
* Runs in phases: **Timers → I/O → Check → Close**.
* Async tasks are queued, then executed when the call stack is empty.

