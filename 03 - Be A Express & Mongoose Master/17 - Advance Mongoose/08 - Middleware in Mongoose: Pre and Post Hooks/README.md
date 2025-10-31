now reached one of the **most powerful and flexible** features in Mongoose:
👉 **Middleware (Hooks)** — also known as **Pre and Post Hooks**.

Middleware in Mongoose lets you **run functions automatically before or after certain database actions** like `save`, `find`, `update`, or `delete`.

Let’s go step-by-step 👇

---

## 🧠 What is Middleware (Hook)?

**Middleware (hook)** = a function that runs **before or after** an event happens on a Mongoose document or model.

You can think of it like **“lifecycle events”** for your data.

---

### 🔹 Analogy

When saving a document:

> Mongoose → runs your **pre-save hook** → saves data → then runs your **post-save hook**

💡 This lets you:

* Validate or modify data before saving
* Automatically hash passwords
* Log changes
* Clean up related data after deletion

---

## ⚙️ Step 1: Schema Setup

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});
```

---

## 🧩 Step 2: Pre Middleware (Runs **Before** an Action)

Use `.pre()` to run logic **before** an event like `save`, `find`, or `deleteOne`.

---

### Example 1 — Pre Save Hook (Password Hashing)

```js
const bcrypt = require("bcryptjs");

// Pre-save middleware
userSchema.pre("save", async function (next) {
  console.log("🟡 Pre-Save Hook Triggered...");

  // Only hash password if modified or new
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  console.log("✅ Password hashed before saving");
  next();
});
```

✅ `this` refers to the **document** being saved.

✅ Commonly used for:

* Hashing passwords
* Setting default values
* Updating timestamps

---

### Example 2 — Pre Find Hook (Automatically Filter Data)

```js
userSchema.pre("find", function (next) {
  console.log("🔍 Pre-Find Hook Triggered");
  this.where({ isActive: { $ne: false } }); // filter out inactive users
  next();
});
```

✅ `this` refers to the **query**, not the document.
✅ You can modify the query before it executes.

---

## ⚙️ Step 3: Post Middleware (Runs **After** an Action)

Use `.post()` to execute logic **after** an event completes successfully.

---

### Example 1 — Post Save Hook (Logging or Notifications)

```js
userSchema.post("save", function (doc, next) {
  console.log(`✅ User "${doc.name}" saved successfully.`);
  next();
});
```

✅ `doc` → the saved document
✅ Great for sending emails, logging, or auditing changes.

---

### Example 2 — Post Find Hook (Transform Results)

```js
userSchema.post("find", function (docs, next) {
  console.log(`✅ Found ${docs.length} users`);
  next();
});
```

✅ Triggered after a `find()` query completes.
✅ You can loop through results or clean up data.

---

## ⚡ Step 4: Available Middleware Types

| Middleware Type          | Description                       | Example                                     |
| ------------------------ | --------------------------------- | ------------------------------------------- |
| **Document Middleware**  | Runs on individual documents      | `save`, `validate`, `remove`                |
| **Query Middleware**     | Runs on query operations          | `find`, `findOne`, `updateOne`, `deleteOne` |
| **Aggregate Middleware** | Runs before aggregation pipelines | `aggregate`                                 |
| **Model Middleware**     | Runs on model-level actions       | `insertMany`                                |

---

## ⚙️ Step 5: Example — Pre + Post Save Together

```js
userSchema
  .pre("save", function (next) {
    console.log("🟡 Before saving user:", this.name);
    next();
  })
  .post("save", function (doc, next) {
    console.log("🟢 After saving user:", doc.name);
    next();
  });
