👉 **Compound Indexes** (for multi-field queries)
👉 **Text Indexes** (for full-text search)

Let’s explore both clearly and deeply with examples 👇

---

# 🧩 1️⃣ Compound Indexes

---

## 🧠 What is a Compound Index?

A **compound index** is an index on **multiple fields** in a document.
It helps MongoDB efficiently handle queries that filter or sort by **more than one field**.

Example:

```js
db.users.createIndex({ age: 1, gender: 1 })
```

👉 This index stores documents sorted **first by `age`**, then by **`gender`** (inside each age group).

---

## ⚙️ Syntax

```js
db.collection.createIndex({ field1: 1, field2: -1, ... })
```

* `1` → ascending order
* `-1` → descending order

---

## 🧩 Example Dataset

```js
[
  { name: "Alice", age: 25, gender: "Female", country: "USA" },
  { name: "Bob", age: 30, gender: "Male", country: "UK" },
  { name: "Kaela", age: 25, gender: "Female", country: "Bangladesh" }
]
```

---

## ✅ Example 1: Create Compound Index

```js
db.users.createIndex({ age: 1, gender: 1 })
```

---

## ✅ Example 2: Query Using Both Fields

```js
db.users.find({ age: 25, gender: "Female" })
```

✅ This query **fully uses** the compound index.

MongoDB uses an **Index Scan (IXSCAN)**:

```json
"winningPlan": { "stage": "IXSCAN", "keyPattern": { "age": 1, "gender": 1 } }
```

---

## ⚠️ Important: Order Matters

The order of fields in a compound index determines **which queries can use it**.

For `{ age: 1, gender: 1 }`:

| Query                                  | Uses Index? | Reason                        |
| -------------------------------------- | ----------- | ----------------------------- |
| `{ age: 25, gender: "Female" }`        | ✅           | Both fields match             |
| `{ age: 25 }`                          | ✅           | Matches prefix (age)          |
| `{ gender: "Female" }`                 | ❌           | Misses first field (age)      |
| `{ gender: "Female", age: 25 }`        | ✅           | Order in query doesn’t matter |
| `{ gender: "Female", country: "USA" }` | ❌           | Skips first indexed field     |

🧠 **Prefix Rule:**
MongoDB can use a compound index as long as the query uses **a prefix of the indexed fields** (starting from the left).

---

## ✅ Example 3: Compound Index for Sorting

```js
db.users.createIndex({ age: 1, name: 1 })

db.users.find().sort({ age: 1, name: 1 })
```

✅ This query will use the index.

But:

```js
db.users.find().sort({ name: 1, age: 1 })
```

❌ Order doesn’t match index → **Index not used**

---

## ✅ Example 4: Compound Index for Range Queries

```js
db.users.createIndex({ country: 1, age: 1 })

db.users.find({ country: "Bangladesh", age: { $gte: 25, $lte: 40 } })
```

✅ Efficient — uses both fields in index.

But:

```js
db.users.find({ age: { $gte: 25, $lte: 40 }, country: "Bangladesh" })
```

✅ Still uses the same index because MongoDB reorders filters internally.

---

## ⚡ Compound Index Summary

| Feature         | Description                              |
| --------------- | ---------------------------------------- |
| Multiple fields | Stores sorted order by multiple keys     |
| Order matters   | `{ a: 1, b: 1 }` ≠ `{ b: 1, a: 1 }`      |
| Prefix rule     | Leftmost fields must appear in the query |
| Helps with      | Filtering, sorting, range queries        |

---

# 🔍 2️⃣ Text Indexes — Full Text Search

---

## 🧠 What is a Text Index?

A **text index** allows you to perform **searches inside text fields** —
similar to Google-style search, including **words, stems, and phrases**.

---

## ⚙️ Syntax

```js
db.collection.createIndex({ field: "text" })
```

Or for multiple fields:

```js
db.articles.createIndex({ title: "text", content: "text" })
```

---

