**Document Middleware** — one of the most important parts of how Mongoose handles data “lifecycle events.”

These hooks let you **run logic before or after a document is saved, validated, or removed**, giving you precise control over document behavior.

Let’s go step-by-step 👇

---

## 🧠 What Is Document Middleware?

**Document Middleware** (also called **Document Hooks**) runs during actions that involve a **single document** —
for example:

* when a document is being **validated**,
* **saved**, or
* **removed**.

💡 It’s perfect for:
✅ Automatically hashing passwords
✅ Updating timestamps
✅ Logging or sending notifications
✅ Cleaning up related documents

---

# ⚙️ Step 1: Basic Schema Setup

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});
```

---

# ⚡ Step 2: Pre Middleware (Before the Action)

Use `.pre()` to define logic that should run **before** a document action (like `save`, `validate`, or `remove`).

---

### Example 1 — Pre Save Hook

```js
userSchema.pre("save", function (next) {
  console.log("🟡 Pre-Save Hook Triggered for:", this.name);

  this.updatedAt = new Date();
  next();
});
```

✅ `this` → refers to the **document** being saved.
✅ You can modify its data before it’s written to the database.

---

### Example 2 — Hash Password Before Save

A common use case in real-world apps 👇

```js
const bcrypt = require("bcryptjs");

userSchema.pre("save", async function (next) {
  // Only hash password if modified or new
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  console.log("✅ Password hashed before saving");
  next();
});
```

✅ Ensures password is encrypted **automatically** before saving.
✅ No need to manually hash it in your controllers.

---

### Example 3 — Pre Validate Hook

```js
userSchema.pre("validate", function (next) {
  if (!this.email.includes("@")) {
    return next(new Error("Invalid email address"));
  }
  console.log("✅ Validation passed");
  next();
});
```

✅ Runs before validation checks.
✅ Perfect for adding **custom validations**.

---

# ⚙️ Step 3: Post Middleware (After the Action)

Use `.post()` to execute logic **after** a document operation completes.

---

### Example 1 — Post Save Hook

```js
userSchema.post("save", function (doc, next) {
  console.log(`🟢 User "${doc.name}" saved successfully.`);
  next();
});
```

✅ Receives the **saved document** (`doc`).
✅ Ideal for logging, sending emails, or analytics.

---

### Example 2 — Post Remove Hook

```js
userSchema.post("remove", function (doc, next) {
  console.log(`🗑️ User "${doc.name}" removed from database.`);
  next();
});
```

✅ Runs after `.remove()` or `doc.deleteOne()` is called.
✅ Great for cleanup operations — for example, removing related posts.

---

# ⚙️ Step 4: Async/Await Support

You can define async document middleware directly without calling `next()`.

```js
userSchema.pre("save", async function () {
  console.log("🟡 Async pre-save for:", this.name);
  this.updatedAt = new Date();
});
```

✅ If the function throws an error, Mongoose automatically aborts the operation.

---

# ⚡ Step 5: Execution Flow Example

Let’s combine multiple hooks for a real example 👇

```js
userSchema
  .pre("validate", function (next) {
    console.log("1️⃣ Pre-Validate");
    next();
  })
  .pre("save", function (next) {
    console.log("2️⃣ Pre-Save");
    next();
  })
  .post("save", function (doc, next) {
    console.log("3️⃣ Post-Save for:", doc.name);
    next();
  });
