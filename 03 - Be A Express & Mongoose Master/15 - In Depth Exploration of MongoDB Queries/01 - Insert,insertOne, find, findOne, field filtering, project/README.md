## 🧠 **Assume:**

We’re using a database named **`school`**, and a collection named **`students`**.

```js
use school
```

---

## 🟢 **1. insertOne()**

Inserts **a single document** into the collection.

```js
db.students.insertOne({
  name: "Alice",
  age: 20,
  grade: "A",
  city: "Dhaka"
})
```

✅ **Output:**

```json
{
  "acknowledged": true,
  "insertedId": ObjectId("...")
}
```

---

## 🟢 **2. insertMany()**

Inserts **multiple documents** at once.

```js
db.students.insertMany([
  { name: "Bob", age: 22, grade: "B", city: "Chittagong" },
  { name: "Charlie", age: 21, grade: "A", city: "Dhaka" },
  { name: "David", age: 23, grade: "C", city: "Khulna" }
])
```

✅ **Output:**

```json
{
  "acknowledged": true,
  "insertedIds": {
    "0": ObjectId("..."),
    "1": ObjectId("..."),
    "2": ObjectId("...")
  }
}
```

---

## 🟢 **3. find()**

Retrieves **multiple documents** from a collection.
If you use it **without any filter**, it returns **all documents**.

```js
db.students.find()
```

✅ **Example Output:**

```json
[
  { "_id": ObjectId("..."), "name": "Alice", "age": 20, "grade": "A", "city": "Dhaka" },
  { "_id": ObjectId("..."), "name": "Bob", "age": 22, "grade": "B", "city": "Chittagong" }
]
```

---

## 🟢 **4. findOne()**

Returns **only the first matching document**.

```js
db.students.findOne({ city: "Dhaka" })
```

✅ **Output:**

```json
{ "_id": ObjectId("..."), "name": "Alice", "age": 20, "grade": "A", "city": "Dhaka" }
```

---

## 🟢 **5. Field Filtering / Projection**

You can **control which fields to show** using **projection**.

### ✅ Example 1: Show only `name` and `city`

```js
db.students.find({}, { name: 1, city: 1 })
```

➡️ `_id` is included by default unless you exclude it.

✅ **Output:**

```json
[
  { "_id": ObjectId("..."), "name": "Alice", "city": "Dhaka" },
  { "_id": ObjectId("..."), "name": "Bob", "city": "Chittagong" }
]
```

---

### ✅ Example 2: Exclude `_id`

```js
db.students.find({}, { name: 1, city: 1, _id: 0 })
```

✅ **Output:**

```json
[
  { "name": "Alice", "city": "Dhaka" },
  { "name": "Bob", "city": "Chittagong" }
]
```

---

### ✅ Example 3: Combine filter + projection

Find students from Dhaka, only show `name` and `grade`:

```js
db.students.find(
  { city: "Dhaka" },
  { name: 1, grade: 1, _id: 0 }
)
```

✅ **Output:**

```json
[
  { "name": "Alice", "grade": "A" },
  { "name": "Charlie", "grade": "A" }
]
```

---

## 🧩 Summary Table

| Command        | Description              | Example                                     |
| -------------- | ------------------------ | ------------------------------------------- |
| `insertOne()`  | Insert one document      | `db.students.insertOne({ name: "Alice" })`  |
| `insertMany()` | Insert many documents    | `db.students.insertMany([...])`             |
| `find()`       | Get all or filtered docs | `db.students.find({ city: "Dhaka" })`       |
| `findOne()`    | Get one doc only         | `db.students.findOne({ name: "Bob" })`      |
| **Projection** | Show/hide fields         | `db.students.find({}, { name: 1, _id: 0 })` |
