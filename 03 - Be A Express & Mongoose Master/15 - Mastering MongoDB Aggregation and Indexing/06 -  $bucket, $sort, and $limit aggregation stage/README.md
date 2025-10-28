learning **three key aggregation stages** in MongoDB that are used for **data grouping, sorting, and limiting results**:
👉 `$bucket`, `$sort`, and `$limit`.

These stages help you perform **data segmentation**, **ranking**, and **pagination** — all inside the aggregation pipeline.

Let’s go step-by-step with practical examples using your familiar `users` collection (`practice-data.json`).

---

## 🧠 1. `$bucket` — Group Data into Ranges (Buckets)

The `$bucket` stage is like SQL’s `CASE` or Excel’s histogram feature —
it groups numeric values into **predefined ranges** (called *buckets*).

---

### 🧩 Syntax

```js
{
  $bucket: {
    groupBy: <expression>,       // field or computed value to group by
    boundaries: [ <min>, <b1>, <b2>, <max> ], // bucket edges
    default: <label>,            // optional "other" bucket
    output: { <field>: { <accumulator> } }
  }
}
```

* **`groupBy`** → the numeric field used to group data
* **`boundaries`** → numeric breakpoints (buckets are half-open intervals `[start, end)`)
* **`default`** → optional bucket name for out-of-range values
* **`output`** → aggregated values inside each bucket

---

### ✅ Example 1: Bucket users by **age ranges**

```js
db.users.aggregate([
  {
    $bucket: {
      groupBy: "$age",
      boundaries: [0, 18, 30, 50, 100],
      default: "Unknown",
      output: {
        totalUsers: { $sum: 1 },
        avgSalary: { $avg: "$salary" }
      }
    }
  }
])
```

✅ **Output Example:**

```json
[
  { "_id": 0, "totalUsers": 12, "avgSalary": 180 },
  { "_id": 18, "totalUsers": 25, "avgSalary": 310 },
  { "_id": 30, "totalUsers": 35, "avgSalary": 410 },
  { "_id": 50, "totalUsers": 10, "avgSalary": 390 }
]
```

🧠 **Meaning:**

* Users aged 0–17 → first bucket
* 18–29 → second
* 30–49 → third
* 50–99 → fourth

---

### ✅ Example 2: Bucket by salary ranges

```js
db.users.aggregate([
  {
    $bucket: {
      groupBy: "$salary",
      boundaries: [0, 200, 400, 600],
      default: "Other",
      output: { totalUsers: { $sum: 1 } }
    }
  }
])
```

✅ Output Example:

```json
[
  { "_id": 0, "totalUsers": 15 },     // salary < 200
  { "_id": 200, "totalUsers": 40 },   // 200–399
  { "_id": 400, "totalUsers": 25 },   // 400–599
  { "_id": "Other", "totalUsers": 5 } // others
]
```

---

### ✅ Example 3: `$bucket` + `$project` for labeling

You can rename the buckets with readable labels using `$project`:

```js
db.users.aggregate([
  {
    $bucket: {
      groupBy: "$age",
      boundaries: [0, 18, 30, 50, 100],
      default: "Unknown",
      output: { totalUsers: { $sum: 1 } }
    }
  },
  {
    $project: {
      ageRange: {
        $switch: {
          branches: [
            { case: { $eq: ["$_id", 0] }, then: "0–17" },
            { case: { $eq: ["$_id", 18] }, then: "18–29" },
            { case: { $eq: ["$_id", 30] }, then: "30–49" },
            { case: { $eq: ["$_id", 50] }, then: "50+" }
          ],
          default: "Unknown"
        }
      },
      totalUsers: 1,
      _id: 0
    }
  }
])
```

✅ Output:

```json
[
  { "ageRange": "0–17", "totalUsers": 12 },
  { "ageRange": "18–29", "totalUsers": 25 },
  { "ageRange": "30–49", "totalUsers": 35 },
  { "ageRange": "50+", "totalUsers": 10 }
]
```

---

## 🟦 2. `$sort` — Sort Documents

