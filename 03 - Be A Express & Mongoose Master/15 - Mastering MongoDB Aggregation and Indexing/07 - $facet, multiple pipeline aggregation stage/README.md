👉 **`$facet`** and **multiple pipelines** — the secret behind **multi-view analytics in one query** 💥

These stages let you run **multiple aggregations in parallel** (inside one pipeline), so you can produce **different summaries or insights** from the same dataset **in one query**.

Let’s dive deep using your familiar `users` collection (`practice-data.json`).

---

## 🧠 What Is `$facet`?

The `$facet` stage allows you to **run multiple sub-pipelines (mini aggregations)** in parallel on the **same input documents**, and return **all their results together** in one output document.

Think of `$facet` like a **dashboard** — one query, multiple charts:

* Total users
* Average salary
* Age distribution
* Gender breakdown
  All in a single aggregation.

---

### 🧩 Syntax

```js
{
  $facet: {
    <facetName1>: [ <pipeline1> ],
    <facetName2>: [ <pipeline2> ],
    ...
  }
}
```

Each **facet** runs its own **mini pipeline** of aggregation stages (e.g., `$match`, `$group`, `$sort`, `$limit`, etc.)

---

## 🟢 Example 1: Multiple Pipelines in `$facet`

> “I want to see:
>
> * Total number of users
> * Average salary by gender
> * Age distribution buckets”

```js
db.users.aggregate([
  {
    $facet: {
      // 1️⃣ Total user count
      totalUsers: [
        { $count: "count" }
      ],

      // 2️⃣ Average salary by gender
      avgSalaryByGender: [
        { $group: { _id: "$gender", avgSalary: { $avg: "$salary" } } },
        { $sort: { avgSalary: -1 } }
      ],

      // 3️⃣ Age distribution buckets
      ageDistribution: [
        {
          $bucket: {
            groupBy: "$age",
            boundaries: [0, 18, 30, 50, 100],
            default: "Unknown",
            output: { totalUsers: { $sum: 1 } }
          }
        }
      ]
    }
  }
])
```

✅ **Output Example:**

```json
[
  {
    "totalUsers": [ { "count": 100 } ],
    "avgSalaryByGender": [
      { "_id": "Female", "avgSalary": 380 },
      { "_id": "Male", "avgSalary": 340 }
    ],
    "ageDistribution": [
      { "_id": 0, "totalUsers": 12 },
      { "_id": 18, "totalUsers": 25 },
      { "_id": 30, "totalUsers": 40 },
      { "_id": 50, "totalUsers": 15 }
    ]
  }
]
```

🧠 You get **3 different aggregations** in **one query result** —
each facet acts like a separate pipeline, all from the same `users` collection.

---

## 🟣 Example 2: `$facet` for Dashboard Statistics

> “Build a dashboard summary showing top countries, top earners, and gender ratio.”

```js
db.users.aggregate([
  {
    $facet: {
      topCountries: [
        { $group: { _id: "$address.country", totalUsers: { $sum: 1 } } },
        { $sort: { totalUsers: -1 } },
        { $limit: 5 }
      ],

      topEarners: [
        { $sort: { salary: -1 } },
        { $limit: 5 },
        { $project: { _id: 0, name: 1, salary: 1, "address.country": 1 } }
      ],

      genderBreakdown: [
        { $group: { _id: "$gender", count: { $sum: 1 } } },
        { $project: { _id: 0, gender: "$_id", count: 1 } }
      ]
    }
  }
])
```

✅ **Output Example:**

```json
[
  {
    "topCountries": [
      { "_id": "China", "totalUsers": 50 },
      { "_id": "Brazil", "totalUsers": 25 }
    ],
    "topEarners": [
      { "name": { "firstName": "Candy", "lastName": "Peaker" }, "salary": 499, "address": { "country": "China" } },
      { "name": { "firstName": "Kordula", "lastName": "Tacker" }, "salary": 493, "address": { "country": "Brazil" } }
    ],
    "genderBreakdown": [
      { "gender": "Male", "count": 60 },
      { "gender": "Female", "count": 40 }
    ]
  }
]
```

