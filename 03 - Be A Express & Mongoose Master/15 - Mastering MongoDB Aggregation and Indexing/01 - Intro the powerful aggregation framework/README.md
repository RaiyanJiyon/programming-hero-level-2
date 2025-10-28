## 🧠 What Is the Aggregation Framework?

The **MongoDB Aggregation Framework** is a **data processing and analysis pipeline** that allows you to:

✅ Transform,
✅ Filter,
✅ Group,
✅ Sort,
✅ Calculate,
✅ and Reshape data — all **inside MongoDB**.

Think of it as **SQL’s `GROUP BY + WHERE + ORDER BY + SUM()`**, but **way more powerful** and **document-oriented**.

---

## ⚙️ Why Use Aggregation?

Because it’s **faster, more efficient**, and **more flexible** than running multiple find() queries and processing results in your app code.

Aggregation:

* Runs **inside the database engine**
* Minimizes data transfer
* Can handle **complex analytics**

---

## 🧩 Basic Structure

The aggregation pipeline is a **series of stages** that process documents **step-by-step**.

```js
db.collection.aggregate([
  { <stage1> },
  { <stage2> },
  { <stage3> },
  ...
])
```

Each stage takes the input documents, performs some operation, and passes the results to the next stage.

---

## 🚀 Common Stages in the Aggregation Pipeline

| Stage        | Description                                | Example                                                                                    |
| ------------ | ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `$match`     | Filters documents (like `find()`)          | `{ $match: { gender: "Male" } }`                                                           |
| `$project`   | Selects or reshapes fields                 | `{ $project: { name: 1, age: 1, _id: 0 } }`                                                |
| `$group`     | Groups by a field and applies accumulators | `{ $group: { _id: "$country", total: { $sum: 1 } } }`                                      |
| `$sort`      | Sorts documents                            | `{ $sort: { age: -1 } }`                                                                   |
| `$limit`     | Limits the number of results               | `{ $limit: 5 }`                                                                            |
| `$skip`      | Skips a number of documents                | `{ $skip: 10 }`                                                                            |
| `$count`     | Counts documents that pass through         | `{ $count: "totalUsers" }`                                                                 |
| `$lookup`    | Joins with another collection              | `{ $lookup: { from: "orders", localField: "_id", foreignField: "userId", as: "orders" } }` |
| `$unwind`    | Flattens arrays                            | `{ $unwind: "$skills" }`                                                                   |
| `$addFields` | Adds or modifies fields dynamically        | `{ $addFields: { fullName: { $concat: ["$firstName", " ", "$lastName"] } } }`              |

---

## 🔹 1. `$match` – Filter Documents

```js
db.users.aggregate([
  { $match: { gender: "Female" } }
])
```

➡️ Only passes female users to the next stage.

---

## 🔹 2. `$project` – Select or Rename Fields

```js
db.users.aggregate([
  { $project: { _id: 0, name: 1, age: 1, country: 1 } }
])
```

➡️ Returns only specific fields from each document.

---

## 🔹 3. `$group` – Group and Aggregate Data

```js
db.users.aggregate([
  {
    $group: {
      _id: "$country",           // group by country
      totalUsers: { $sum: 1 },   // count users per country
      avgAge: { $avg: "$age" }   // average age per country
    }
  }
])
```

✅ Example output:

```json
[
  { "_id": "China", "totalUsers": 50, "avgAge": 37.8 },
  { "_id": "Brazil", "totalUsers": 30, "avgAge": 34.5 }
]
```

---

## 🔹 4. `$sort`, `$limit`, `$skip`

Example: Show **top 5 oldest users**

```js
db.users.aggregate([
  { $sort: { age: -1 } },
  { $limit: 5 },
  { $project: { _id: 0, name: 1, age: 1 } }
])
```

---

## 🔹 5. `$lookup` – Join Two Collections (like SQL JOIN)

If you have another collection `orders`:

```js
{
  userId: ObjectId("..."),
  amount: 250,
  date: "2025-10-25"
}
```

You can join it like this:

```js
db.users.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "userId",
      as: "orders"
    }
  }
])
```

➡️ Each user document will now have an **array field `orders`** containing matching order documents.

---

## 🔹 6. `$unwind` – Break Apart Array Fields

Flatten arrays to process each element individually.

```js
db.users.aggregate([
  { $unwind: "$skills" },
  { $project: { "skills.name": 1, "skills.level": 1, name: 1 } }
])
```

➡️ Each skill becomes a separate document in the output.

---

## 🧠 Aggregation Example — Combine Everything

Let’s calculate the **average salary of Male users from China**, sorted by descending salary:

```js
db.users.aggregate([
  { $match: { gender: "Male", "address.country": "China" } },
  { $group: { _id: null, avgSalary: { $avg: "$salary" } } },
  { $project: { _id: 0, avgSalary: 1 } }
])
```

✅ Output:

```json
{ "avgSalary": 358.7 }
```

---

## ⚙️ Why It’s Powerful

* You can chain unlimited transformations
* Runs **server-side**, so it’s very fast
* Handles **data analysis**, **joins**, **grouping**, **filtering**, and **reshaping**
* Works like a **mini data warehouse** inside MongoDB

---

## 🧩 Summary Table

| Operator   | Purpose                     | Example                                               |
| ---------- | --------------------------- | ----------------------------------------------------- |
| `$match`   | Filter documents            | `{ $match: { age: { $gt: 30 } } }`                    |
| `$project` | Select/reshape fields       | `{ $project: { name: 1, _id: 0 } }`                   |
| `$group`   | Aggregate (sum, avg, count) | `{ $group: { _id: "$country", total: { $sum: 1 } } }` |
| `$sort`    | Sort results                | `{ $sort: { age: -1 } }`                              |
| `$lookup`  | Join collections            | `{ $lookup: { from: "orders", ... } }`                |
| `$unwind`  | Expand arrays               | `{ $unwind: "$skills" }`                              |