## 🧩 Example Dataset

```js
db.articles.insertMany([
  { title: "MongoDB Basics", content: "Learn MongoDB aggregation and indexing" },
  { title: "Express Tutorial", content: "Express is a web framework for Node.js" },
  { title: "Advanced MongoDB", content: "Covers text search, indexing, and performance" }
])
```

---

## ✅ Example 1: Create Text Index

```js
db.articles.createIndex({ content: "text" })
```

---

## ✅ Example 2: Simple Text Search

```js
db.articles.find({ $text: { $search: "MongoDB" } })
```

✅ Returns any document where `"MongoDB"` appears in the `content`.

---

## ✅ Example 3: Search Multiple Words

```js
db.articles.find({ $text: { $search: "MongoDB indexing" } })
```

✅ Matches any document containing **either** “MongoDB” or “indexing”.

---

## ✅ Example 4: Exact Phrase Search

```js
db.articles.find({ $text: { $search: "\"text search\"" } })
```

✅ Finds documents containing the **exact phrase** `"text search"`.

---

## ✅ Example 5: Exclude Words

```js
db.articles.find({ $text: { $search: "MongoDB -aggregation" } })
```

✅ Matches documents with “MongoDB” but **without** “aggregation”.

---

## ✅ Example 6: Add Text Index Weighting

You can assign **weights** to prioritize fields.

```js
db.articles.createIndex(
  { title: "text", content: "text" },
  { weights: { title: 5, content: 1 } }
)
```

✅ This gives **title** 5× more importance in search ranking.

---

## ✅ Example 7: Show Text Score

MongoDB assigns a **relevance score** (higher = better match).

```js
db.articles.find(
  { $text: { $search: "MongoDB indexing" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } })
```

✅ Output Example:

```json
[
  { title: "Advanced MongoDB", score: 2.5 },
  { title: "MongoDB Basics", score: 1.8 }
]
```

---

## ⚡ Text Index Limitations

| Limitation                    | Description                                                                               |
| ----------------------------- | ----------------------------------------------------------------------------------------- |
| One text index per collection | You can only create **one** text index (can include multiple fields)                      |
| Case-insensitive              | Automatically lowercases all words                                                        |
| Language support              | Supports stemming in many languages (e.g., "run" ≈ "running")                             |
| Not for substring search      | `"text"` index can’t find `"Mon"` inside `"MongoDB"` — use regex or Atlas Search for that |

---

## 💡 Text Index Use Cases

✅ Blog search engine
✅ Product description search
✅ Knowledge base search
✅ News headline filtering

---

## ⚙️ Bonus: Combine Text Index with Other Filters

```js
db.articles.find({
  $text: { $search: "MongoDB" },
  category: "Database"
})
```

MongoDB uses **text index for `$search`** and regular indexes for filters.

---

## 🧠 Summary Table

| Index Type              | Purpose                     | Example                                        | Notes                   |
| ----------------------- | --------------------------- | ---------------------------------------------- | ----------------------- |
| **Single-field index**  | Index on one field          | `{ age: 1 }`                                   | Fast for simple lookups |
| **Compound index**      | Index on multiple fields    | `{ age: 1, gender: 1 }`                        | Order matters           |
| **Text index**          | Full-text search in strings | `{ content: "text" }`                          | Case-insensitive search |
| **Weighted text index** | Prioritize fields           | `{ title: "text", content: "text" }` + weights | Affects ranking         |
| **View query plan**     | Check usage                 | `.explain("executionStats")`                   | Look for `"IXSCAN"`     |

---

## ⚡ Quick Recap

* ✅ **Compound index** = for multi-field queries (`age + gender`)
* 🔍 **Text index** = for full-text search (`content: "MongoDB indexing"`)
* ⚡ Both reduce `COLLSCAN` and boost performance dramatically
* 🧠 Always use `.explain()` to verify index usage
* 💾 Keep indexes minimal — each one consumes memory and slows writes