🧠 All 3 analytics pipelines (`topCountries`, `topEarners`, `genderBreakdown`) run in **parallel** and return together!

---

## 🔵 Example 3: `$facet` + `$unwind` + `$group`

> “Show skill usage summary and top 3 most common skills.”

```js
db.users.aggregate([
  { $unwind: "$skills" },
  {
    $facet: {
      skillStats: [
        { $group: { _id: "$skills.name", totalUsers: { $sum: 1 } } },
        { $sort: { totalUsers: -1 } }
      ],
      topSkills: [
        { $group: { _id: "$skills.name", totalUsers: { $sum: 1 } } },
        { $sort: { totalUsers: -1 } },
        { $limit: 3 }
      ]
    }
  }
])
```

✅ **Output Example:**

```json
[
  {
    "skillStats": [
      { "_id": "JAVASCRIPT", "totalUsers": 20 },
      { "_id": "PYTHON", "totalUsers": 18 },
      { "_id": "GO", "totalUsers": 15 }
    ],
    "topSkills": [
      { "_id": "JAVASCRIPT", "totalUsers": 20 },
      { "_id": "PYTHON", "totalUsers": 18 },
      { "_id": "GO", "totalUsers": 15 }
    ]
  }
]
```

---

## 🧩 Why `$facet` Is So Powerful

| Feature                                                    | Description                                                   |
| ---------------------------------------------------------- | ------------------------------------------------------------- |
| 🧠 Multi-pipeline analytics                                | Run many analyses in parallel from same source                |
| ⚡ One query, many insights                                 | Reduces round-trips between app & database                    |
| 💾 Works great with `$bucket`, `$group`, `$sort`, `$limit` | Perfect for dashboard data                                    |
| 🔍 Clean output                                            | Returns all pipelines as separate fields in a single document |

---

## 🧠 Pro Tips

✅ `$facet` **always returns an array** with a single object containing your facet results.
✅ Each facet pipeline runs **independently**, but on the same initial dataset.
✅ Combine `$facet` with `$match` or `$project` before it for better performance (filter early!).
✅ Perfect for building **analytics APIs** (e.g., user stats, sales dashboards, skill breakdowns, etc.)

---

## 💡 Real-World Example: “User Analytics Dashboard”

```js
db.users.aggregate([
  {
    $facet: {
      totalUsers: [ { $count: "count" } ],
      avgSalary: [ { $group: { _id: null, avgSalary: { $avg: "$salary" } } } ],
      topCountries: [
        { $group: { _id: "$address.country", total: { $sum: 1 } } },
        { $sort: { total: -1 } },
        { $limit: 3 }
      ],
      genderRatio: [
        { $group: { _id: "$gender", total: { $sum: 1 } } },
        { $project: { _id: 0, gender: "$_id", total: 1 } }
      ]
    }
  }
])
```

✅ **Output:**

```json
[
  {
    "totalUsers": [ { "count": 100 } ],
    "avgSalary": [ { "avgSalary": 372.5 } ],
    "topCountries": [
      { "_id": "China", "total": 50 },
      { "_id": "Brazil", "total": 25 },
      { "_id": "Bangladesh", "total": 15 }
    ],
    "genderRatio": [
      { "gender": "Male", "total": 60 },
      { "gender": "Female", "total": 40 }
    ]
  }
]
```

✅ All your analytics in **one single query** 🎯

---

## 🧠 Summary Table

| Stage              | Purpose                             | Example                                              |
| ------------------ | ----------------------------------- | ---------------------------------------------------- |
| `$facet`           | Run multiple pipelines in parallel  | `{ $facet: { pipeline1: [...], pipeline2: [...] } }` |
| `$group`           | Aggregate results inside each facet | `{ $group: { _id: "$gender", total: { $sum: 1 } } }` |
| `$sort` / `$limit` | Rank or limit inside facets         | `{ $sort: { total: -1 } }`, `{ $limit: 5 }`          |

---

✅ **In short:**
`$facet` = “Run many aggregation pipelines in one go.”

It’s **perfect** for:

* Dashboard queries
* Summary reports
* Combined analytics (counts, averages, top-N, etc.)

