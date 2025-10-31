👉 **Aggregate Middleware**

This one is often overlooked but incredibly powerful — especially when working with `$match`, `$group`, `$lookup`, or multi-stage pipelines in MongoDB aggregations.

Let’s explore it step-by-step 👇

---

# 🧠 What is Aggregate Middleware?

**Aggregate Middleware** lets you run custom logic **before or after an aggregation pipeline executes**.

In other words:

> It’s like a **hook that runs before or after `.aggregate()`** — letting you modify or inspect the pipeline.

💡 Perfect for:
✅ Adding global filters automatically (like soft deletes or tenant-based queries)
✅ Logging or debugging aggregation pipelines
✅ Enforcing security filters

---

# ⚙️ Step 1: Define a Schema

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});
```

---

# ⚡ Step 2: Add a Pre Aggregate Middleware

Use `.pre('aggregate', fn)` to modify the aggregation pipeline **before** execution.

```js
userSchema.pre("aggregate", function (next) {
  console.log("🟡 Pre-Aggregate Hook Triggered");

  // Add a filter stage at the beginning of the pipeline
  this.pipeline().unshift({ $match: { isActive: { $ne: false } } });

  console.log("📦 Updated Pipeline:", JSON.stringify(this.pipeline(), null, 2));
  next();
});
```

✅ `this` refers to the **aggregation object** (not the model or query).
✅ You can access and modify the pipeline using `this.pipeline()`.

---

### Usage:

```js
const User = mongoose.model("User", userSchema);

await User.aggregate([
  { $group: { _id: "$role", total: { $sum: 1 } } }
]);
```

✅ Even though you didn’t include `{ $match: { isActive: true } }` — the middleware automatically adds it.

Output:

```
🟡 Pre-Aggregate Hook Triggered
📦 Updated Pipeline: [
  { "$match": { "isActive": { "$ne": false } } },
  { "$group": { "_id": "$role", "total": { "$sum": 1 } } }
]
```

---

# ⚙️ Step 3: Add a Post Aggregate Middleware

Use `.post('aggregate', fn)` to run logic **after** the aggregation result is returned.

```js
userSchema.post("aggregate", function (result, next) {
  console.log("🟢 Post-Aggregate Hook Triggered");
  console.log(`✅ Returned ${result.length} records`);
  next();
});
```

✅ `result` → the aggregation result array
✅ Great for logging, analytics, or result transformation.

---

### Full Example:

```js
const User = mongoose.model("User", userSchema);

const result = await User.aggregate([
  { $group: { _id: "$role", total: { $sum: 1 } } }
]);

console.log("Aggregation Result:", result);
```

Output:

```
🟡 Pre-Aggregate Hook Triggered
🟢 Post-Aggregate Hook Triggered
✅ Returned 3 records
```

---

# ⚙️ Step 4: Accessing and Editing the Pipeline

You can fully access and modify the aggregation pipeline inside middleware:

```js
userSchema.pre("aggregate", function (next) {
  const pipeline = this.pipeline();

  // Ensure soft-deleted docs are excluded
  const hasMatchStage = pipeline.some(stage => stage.$match);

  if (!hasMatchStage) {
    pipeline.unshift({ $match: { deleted: { $ne: true } } });
  }

  // Add a timestamp field to every result
  pipeline.push({ $addFields: { fetchedAt: new Date() } });

  next();
});
```

✅ Mongoose will use the modified pipeline when running `.aggregate()`.

---

# ⚡ Step 5: Async Aggregate Middleware

You can also use async functions if you need to fetch data or perform async logic.

```js
userSchema.pre("aggregate", async function () {
  console.log("🕒 Async pre-aggregate...");
  await new Promise(resolve => setTimeout(resolve, 200));
});
```

✅ If an error is thrown inside the middleware, aggregation will stop.

---

# ⚙️ Step 6: Example — Tenant-Based Filtering

Aggregate middleware is especially useful for **multi-tenant applications**, where each user can only see their own data.

```js
userSchema.pre("aggregate", function (next) {
  const currentTenantId = "tenant_123"; // normally comes from JWT or context
  this.pipeline().unshift({ $match: { tenantId: currentTenantId } });
  next();
});
```

✅ Automatically injects the tenant filter for every aggregation request.
✅ Prevents data leaks across tenants.

---

# ⚙️ Step 7: Error Handling in Aggregate Middleware

If something goes wrong, you can pass an error to `next(err)`:

```js
userSchema.pre("aggregate", function (next) {
  if (!this.pipeline().length) {
    return next(new Error("Aggregation pipeline cannot be empty!"));
  }
  next();
});
```

✅ Mongoose will stop the aggregation and throw the error.

---

# ⚡ Step 8: Full Working Example

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  role: String,
  isActive: { type: Boolean, default: true }
});

// PRE middleware
userSchema.pre("aggregate", function (next) {
  console.log("🟡 Pre-Aggregate Hook Triggered");
  this.pipeline().unshift({ $match: { isActive: true } });
  next();
});

// POST middleware
userSchema.post("aggregate", function (result, next) {
  console.log(`🟢 Post-Aggregate Hook: Returned ${result.length} results`);
  next();
});

const User = mongoose.model("User", userSchema);

(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/aggregate-middleware-demo");

  await User.create([
    { name: "Kaela", role: "admin", isActive: true },
    { name: "Raiyan", role: "user", isActive: false },
    { name: "Jiyon", role: "admin", isActive: true }
  ]);

  const results = await User.aggregate([
    { $group: { _id: "$role", total: { $sum: 1 } } }
  ]);

  console.log("🏁 Final Result:", results);
})();
```