The `$sort` stage sorts documents by one or more fields.

---

### 🧩 Syntax

```js
{ $sort: { <field1>: <direction>, <field2>: <direction> } }
```

* Direction:

  * `1` → ascending
  * `-1` → descending

---

### ✅ Example 1: Sort users by **age (descending)**

```js
db.users.aggregate([
  { $sort: { age: -1 } }
])
```

---

### ✅ Example 2: Sort by **country ascending**, **salary descending**

```js
db.users.aggregate([
  { $sort: { "address.country": 1, salary: -1 } }
])
```

✅ Output: Sorted first by `country` (A → Z), then by salary (high → low).

---

### ✅ Example 3: Sort aggregated data

After `$group`, you can sort results by totals or averages.

```js
db.users.aggregate([
  { $group: { _id: "$address.country", totalUsers: { $sum: 1 } } },
  { $sort: { totalUsers: -1 } }
])
```

✅ Shows countries with most users first.

---

## 🟩 3. `$limit` — Restrict Number of Documents

The `$limit` stage controls how many documents you want to pass to the next stage (or to the final result).

---

### 🧩 Syntax

```js
{ $limit: <number> }
```

---

### ✅ Example 1: Get top 5 oldest users

```js
db.users.aggregate([
  { $sort: { age: -1 } },
  { $limit: 5 },
  { $project: { _id: 0, name: 1, age: 1 } }
])
```

✅ Output Example:

```json
[
  { "name": { "firstName": "Sharyl", "lastName": "Rivalland" }, "age": 87 },
  { "name": { "firstName": "Vanya", "lastName": "Kardos-Stowe" }, "age": 75 },
  { "name": { "firstName": "Hendrik", "lastName": "Rathbone" }, "age": 72 },
  { "name": { "firstName": "Candy", "lastName": "Peaker" }, "age": 70 },
  { "name": { "firstName": "Nerta", "lastName": "Bartod" }, "age": 68 }
]
```

---

### ✅ Example 2: Combine with `$sort` and `$project`

```js
db.users.aggregate([
  { $sort: { salary: -1 } },
  { $limit: 3 },
  { $project: { _id: 0, name: 1, salary: 1 } }
])
```

✅ Output Example:

```json
[
  { "name": "Candy Peaker", "salary": 499 },
  { "name": "Kordula Tacker", "salary": 493 },
  { "name": "Kaela Kenan", "salary": 482 }
]
```

---

## 🧩 Combined Example — `$bucket`, `$sort`, `$limit`

> “Group users by age ranges, sort by total users (descending), and show only top 3 groups.”

```js
db.users.aggregate([
  {
    $bucket: {
      groupBy: "$age",
      boundaries: [0, 18, 30, 50, 100],
      default: "Unknown",
      output: { totalUsers: { $sum: 1 }, avgSalary: { $avg: "$salary" } }
    }
  },
  { $sort: { totalUsers: -1 } },
  { $limit: 3 }
])
```

✅ Output:

```json
[
  { "_id": 30, "totalUsers": 35, "avgSalary": 410 },
  { "_id": 18, "totalUsers": 25, "avgSalary": 310 },
  { "_id": 50, "totalUsers": 10, "avgSalary": 390 }
]
```

---

## 🧠 Summary Table

| Stage     | Purpose                                | Example                                                          |
| --------- | -------------------------------------- | ---------------------------------------------------------------- |
| `$bucket` | Group numeric values into ranges       | `{ $bucket: { groupBy: "$age", boundaries: [0,18,30,50,100] } }` |
| `$sort`   | Sort documents by one or more fields   | `{ $sort: { age: -1 } }`                                         |
| `$limit`  | Restrict number of documents in output | `{ $limit: 5 }`                                                  |

---

## 💡 Pro Tips

✅ Place `$match` **before `$bucket`** for performance — filter early.
✅ Combine `$sort` + `$limit` to make “Top N” reports (Top 5 countries, Top 10 salaries, etc.).
✅ `$bucket` is great for **age bands**, **price tiers**, or **salary segments** in analytics dashboards.
