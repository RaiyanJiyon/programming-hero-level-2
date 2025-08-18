# 🧩 1. Buffer in Node.js

## ✅ What is a Buffer?

* A **Buffer** is a temporary storage area for **binary data** (raw data) directly in memory.
* It’s used when Node.js interacts with **files, network sockets, streams, etc.**
* Since Node.js is written in JavaScript (which doesn’t handle binary data natively), **Buffer** fills the gap by providing raw binary handling.

👉 Think of it like a **bucket** that holds raw bytes before they’re processed.

---

## 📌 Example: Using Buffer

```js
// Create a buffer from string
const buf = Buffer.from("Hello");

// View raw binary
console.log(buf); // <Buffer 48 65 6c 6c 6f>

// Convert buffer back to string
console.log(buf.toString()); // "Hello"
```

---

## 📌 Example: Allocating Buffers

```js
const buf1 = Buffer.alloc(10);   // Create empty buffer of size 10 (filled with zeros)
const buf2 = Buffer.allocUnsafe(10); // Faster, but may contain old memory data

console.log(buf1);
console.log(buf2);
```

---

# 🧩 2. Streams in Node.js

## ✅ What is a Stream?

* A **Stream** is a way to process data **piece by piece** (chunks), instead of loading everything into memory at once.
* Useful for handling **large files, videos, or real-time data**.
* Node.js streams are **EventEmitter** objects (`data`, `end`, `error`, etc.).

👉 Think of a **water pipeline**: instead of filling an entire bucket (Buffer) first, you process the water (data) as it flows.

---

## 📌 Types of Streams

1. **Readable Streams** → data can be read (e.g., `fs.createReadStream()`)
2. **Writable Streams** → data can be written (e.g., `fs.createWriteStream()`)
3. **Duplex Streams** → both readable and writable (e.g., TCP socket)
4. **Transform Streams** → duplex stream that modifies data (e.g., compression, encryption)

---

## 📌 Example: Reading a Large File with Stream

```js
const fs = require("fs");

const readStream = fs.createReadStream("bigfile.txt", "utf8");

readStream.on("data", (chunk) => {
  console.log("Received chunk:", chunk.length);
});

readStream.on("end", () => {
  console.log("Finished reading file");
});
```

⚡ Instead of loading the whole file into memory, Node.js reads **chunk by chunk**.

---

## 📌 Example: Writing with Stream

```js
const fs = require("fs");

const writeStream = fs.createWriteStream("output.txt");

writeStream.write("Hello, ");
writeStream.write("this is written using a stream.\n");
writeStream.end();

console.log("Data written to file!");
```

---

## 📌 Example: Piping (Read → Write)

```js
const fs = require("fs");

const readStream = fs.createReadStream("input.txt");
const writeStream = fs.createWriteStream("output.txt");

// Pipe read to write
readStream.pipe(writeStream);
```

⚡ Efficiently transfers data **without buffering entire file in memory**.

---

# 🔑 Buffer vs Stream (Quick Comparison)

| Feature       | Buffer 🪣                      | Stream 🚰                     |
| ------------- | ------------------------------ | ----------------------------- |
| Data Handling | Holds the whole data in memory | Handles data in chunks        |
| Best For      | Small files, quick operations  | Large files, continuous data  |
| Memory Usage  | High (loads entire data)       | Low (processes as it arrives) |
| Example       | `fs.readFileSync()`            | `fs.createReadStream()`       |

---

✅ **In short:**

* **Buffer** → raw binary storage, temporary.
* **Stream** → continuous flow of data in chunks, efficient for large/ongoing data.