🧩 Output:

```
🟡 Pre-Aggregate Hook Triggered
🟢 Post-Aggregate Hook: Returned 2 results
🏁 Final Result: [ { _id: 'admin', total: 2 } ]
```

✅ Notice how the inactive user was filtered automatically — thanks to the pre-aggregate middleware.

---

# ⚙️ Step 9: Real-World Use Cases

| Use Case                   | Middleware          | Description                           |
| -------------------------- | ------------------- | ------------------------------------- |
| **Soft delete filter**     | `pre('aggregate')`  | Exclude `deleted: true` docs globally |
| **Multi-tenant apps**      | `pre('aggregate')`  | Add `$match` for current tenant ID    |
| **Security filter**        | `pre('aggregate')`  | Restrict pipeline to allowed fields   |
| **Analytics logging**      | `post('aggregate')` | Log number of documents returned      |
| **Performance monitoring** | `post('aggregate')` | Measure query duration                |

---

# ⚙️ Step 10: Combining Aggregate Middleware with Others

You can use **aggregate**, **query**, and **document** middleware in the same schema.

Example:

```js
userSchema
  .pre("save", function (next) {
    console.log("Pre-save for:", this.name);
    next();
  })
  .pre(/^find/, function (next) {
    console.log("Pre-find hook");
    next();
  })
  .pre("aggregate", function (next) {
    console.log("Pre-aggregate hook");
    this.pipeline().unshift({ $match: { isActive: true } });
    next();
  });
```

✅ Mongoose will handle each middleware type independently based on the operation being executed.

---

# ⚡ Step 11: Post Middleware Example with Results Modification

You can even modify aggregation results **after** they’re fetched:

```js
userSchema.post("aggregate", function (result, next) {
  // Add total count or custom metadata
  result.push({ meta: { count: result.length, fetchedAt: new Date() } });
  next();
});
```

✅ The modified `result` will be the final output of `.aggregate()`.

---

# ✅ Summary

| Feature                  | Description                                    |
| ------------------------ | ---------------------------------------------- |
| **Aggregate Middleware** | Runs before/after aggregation pipelines        |
| **Access Object**        | `this` → aggregation instance                  |
| **Modify Pipeline**      | `this.pipeline()` → array of stages            |
| **Pre Hook**             | Modify or validate pipeline before execution   |
| **Post Hook**            | Inspect or modify results after aggregation    |
| **Common Uses**          | Soft delete, multi-tenant filtering, analytics |
| **Async Support**        | ✅ Fully supported                              |
| **Error Handling**       | Pass error via `next(err)`                     |

---

✅ **In short:**

> **Aggregate Middleware** gives you control over MongoDB aggregation pipelines —
> letting you inject filters, enforce access control, or log results automatically without changing your actual queries.
