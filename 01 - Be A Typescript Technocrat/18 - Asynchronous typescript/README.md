## 🔷 Asynchronous Programming in TypeScript

### ✅ What is Asynchronous Programming?

**Asynchronous programming** allows code to run **without blocking** the execution thread — letting the application stay responsive (e.g., while waiting for data from a server).

> Think of it as saying: "**Do this task in the background, and let me know when you're done.**"

In TypeScript, asynchronous code is mainly written using:

* `Promises`
* `async/await`

---

### 🔹 Why Use Asynchronous Code?

Synchronous code **waits** for each operation to finish. In real-world apps (like fetching data), this can block the app.

Asynchronous code lets the app:

* Fetch or save data without freezing the UI
* Perform multiple tasks at once
* Handle I/O operations efficiently

---

## 🔸 Promises in TypeScript

A **Promise** represents the eventual result (or failure) of an asynchronous operation.

```typescript
function fetchData(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data loaded!");
    }, 1000);
  });
}

fetchData().then((data) => console.log(data));
```

* `.then()` handles success
* `.catch()` handles errors
* `.finally()` runs regardless of result

---

## 🔸 `async` and `await`

TypeScript provides `async`/`await` syntax to **write async code like synchronous code**, making it easier to read and debug.

```typescript
async function load() {
  const result = await fetchData();
  console.log(result); // "Data loaded!"
}
```

* `async` marks the function as returning a `Promise`
* `await` pauses until the promise resolves

---

## 🔹 Error Handling with `try` / `catch`

```typescript
async function getData() {
  try {
    const res = await fetchData();
    console.log("Success:", res);
  } catch (err) {
    console.error("Error occurred:", err);
  }
}
```

* Prevents unhandled promise rejections

---

## 🔹 Returning Types from Async Functions

```typescript
async function getUser(): Promise<{ name: string }> {
  return { name: "Alice" };
}
```

* Even if you return a plain object, TypeScript wraps it in a `Promise`.

---

## 🔹 Parallel Execution with `Promise.all`

```typescript
async function loadMultiple() {
  const [data1, data2] = await Promise.all([
    fetchData(),
    fetchData()
  ]);

  console.log(data1, data2);
}
```

* Use when tasks are **independent** and can run in **parallel**.

---

## 🔹 Async with Arrow Functions

```typescript
const getMessage = async (): Promise<string> => {
  return "Hello async world!";
};

getMessage().then(console.log);
```

---

## 🔹 Custom Delay Function Example

```typescript
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitThenPrint() {
  console.log("Waiting...");
  await delay(2000);
  console.log("Done!");
}
```

---

## 📌 Summary

| Concept                | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `Promise<T>`           | Represents future completion/failure of async task |
| `async` function       | Always returns a `Promise`                         |
| `await` keyword        | Waits for a promise to resolve                     |
| `try / catch`          | Handles async errors cleanly                       |
| `Promise.all()`        | Runs async tasks in parallel                       |
| Arrow Function + Async | Combine concise syntax with async logic            |
| Type Annotation        | Use `Promise<Type>` for async return values        |

---

## ✅ Conclusion

Asynchronous programming in TypeScript allows you to build **responsive**, **non-blocking**, and **user-friendly** applications. By mastering `Promises`, `async/await`, and TypeScript's typing system, you ensure **clarity**, **safety**, and **scalability** in your asynchronous logic.