```

Usage:

```js
const User = mongoose.model("User", userSchema);
await User.create({ name: "Kaela", email: "kaela@gmail.com", password: "123456" });
```

✅ Output:

```
1️⃣ Pre-Validate
2️⃣ Pre-Save
3️⃣ Post-Save for: Kaela
```

---

# ⚙️ Step 6: Common Document Middleware Hooks

| Hook       | Type       | Description                                       |
| ---------- | ---------- | ------------------------------------------------- |
| `validate` | Pre / Post | Runs before/after schema validation               |
| `save`     | Pre / Post | Runs before/after a document is saved             |
| `remove`   | Pre / Post | Runs before/after a document is deleted           |
| `init`     | Post only  | Runs after a document is loaded from the database |

---

### Example — Post Init Hook

```js
userSchema.post("init", function (doc) {
  console.log(`📦 Loaded user "${doc.name}" from database`);
});
```

✅ Runs every time a document is fetched (`find`, `findOne`, etc.) and converted into a Mongoose model instance.

---

# ⚙️ Step 7: Conditional Middleware

You can control when middleware should run using conditions.

```js
userSchema.pre("save", function (next) {
  if (!this.isModified("email")) return next(); // skip if email not changed
  console.log("📧 Email changed, sending verification...");
  next();
});
```

✅ Only triggers when the field changes — very useful for optimizing performance.

---

# ⚡ Step 8: Real-World Example — Auto Timestamp & Hashing

```js
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

userSchema.pre("save", async function (next) {
  this.updatedAt = new Date();

  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

userSchema.post("save", function (doc) {
  console.log(`🟢 User "${doc.name}" saved at ${doc.createdAt}`);
});
```

✅ Automatically timestamps and hashes password before saving.

---

# ⚙️ Step 9: Middleware Error Handling

If something goes wrong in middleware, pass an error to `next()` or throw inside an async function.

```js
userSchema.pre("save", function (next) {
  if (!this.name) return next(new Error("Name is required!"));
  next();
});

// or with async
userSchema.pre("save", async function () {
  if (!this.email) throw new Error("Email missing!");
});
```

✅ This prevents the document from saving and throws a validation error.

---

# ⚡ Step 10: Full Example — Document Middleware in Action

```js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

// Pre validate
userSchema.pre("validate", function (next) {
  console.log("🟡 Validating user:", this.name);
  if (!this.email.includes("@")) return next(new Error("Invalid email"));
  next();
});

// Pre save
userSchema.pre("save", async function (next) {
  console.log("🟡 Saving user...");
  this.updatedAt = new Date();
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Post save
userSchema.post("save", function (doc) {
  console.log(`🟢 User "${doc.name}" saved successfully!`);
});

const User = mongoose.model("User", userSchema);

(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/document-middleware-demo");

  const user = await User.create({
    name: "Raiyan Jiyon",
    email: "jiyon@gmail.com",
    password: "123456"
  });

  console.log(user);
})();
```

🧩 Output:

```
🟡 Validating user: Raiyan Jiyon
🟡 Saving user...
🟢 User "Raiyan Jiyon" saved successfully!
```

---

# ⚙️ Step 11: Document vs Query Middleware — Comparison

| Feature           | **Document Middleware**         | **Query Middleware**               |
| ----------------- | ------------------------------- | ---------------------------------- |
| Runs On           | A single document               | A query operation                  |
| Access via `this` | Refers to the **document**      | Refers to the **query**            |
| Common Hooks      | `save`, `validate`, `remove`    | `find`, `updateOne`, `deleteOne`   |
| Used For          | Data validation, transformation | Query modification, global filters |
| Example           | Hash password before save       | Filter inactive users before find  |

✅ **Rule of Thumb:**

> Use **Document Middleware** for actions on individual records,
> and **Query Middleware** for actions across collections.

---

# ✅ Summary

| Concept                 | Description                                        |
| ----------------------- | -------------------------------------------------- |
| **Document Middleware** | Runs before or after document actions              |
| **Pre Hook**            | Modify or validate document before saving/removing |
| **Post Hook**           | Perform side effects after saving/removing         |
| **Common Hooks**        | `validate`, `save`, `remove`, `init`               |
| **Use Cases**           | Hash passwords, update timestamps, cleanup         |
| **Access**              | `this` → document instance                         |
| **Error Handling**      | `next(err)` or `throw new Error()`                 |

---

✅ **In short:**

> **Document middleware** lets your models automatically prepare, validate, or clean up data
> — keeping your business logic consistent and DRY (Don’t Repeat Yourself).