```

✅ Output:

```
🟡 Before saving user: Kaela
🟢 After saving user: Kaela
```

---

## 🧠 Step 6: Pre Middleware for Queries

You can also attach hooks to query methods.

### Example — Pre findOneAndUpdate

```js
userSchema.pre("findOneAndUpdate", function (next) {
  console.log("🟡 Updating a user...");
  this.set({ updatedAt: new Date() });
  next();
});
```

✅ Ensures `updatedAt` is always refreshed automatically.

---

## ⚙️ Step 7: Aggregate Middleware (For Pipelines)

You can modify aggregation pipelines before execution.

```js
userSchema.pre("aggregate", function (next) {
  console.log("🔷 Pre-Aggregate Hook Triggered");

  // Automatically filter out inactive users
  this.pipeline().unshift({ $match: { isActive: { $ne: false } } });
  next();
});
```

✅ This modifies the pipeline before MongoDB runs it.
✅ Great for global filters or tenant-based apps.

---

## ⚡ Step 8: Error Handling in Middleware

If something goes wrong inside middleware, pass an error to `next()`:

```js
userSchema.pre("save", function (next) {
  if (!this.email.includes("@")) {
    return next(new Error("Invalid email format"));
  }
  next();
});
```

✅ Mongoose will stop execution and throw the error automatically.

---

## ⚙️ Step 9: Async/Await Support (Modern Style)

You can use async functions directly — no need for `next()`:

```js
userSchema.pre("save", async function () {
  console.log("Async pre-save middleware...");
  this.updatedAt = new Date();
});
```

✅ If the function throws an error, Mongoose automatically treats it as a failed middleware.

---

## 🧩 Step 10: Example — Full Demo

```js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});

// PRE hooks
userSchema.pre("save", async function (next) {
  console.log("🟡 Hashing password...");
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre("find", function (next) {
  console.log("🔍 Filtering inactive users...");
  this.where({ isActive: { $ne: false } });
  next();
});

// POST hooks
userSchema.post("save", function (doc) {
  console.log(`🟢 User "${doc.name}" saved successfully!`);
});

userSchema.post("find", function (docs) {
  console.log(`✅ Retrieved ${docs.length} users`);
});

const User = mongoose.model("User", userSchema);

// Demo
(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/middleware-demo");

  const user = await User.create({ name: "Kaela Kenan", email: "kaela@gmail.com", password: "123456" });

  await User.find(); // triggers pre + post find hooks
})();
```

🧩 Console Output:

```
🟡 Hashing password...
🟢 User "Kaela Kenan" saved successfully!
🔍 Filtering inactive users...
✅ Retrieved 1 users
```

---

## ⚙️ Step 11: Middleware Execution Order

Mongoose runs middlewares in this order:

1. **Document-level (save, validate, remove)**
2. **Query-level (find, updateOne, deleteOne, etc.)**
3. **Aggregate-level**
4. **Post hooks**

✅ You can chain multiple middlewares — they run in the order they were defined.

---

## 🧠 Step 12: Common Real-World Use Cases

| Use Case                  | Middleware                | Example                           |
| ------------------------- | ------------------------- | --------------------------------- |
| Hash password before save | `pre('save')`             | Encrypt password                  |
| Auto-update timestamp     | `pre('findOneAndUpdate')` | Add `updatedAt`                   |
| Soft delete filter        | `pre('find')`             | Exclude deleted records           |
| Log or audit              | `post('save')`            | Log who created a doc             |
| Populate automatically    | `pre('find')`             | `.populate('author')` inside hook |
| Add $match to pipeline    | `pre('aggregate')`        | Tenant-based filtering            |

---

## ⚡ Pre vs Post — Summary

| Type          | Runs When                     | Access to                  | Common Use                     |
| ------------- | ----------------------------- | -------------------------- | ------------------------------ |
| **Pre Hook**  | Before the operation executes | `this` (doc or query)      | Validation, transformation     |
| **Post Hook** | After the operation completes | `doc`, `docs`, or `result` | Logging, notification, cleanup |

✅ **Rule of Thumb:**

> * Use **Pre** hooks for preparing data.
> * Use **Post** hooks for reacting to changes.

---

## ✅ Summary

| Concept        | Description                                                |
| -------------- | ---------------------------------------------------------- |
| **Middleware** | Functions that run before or after certain Mongoose events |
| **Pre Hooks**  | Modify or validate data before action                      |
| **Post Hooks** | Respond to data after action                               |
| **Types**      | Document, Query, Aggregate, Model                          |
| **Syntax**     | `schema.pre('save', fn)` / `schema.post('find', fn)`       |
| **Use Cases**  | Hashing, logging, populating, auditing                     |

---

✅ **In short:**

> Mongoose middleware automates your data lifecycle —
> letting you run custom logic before or after key events like `save`, `find`, or `update`.
