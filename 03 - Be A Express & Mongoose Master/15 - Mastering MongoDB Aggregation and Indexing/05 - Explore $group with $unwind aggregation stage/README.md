combining **`$group`** with **`$unwind`** is one of the most powerful and practical ways to analyze **array data** in MongoDB.

Let’s explore in depth how `$unwind` works with `$group` (using your `users` collection from `practice-data.json`).

---

## 🧠 What `$unwind` Does

The `$unwind` stage **deconstructs an array field** —
it takes one document with an array and outputs **multiple documents**, one for each element of that array.

Then, `$group` can **aggregate** over those individual array elements.

---

### Example Array Document

Imagine one document looks like this 👇

```js
{
  name: { firstName: "Mariele", lastName: "Dangl" },
  gender: "Female",
  skills: [
    { name: "JAVASCRIPT", level: "Expert" },
    { name: "C#", level: "Intermediate" },
    { name: "GO", level: "Beginner" }
  ]
}
```

---

# 🟣 1. `$unwind` — Expanding the Array

### Basic syntax:

```js
{ $unwind: "$skills" }
```

### What it does:

It turns the single document above into **three documents**, like this:

```js
{ name: "Mariele", gender: "Female", skills: { name: "JAVASCRIPT", level: "Expert" } }
{ name: "Mariele", gender: "Female", skills: { name: "C#", level: "Intermediate" } }
{ name: "Mariele", gender: "Female", skills: { name: "GO", level: "Beginner" } }
```

➡️ Each skill becomes a **separate document** in the aggregation pipeline.

---

# 🟢 2. `$group` After `$unwind`

Once `$unwind` flattens arrays, `$group` can be used to **aggregate** the individual elements (skills, tags, hobbies, etc.)

---

### ✅ Example 1: Count how many users have each skill

```js
db.users.aggregate([
  { $unwind: "$skills" },
  {
    $group: {
      _id: "$skills.name",
      totalUsers: { $sum: 1 }
    }
  },
  { $sort: { totalUsers: -1 } }
])
```

✅ Output Example:

```json
[
  { "_id": "JAVASCRIPT", "totalUsers": 20 },
  { "_id": "PYTHON", "totalUsers": 18 },
  { "_id": "GO", "totalUsers": 15 },
  { "_id": "C#", "totalUsers": 10 }
]
```

🧠 **Explanation:**

* `$unwind` turns each user’s skills array into multiple docs.
* `$group` groups by skill name.
* `$sum: 1` counts how many users have that skill.

---

### ✅ Example 2: Group by skill and find average salary of users who know it

```js
db.users.aggregate([
  { $unwind: "$skills" },
  {
    $group: {
      _id: "$skills.name",
      avgSalary: { $avg: "$salary" },
      totalUsers: { $sum: 1 }
    }
  },
  { $sort: { avgSalary: -1 } }
])
```

✅ Output:

```json
[
  { "_id": "GO", "avgSalary": 490, "totalUsers": 8 },
  { "_id": "JAVA", "avgSalary": 460, "totalUsers": 15 },
  { "_id": "PYTHON", "avgSalary": 350, "totalUsers": 12 }
]
```

🧠 Now you can analyze **which skill correlates with higher average salary**!

---

### ✅ Example 3: List all users who have a particular skill

```js
db.users.aggregate([
  { $unwind: "$skills" },
  { $match: { "skills.name": "GO" } },
  {
    $group: {
      _id: "$skills.name",
      users: { $push: "$name.firstName" }
    }
  }
])
```

✅ Output:

```json
[
  { "_id": "GO", "users": ["Mariele", "Kaela", "Hendrik", "Candy"] }
]
```

---

# 🔵 3. `$unwind` Options

You can customize `$unwind` behavior using these options:

### ✅ Preserve documents without the array

If some documents don’t have a `skills` array, you can still keep them:

```js
{ $unwind: { path: "$skills", preserveNullAndEmptyArrays: true } }
```

✅ This ensures no documents are lost, even if `skills` doesn’t exist or is empty.

---

### ✅ Include array index (position)

```js
{ $unwind: { path: "$skills", includeArrayIndex: "skillIndex" } }
```

✅ Adds a new field `skillIndex` to show the position of each skill in the array (0, 1, 2, …).

---

# 🧩 4. Combine `$match`, `$unwind`, `$group`, and `$project`

Let’s find:

> “How many *expert-level* users exist per skill, and list their names.”

```js
db.users.aggregate([
  { $unwind: "$skills" },
  { $match: { "skills.level": "Expert" } },
  {
    $group: {
      _id: "$skills.name",
      expertCount: { $sum: 1 },
      experts: { $push: "$name.firstName" }
    }
  },
  { $sort: { expertCount: -1 } }
])
```

✅ Output:

```json
[
  { "_id": "JAVASCRIPT", "expertCount": 10, "experts": ["Mariele", "Kordula", "Kaela", ...] },
  { "_id": "GO", "expertCount": 8, "experts": ["Hendrik", "Candy", ...] },
  { "_id": "JAVA", "expertCount": 6, "experts": ["Vanya", "David", ...] }
]
```

---

# ⚙️ Why `$unwind + $group` Is Powerful

| Use Case                   | Description                            |
| -------------------------- | -------------------------------------- |
| **Count array values**     | Find how many users have each skill    |
| **Aggregate numeric data** | Average salary, total skill counts     |
| **Find unique values**     | Use `$addToSet` instead of `$push`     |
| **Flatten nested arrays**  | Convert array data into a tabular form |

---

# 🧠 Quick Summary

| Stage     | Purpose                               | Example                                                   |
| --------- | ------------------------------------- | --------------------------------------------------------- |
| `$unwind` | Breaks array into separate documents  | `{ $unwind: "$skills" }`                                  |
| `$group`  | Regroups data by field or expression  | `{ $group: { _id: "$skills.name", total: { $sum: 1 } } }` |
| `$sum`    | Counts or adds values during grouping | `{ total: { $sum: 1 } }`                                  |
| `$push`   | Collects values into an array         | `{ users: { $push: "$name.firstName" } }`                 |

---

# 🧩 Real-World Example

> Find **each country’s most popular skill** and how many users have it.

```js
db.users.aggregate([
  { $unwind: "$skills" },
  {
    $group: {
      _id: { country: "$address.country", skill: "$skills.name" },
      totalUsers: { $sum: 1 }
    }
  },
  { $sort: { totalUsers: -1 } },
  {
    $group: {
      _id: "$_id.country",
      topSkill: { $first: "$_id.skill" },
      usersWithSkill: { $first: "$totalUsers" }
    }
  }
])
```

✅ Output:

```json
[
  { "_id": "China", "topSkill": "JAVASCRIPT", "usersWithSkill": 20 },
  { "_id": "Brazil", "topSkill": "GO", "usersWithSkill": 10 },
  { "_id": "Bangladesh", "topSkill": "PYTHON", "usersWithSkill": 8 }
]
```