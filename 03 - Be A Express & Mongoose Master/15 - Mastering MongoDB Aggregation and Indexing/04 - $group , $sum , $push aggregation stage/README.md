👉 `$group`, `$sum`, and `$push`

These stages let you **summarize, count, and collect data** just like SQL’s `GROUP BY`, `SUM()`, or `ARRAY_AGG()`.

Let’s master them step by step using your `users` collection (`practice-data.json`) as reference.

---

## 🧠 The `$group` Stage — Overview

`$group` groups documents by a field (or expression) and allows you to apply **aggregate functions** like `$sum`, `$avg`, `$max`, `$min`, `$push`, etc.

---

### 🧩 Syntax

```js
{
  $group: {
    _id: <expression>,         // field to group by
    <newField>: { <accumulator>: <expression> },
    ...
  }
}
```

* `_id`: The **grouping key** (similar to SQL `GROUP BY`)
* Accumulator operators: `$sum`, `$avg`, `$push`, `$addToSet`, `$max`, `$min`, etc.

---

# 🟢 1. `$group` + `$sum` — Counting & Summing

### ✅ Example 1: Count users by gender

```js
db.users.aggregate([
  {
    $group: {
      _id: "$gender",           // group by gender
      totalUsers: { $sum: 1 }   // add +1 for each user
    }
  }
])
```

✅ Output:

```json
[
  { "_id": "Male", "totalUsers": 60 },
  { "_id": "Female", "totalUsers": 40 }
]
```

🧠 `$sum: 1` counts documents (like `COUNT(*)` in SQL).

---

### ✅ Example 2: Calculate total salary by country

```js
db.users.aggregate([
  {
    $group: {
      _id: "$address.country",
      totalSalary: { $sum: "$salary" }
    }
  }
])
```

✅ Output:

```json
[
  { "_id": "China", "totalSalary": 17820 },
  { "_id": "Brazil", "totalSalary": 12450 },
  { "_id": "Bangladesh", "totalSalary": 8900 }
]
```

🧩 `$sum: "$salary"` adds all `salary` values in each country group.

---

### ✅ Example 3: Multiple aggregations in one group

```js
db.users.aggregate([
  {
    $group: {
      _id: "$address.country",
      totalUsers: { $sum: 1 },
      totalSalary: { $sum: "$salary" },
      avgSalary: { $avg: "$salary" }
    }
  }
])
```

✅ Output:

```json
[
  { "_id": "China", "totalUsers": 50, "totalSalary": 17820, "avgSalary": 356.4 },
  { "_id": "Brazil", "totalUsers": 25, "totalSalary": 9200, "avgSalary": 368.0 }
]
```

---

# 🟣 2. `$push` — Collect values into an array

The `$push` operator collects **all values** from grouped documents into an **array**.

---

### ✅ Example 1: List all users’ names grouped by country

```js
db.users.aggregate([
  {
    $group: {
      _id: "$address.country",
      users: { $push: "$name.firstName" }
    }
  }
])
```

✅ Output:

```json
[
  { "_id": "China", "users": ["Kaela", "Kordula", "Mariele", ...] },
  { "_id": "Brazil", "users": ["Candy", "Cacilie", "Nerta"] }
]
```

🧠 `$push` collects **all values**, even duplicates.

---

### ✅ Example 2: Collect entire objects

```js
db.users.aggregate([
  {
    $group: {
      _id: "$address.country",
      userDetails: {
        $push: {
          name: "$name.firstName",
          age: "$age",
          salary: "$salary"
        }
      }
    }
  }
])
```

✅ Output:

```json
[
  {
    "_id": "China",
    "userDetails": [
      { "name": "Kaela", "age": 25, "salary": 482 },
      { "name": "Kordula", "age": 28, "salary": 493 }
    ]
  }
]
```

---

### ✅ Example 3: `$push` + `$sum` together

```js
db.users.aggregate([
  {
    $group: {
      _id: "$gender",
      totalSalary: { $sum: "$salary" },
      employees: { $push: "$name.firstName" }
    }
  }
])
```

✅ Output:

```json
[
  { "_id": "Male", "totalSalary": 12000, "employees": ["John", "David", "Ali"] },
  { "_id": "Female", "totalSalary": 13500, "employees": ["Kaela", "Kordula", "Candy"] }
]
```

---

# 🔵 3. Combining `$group`, `$sum`, `$push` with `$project`

After grouping, you can reshape or rename the output.

### ✅ Example: Sort + project

```js
db.users.aggregate([
  { $group: { _id: "$address.country", totalUsers: { $sum: 1 } } },
  { $project: { _id: 0, country: "$_id", totalUsers: 1 } },
  { $sort: { totalUsers: -1 } }
])
```

✅ Output:

```json
[
  { "country": "China", "totalUsers": 50 },
  { "country": "Brazil", "totalUsers": 25 }
]
```

---

# 🧠 Summary Table

| Stage / Operator | Purpose                                  | Example                                               |
| ---------------- | ---------------------------------------- | ----------------------------------------------------- |
| `$group`         | Group documents and perform calculations | `{ $group: { _id: "$country", total: { $sum: 1 } } }` |
| `$sum`           | Add numeric values or count              | `{ totalSalary: { $sum: "$salary" } }`                |
| `$push`          | Create arrays from grouped documents     | `{ users: { $push: "$name" } }`                       |

---

# 🧩 Realistic Combined Example

👉 “Group users by country, count how many, calculate total salary, and list all user names.”

```js
db.users.aggregate([
  {
    $group: {
      _id: "$address.country",
      totalUsers: { $sum: 1 },
      totalSalary: { $sum: "$salary" },
      users: { $push: "$name.firstName" }
    }
  },
  { $sort: { totalUsers: -1 } }
])
```

✅ Output:

```json
[
  {
    "_id": "China",
    "totalUsers": 50,
    "totalSalary": 17820,
    "users": ["Kaela", "Kordula", "Mariele", "Candy", ...]
  },
  {
    "_id": "Brazil",
    "totalUsers": 25,
    "totalSalary": 12450,
    "users": ["Cacilie", "Nerta", "Sharyl", ...]
  }
]
```

---

# ⚙️ Comparison with SQL

| SQL                | MongoDB                       |
| ------------------ | ----------------------------- |
| `GROUP BY country` | `$group: { _id: "$country" }` |
| `COUNT(*)`         | `$sum: 1`                     |
| `SUM(salary)`      | `$sum: "$salary"`             |
| `ARRAY_AGG(name)`  | `$push: "$name"`              |

---

✅ **Summary Takeaway**

* `$group` — groups data (like SQL `GROUP BY`)
* `$sum` — counts or totals numeric values
* `$push` — collects values into arrays
* Combine them for reporting, summaries, and analytics directly inside MongoDB!

