Excellent move 🔥 — you’re now learning one of the most **practical and widely used** middleware types in Mongoose:
👉 **Query Middleware**.

This kind of middleware lets you **run logic before or after any query executes**, such as `find()`, `findOne()`, `updateOne()`, or `deleteOne()`.

Let’s break it down step-by-step with clear examples 👇

---

# 🧠 What is Query Middleware?

**Query middleware** runs **before (`pre`)** or **after (`post`)** a **query** (not a document).

It lets you:
✅ Automatically modify or filter queries
✅ Add global conditions (like soft delete filters)
✅ Populate or sort results automatically
✅ Audit or log every query

---

### 🧩 Example Analogy

If you call:

```js
User.find({ isActive: true })
```

Mongoose executes the query pipeline like:

```
Pre hook → Query runs → Post hook
```

So you can insert logic **before** or **after** the database actually runs the query.

---

# ⚙️ Step 1: Define a Schema

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  isActive: { type: Boolean, default: true },
  updatedAt: Date
});
```

---

# ⚡ Step 2: Pre Query Middleware

The `.pre()` hook runs **before** a query executes.

---

### Example 1 — Automatically Filter Out Inactive Users

```js
userSchema.pre("find", function (next) {
  console.log("🟡 Pre-Find Hook Triggered");
  this.where({ isActive: { $ne: false } }); // modify query
  next();
});
```

✅ This adds a filter to every `find()` query, automatically excluding inactive users.

Usage:

```js
const User = mongoose.model("User", userSchema);
const users = await User.find();
```

💡 Even if you don’t include `{ isActive: true }` in your code, the middleware enforces it automatically.

---

### Example 2 — Update a Timestamp Before `findOneAndUpdate()`

```js
userSchema.pre("findOneAndUpdate", function (next) {
  console.log("🕒 Updating timestamp before update...");
  this.set({ updatedAt: new Date() });
  next();
});
```

✅ `this` refers to the **query**, not the document.

Usage:

```js
await User.findOneAndUpdate({ email: "kaela@gmail.com" }, { name: "Kaela Kenan" });
```

Now `updatedAt` will always refresh automatically.

---

### Example 3 — Automatically Populate a Field Before Find

```js
userSchema.pre(/^find/, function (next) {
  // Regex /^find/ matches find, findOne, findById, etc.
  console.log("🟡 Auto-populating 'posts' field...");
  this.populate("posts"); // assuming user has posts ref
  next();
});
```

✅ This ensures every find query auto-populates related data.

---

# ⚙️ Step 3: Post Query Middleware

Post hooks run **after** the query is executed and results are available.

---

### Example 1 — Log Number of Documents Found

```js
userSchema.post("find", function (docs, next) {
  console.log(`✅ Found ${docs.length} users`);
  next();
});
```

✅ `docs` → the array of documents returned.

Usage:

```js
await User.find();
```

Output:

```
🟡 Pre-Find Hook Triggered
✅ Found 5 users
```

---

### Example 2 — Log After Deletion

```js
userSchema.post("deleteOne", function (result, next) {
  console.log(`🗑️ Deleted ${result.deletedCount} user(s)`);
  next();
});
```

Usage:

```js
await User.deleteOne({ email: "kaela@gmail.com" });
```

✅ Runs **after** deletion completes.

---

# ⚙️ Step 4: Supported Query Middleware Events

Here’s a list of query-level operations that support middleware:

| Operation                             | Type                | Trigger               |
| ------------------------------------- | ------------------- | --------------------- |
| `count`                               | Query               | Count documents       |
| `countDocuments`                      | Query               | Count with conditions |
| `deleteOne` / `deleteMany`            | Query               | Before/after delete   |
| `find` / `findOne` / `findById`       | Query               | Before/after find     |
| `findOneAndUpdate`                    | Query               | Before/after update   |
| `findOneAndDelete`                    | Query               | Before/after delete   |
| `update` / `updateOne` / `updateMany` | Query               | Before/after update   |
| `aggregate`                           | Aggregate (special) | Before aggregation    |

✅ You can use `.pre()` or `.post()` on any of these.

---

# ⚙️ Step 5: Accessing the Query Object

Inside query middleware, `this` refers to the **Mongoose Query**, not the document.

That means you can:

* Modify the query with `this.where()`, `this.set()`, etc.
* Access query conditions using `this.getQuery()`
* Access updates using `this.getUpdate()`

Example:

```js
userSchema.pre("updateOne", function (next) {
  console.log("Query conditions:", this.getQuery());
  console.log("Update data:", this.getUpdate());
  next();
});
```

---

# ⚡ Step 6: Async/Await Support

You can use async functions — Mongoose handles the flow automatically.

```js
userSchema.pre("find", async function () {
  console.log("🟡 Async Pre-Find...");
  await new Promise(resolve => setTimeout(resolve, 200));
});
```

✅ No need for `next()` if you’re using async/await.

---

# ⚙️ Step 7: Example — Combining Pre + Post Query Middleware

```js
userSchema
  .pre("find", function (next) {
    console.log("🟡 About to run a find query...");
    this.where({ isActive: true });
    next();
  })
  .post("find", function (docs, next) {
    console.log(`🟢 Found ${docs.length} active users`);
    next();
  });
