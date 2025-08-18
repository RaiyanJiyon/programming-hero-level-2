# 🎯 What is the Events Module in Node.js?

* The **`events` module** is a **built-in (core) module** in Node.js.
* It allows you to create, fire, and listen to **custom events**.
* Implements the **Observer Pattern** → one object (emitter) emits an event, other objects (listeners) react to it.

👉 Think of it like a **radio station**:

* **EventEmitter** = radio station 🎙️ (broadcasts signals/events).
* **Listeners** = radios 📻 (tuned in to react when signals are sent).

---

# 🧩 Key Class: `EventEmitter`

The `events` module provides a class called **`EventEmitter`**.

* You create an **emitter object** from it.
* Then you can:

  * `.on(eventName, listener)` → listen for an event.
  * `.emit(eventName, data)` → trigger (fire) an event.
  * `.once(eventName, listener)` → listen only once.
  * `.removeListener` / `.off` → remove listeners.

---

# 🛠️ Example: Basic Usage

```js
const EventEmitter = require("events");

// Create an emitter object
const emitter = new EventEmitter();

// Listen for an event
emitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

// Emit the event
emitter.emit("greet", "Alice");
emitter.emit("greet", "Bob");
```

**Output:**

```
Hello, Alice!
Hello, Bob!
```

---

# 📌 Example: Using `once()`

```js
emitter.once("login", (user) => {
  console.log(`${user} has logged in`);
});

emitter.emit("login", "Raiyan");
emitter.emit("login", "Jiyon"); // Won’t run (listener removed after first call)
```

---

# 📌 Example: Passing Data with Events

```js
emitter.on("order", (orderId, amount) => {
  console.log(`Order received: #${orderId}, Amount: $${amount}`);
});

emitter.emit("order", 1234, 500);
```

---

# ⚡ Real-World Usage

* **HTTP servers** → Node’s `http` module is built on events (`request`, `connection`, etc.).
* **Streams** → `data`, `end`, `error` events.
* **Sockets (WebSockets, TCP)** → real-time messaging.
* **Custom app logic** → trigger app-specific actions (like user signup, order created, etc.).

---

✅ **In short:**

* The **Events module** in Node.js gives you `EventEmitter` to handle **custom & system events**.
* It’s the backbone of Node’s **asynchronous, event-driven architecture**.

