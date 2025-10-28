These two stages are used in **almost every** aggregation pipeline — one filters data, the other reshapes it.

Let’s break them down with examples using your `users` collection from `practice-data.json`.

---

## 🧩 Basic Aggregation Syntax

```js
db.users.aggregate([
  { <stage1> },
  { <stage2> },
  { <stage3> }
])
```

Each **stage** processes documents and passes results to the next one.

---

# 🟢 1. `$match` — Filtering Stage

The `$match` stage filters documents, **just like the `find()` query**, but within the aggregation pipeline.

✅ It’s typically the **first stage** of a pipeline.

---

### 🧠 Syntax

```js
{ $match: { <field>: <condition> } }
```

---

### ✅ Example 1: Match by single condition

Find all **female users**:

```js
db.users.aggregate([
  { $match: { gender: "Female" } }
])
```

➡️ Only documents with `"gender": "Female"` move to the next stage.

---

### ✅ Example 2: Match by multiple conditions (implicit AND)

Find users who are **male** and **older than 40**:

```js
db.users.aggregate([
  { $match: { gender: "Male", age: { $gt: 40 } } }
])
```

➡️ Equivalent to:

```js
db.users.find({ gender: "Male", age: { $gt: 40 } })
```

---

### ✅ Example 3: Using comparison operators

Find users whose **salary is between 300 and 500**:

```js
db.users.aggregate([
  { $match: { salary: { $gte: 300, $lte: 500 } } }
])
```

---

### ✅ Example 4: Using `$in` or `$or`

Find users from **China or Brazil**:

```js
db.users.aggregate([
  { $match: { "address.country": { $in: ["China", "Brazil"] } } }
])
```

---

# 🟣 2. `$project` — Field Selection & Transformation

The `$project` stage controls **which fields to include, exclude, or reshape** in the output.

✅ It’s similar to **projection in `find()`**, but more powerful — you can **rename fields, create computed fields, and combine values.**

---

### 🧠 Syntax

```js
{ 
  $project: {
    <field1>: 1,         // include
    <field2>: 0,         // exclude
    <newField>: <expr>   // computed field
  } 
}
```

---

### ✅ Example 1: Include specific fields

Show only `name`, `age`, and `gender`:

```js
db.users.aggregate([
  { $project: { _id: 0, name: 1, age: 1, gender: 1 } }
])
```

➡️ Removes `_id` and other unnecessary fields.

---

### ✅ Example 2: Rename fields

Rename `salary` → `income`:

```js
db.users.aggregate([
  { 
    $project: { 
      _id: 0, 
      name: 1, 
      income: "$salary" 
    } 
  }
])
```

➡️ The output field `income` comes from the original `salary` field.

---

### ✅ Example 3: Create a new computed field

Add a 10% bonus to salary:

```js
db.users.aggregate([
  {
    $project: {
      name: 1,
      salary: 1,
      bonusSalary: { $multiply: ["$salary", 1.1] }  // 10% bonus
    }
  }
])
```

✅ `$multiply` is an **aggregation operator** used inside `$project`.

---

### ✅ Example 4: Combine fields

Combine `firstName` and `lastName` into a `fullName`:

```js
db.users.aggregate([
  {
    $project: {
      _id: 0,
      fullName: { $concat: ["$name.firstName", " ", "$name.lastName"] },
      age: 1,
      country: "$address.country"
    }
  }
])
```

➡️ Uses `$concat` to merge string fields.

---

### ✅ Example 5: Conditional field

Label users as **Adult** or **Minor**:

```js
db.users.aggregate([
  {
    $project: {
      name: 1,
      age: 1,
      status: {
        $cond: { if: { $gte: ["$age", 18] }, then: "Adult", else: "Minor" }
      }
    }
  }
])
```

---

# 🧩 Combined Example: `$match` + `$project`

Find **female users** from **China**, and show only their **full name**, **age**, and **salary** with a 10% bonus.

```js
db.users.aggregate([
  { $match: { gender: "Female", "address.country": "China" } },
  {
    $project: {
      _id: 0,
      fullName: { $concat: ["$name.firstName", " ", "$name.lastName"] },
      age: 1,
      salary: 1,
      bonusSalary: { $multiply: ["$salary", 1.1] }
    }
  }
])
```

✅ Example output:

```json
[
  { "fullName": "Kaela Kenan", "age": 25, "salary": 482, "bonusSalary": 530.2 },
  { "fullName": "Kordula Tacker", "age": 28, "salary": 493, "bonusSalary": 542.3 }
]
```

---

## 🧠 Summary Table

| Stage                    | Purpose                        | Example                                                             |
| ------------------------ | ------------------------------ | ------------------------------------------------------------------- |
| `$match`                 | Filters documents              | `{ $match: { age: { $gt: 30 } } }`                                  |
| `$project`               | Selects or reshapes fields     | `{ $project: { name: 1, _id: 0 } }`                                 |
| `$project` + expressions | Add computed or renamed fields | `{ $project: { fullName: { $concat: ["$first", " ", "$last"] } } }` |

---

## 💡 Pro Tip

Always place `$match` **before** `$project` when possible.
MongoDB filters early to reduce the number of documents flowing through the pipeline — this improves performance.