```

Usage:

```js
const users = await User.find();
```

✅ Output:

```
🟡 About to run a find query...
🟢 Found 2 active users
```

---

# ⚙️ Step 8: Real-World Example — Soft Delete Implementation

Let’s implement a **soft delete system** using query middleware.

```js
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  deleted: { type: Boolean, default: false }
});

// Pre-find hook to hide deleted users
userSchema.pre(/^find/, function (next) {
  this.where({ deleted: false });
  next();
});

// Static method for soft delete
userSchema.statics.softDelete = function (id) {
  return this.findByIdAndUpdate(id, { deleted: true });
};
```

Usage:

```js
await User.softDelete("671c9abc...");
const users = await User.find(); // deleted users automatically excluded
```

✅ No need to modify every query manually — middleware enforces it globally.

---

# ⚙️ Step 9: Using Multiple Query Hooks Together

You can attach multiple middlewares for different operations:

```js
userSchema.pre("find", function (next) {
  console.log("Pre-find hook");
  next();
});

userSchema.pre("updateOne", function (next) {
  console.log("Pre-update hook");
  this.set({ updatedAt: new Date() });
  next();
});

userSchema.post("deleteOne", function () {
  console.log("Post-delete hook");
});
```

✅ Each middleware runs only for its specific query type.

---

# ⚡ Step 10: Example — Full Query Middleware Demo

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  isActive: { type: Boolean, default: true },
  updatedAt: Date
});

// PRE HOOK
userSchema.pre("find", function (next) {
  console.log("🟡 Filtering active users...");
  this.where({ isActive: true });
  next();
});

// PRE HOOK for updates
userSchema.pre("updateOne", function (next) {
  console.log("🟡 Setting updatedAt timestamp...");
  this.set({ updatedAt: new Date() });
  next();
});

// POST HOOK
userSchema.post("find", function (docs, next) {
  console.log(`🟢 Found ${docs.length} users`);
  next();
});

const User = mongoose.model("User", userSchema);

(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/query-middleware-demo");

  await User.create([
    { name: "Kaela", email: "kaela@gmail.com", isActive: true },
    { name: "Jiyon", email: "jiyon@gmail.com", isActive: false }
  ]);

  await User.find(); // triggers pre+post find
  await User.updateOne({ name: "Kaela" }, { name: "Kaela Kenan" });
})();
```

✅ Output:

```
🟡 Filtering active users...
🟢 Found 1 users
🟡 Setting updatedAt timestamp...
```

---

# 🧠 Step 11: Common Real-World Use Cases

| Use Case                   | Middleware                 | Purpose                          |
| -------------------------- | -------------------------- | -------------------------------- |
| **Soft delete**            | `pre('find')`              | Exclude deleted documents        |
| **Auto-update timestamps** | `pre('updateOne')`         | Maintain `updatedAt`             |
| **Auto-populate**          | `pre(/^find/)`             | Populate relations automatically |
| **Audit logging**          | `post('findOneAndUpdate')` | Record change history            |
| **Query modification**     | `pre('find')`              | Add global filters or tenant ID  |

---

# ✅ Summary

| Concept              | Description                                          |
| -------------------- | ---------------------------------------------------- |
| **Query Middleware** | Runs before or after query execution                 |
| **Scope**            | Works on queries like `find`, `update`, `delete`     |
| **Access**           | `this` → the query object                            |
| **Pre Hook**         | Modify or inspect query before execution             |
| **Post Hook**        | Inspect or log results after query completes         |
| **Common Uses**      | Auto-filters, auto-populate, soft delete, logging    |
| **Syntax**           | `schema.pre('find', fn)` / `schema.post('find', fn)` |

---

✅ **In short:**

> **Query Middleware** lets you intercept Mongoose queries —
> perfect for enforcing rules, applying filters, populating data, or logging automatically across your app.

