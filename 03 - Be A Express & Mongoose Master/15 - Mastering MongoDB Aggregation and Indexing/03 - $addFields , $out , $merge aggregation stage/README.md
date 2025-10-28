👉 `$addFields`, `$out`, and `$merge`.

These are **very powerful** — they let you **create new fields**, and even **save** or **merge** the aggregation results back into a collection.

Let’s go through each one step-by-step with examples using your familiar `users` collection (`practice-data.json`).

---

## 🧠 Recap: Aggregation Framework

The aggregation pipeline runs as:

```js
db.users.aggregate([
  { <stage1> },
  { <stage2> },
  ...
])
```

Each stage processes documents and passes them along.

---

# 🟢 1. `$addFields` — Add or Modify Fields

### 🧩 Purpose:

* Adds **new fields** to each document.
* Or modifies **existing fields** (similar to `$set` but inside aggregation).

### 🧠 Syntax:

```js
{ $addFields: { <newField>: <expression>, ... } }
```

---

### ✅ Example 1: Add a full name field

```js
db.users.aggregate([
  {
    $addFields: {
      fullName: { $concat: ["$name.firstName", " ", "$name.lastName"] }
    }
  },
  { $project: { _id: 0, fullName: 1, age: 1, gender: 1 } }
])
```

➡️ Adds a new `fullName` field like `"Kaela Kenan"` to each document.

---

### ✅ Example 2: Add a calculated field (10% salary bonus)

```js
db.users.aggregate([
  {
    $addFields: {
      bonusSalary: { $multiply: ["$salary", 1.1] }
    }
  },
  { $project: { _id: 0, name: 1, salary: 1, bonusSalary: 1 } }
])
```

➡️ Adds a new `bonusSalary` field based on a formula.

---

### ✅ Example 3: Add a nested field

```js
db.users.aggregate([
  {
    $addFields: {
      "address.fullAddress": { $concat: ["$address.city", ", ", "$address.country"] }
    }
  },
  { $project: { "address.fullAddress": 1, _id: 0 } }
])
```

➡️ Adds a new nested field inside `address`.

---

### ✅ Example 4: Add conditional fields

```js
db.users.aggregate([
  {
    $addFields: {
      ageGroup: {
        $cond: { if: { $gte: ["$age", 60] }, then: "Senior", else: "Adult" }
      }
    }
  },
  { $project: { name: 1, age: 1, ageGroup: 1, _id: 0 } }
])
```

➡️ Adds `ageGroup` = “Senior” if age ≥ 60, otherwise “Adult”.

---

# 🔵 2. `$out` — Write Results to a **New Collection**

### 🧩 Purpose:

The `$out` stage **replaces** or **creates** a collection with the results of the aggregation.

⚠️ It’s always the **final stage** in the pipeline.

---

### 🧠 Syntax:

```js
{ $out: "<collectionName>" }
```

---

### ✅ Example 1: Save filtered users into a new collection

```js
db.users.aggregate([
  { $match: { gender: "Female" } },
  { $out: "female_users" }
])
```

➡️ Creates (or replaces) a collection named **`female_users`** containing only the female user documents.

---

### ✅ Example 2: Save aggregated results

```js
db.users.aggregate([
  { $group: { _id: "$address.country", totalUsers: { $sum: 1 } } },
  { $out: "user_count_by_country" }
])
```

➡️ Creates a new collection `user_count_by_country` with country-wise counts.

**Resulting collection example:**

```json
{ "_id": "China", "totalUsers": 50 }
{ "_id": "Brazil", "totalUsers": 30 }
```

---

### ⚠️ Important Notes:

* `$out` **replaces** the target collection if it already exists.
* You **can’t** use `$out` inside `$facet`.
* You **can’t** combine `$out` and `$merge` in the same pipeline.

---

# 🟣 3. `$merge` — Write or Update Results to a Collection (Safely)

### 🧩 Purpose:

`$merge` is like `$out`, but **more flexible** — it can:

* Insert new documents,
* Update existing ones,
* Keep both (merge),
* Or even discard unmatched ones.

It allows **custom control** over how documents are written to the target collection.

---

### 🧠 Syntax:

```js
{
  $merge: {
    into: "<targetCollection>",
    on: "_id",                // field(s) to match
    whenMatched: "merge",     // merge, replace, keepExisting, fail, pipeline
    whenNotMatched: "insert"  // insert, discard, fail
  }
}
```

---

### ✅ Example 1: Merge results into another collection

```js
db.users.aggregate([
  { $match: { gender: "Male" } },
  { $merge: { into: "male_users", whenMatched: "replace", whenNotMatched: "insert" } }
])
```

➡️ Writes male users into `male_users` collection.
If a document already exists (same `_id`), it’s replaced; otherwise, it’s inserted.

---

### ✅ Example 2: Merge aggregated data with existing collection

```js
db.users.aggregate([
  { $group: { _id: "$address.country", totalUsers: { $sum: 1 } } },
  {
    $merge: {
      into: "country_stats",
      on: "_id",
      whenMatched: "merge",
      whenNotMatched: "insert"
    }
  }
])
```

➡️ Updates `country_stats` collection —
If a country exists, updates its `totalUsers`.
If not, inserts a new record.

---

### ✅ Example 3: Conditional merge behavior

```js
db.users.aggregate([
  { $group: { _id: "$gender", totalSalary: { $sum: "$salary" } } },
  {
    $merge: {
      into: "gender_salary_summary",
      on: "_id",
      whenMatched: "merge",
      whenNotMatched: "insert"
    }
  }
])
```

➡️ Creates/updates a summary collection like:

```json
{ "_id": "Male", "totalSalary": 12450 }
{ "_id": "Female", "totalSalary": 13800 }
```

---

## ⚖️ `$out` vs `$merge`

| Feature           | `$out`                      | `$merge`                                 |
| ----------------- | --------------------------- | ---------------------------------------- |
| Action            | Replaces target collection  | Updates or inserts                       |
| Control           | Always overwrites           | Flexible (merge, keep, replace, etc.)    |
| Use Case          | Save final static results   | Incrementally update summary collections |
| Syntax Simplicity | Simple (`{ $out: "name" }`) | Complex, but more control                |

---

## 🧩 Combined Example: `$addFields` + `$merge`

Add a computed field, then merge results into another collection:

```js
db.users.aggregate([
  {
    $addFields: {
      fullName: { $concat: ["$name.firstName", " ", "$name.lastName"] },
      bonusSalary: { $multiply: ["$salary", 1.2] }
    }
  },
  {
    $merge: {
      into: "users_with_bonus",
      on: "_id",
      whenMatched: "merge",
      whenNotMatched: "insert"
    }
  }
])
```

✅ Saves new fields and merges updated user data into a new collection **`users_with_bonus`**.

---

## 🧠 Summary Table

| Stage        | Purpose                                                      | Example                                                                                    |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `$addFields` | Add or modify fields in documents                            | `{ $addFields: { fullName: { $concat: ["$first", " ", "$last"] } } }`                      |
| `$out`       | Save pipeline result to new (or replace existing) collection | `{ $out: "resultCollection" }`                                                             |
| `$merge`     | Write or update results flexibly into a collection           | `{ $merge: { into: "stats", on: "_id", whenMatched: "merge", whenNotMatched: "insert" } }` |
