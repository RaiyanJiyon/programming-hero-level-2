## 🧩 Example Collection

```js
db.users.find()
```

Suppose it contains multiple documents like:

```js
{
  _id: ObjectId("..."),
  name: { firstName: "Mariele", lastName: "Dangl" },
  age: 25,
  country: "Bangladesh"
}
```

---

# 🗑️ 1. **Deleting Documents**

MongoDB provides several commands to delete one, many, or all documents from a collection.

---

### 🟢 **a) deleteOne()**

Deletes **the first document** that matches your filter condition.

```js
db.users.deleteOne({ "name.firstName": "Mariele" })
```

✅ Removes **only one** document — the first one matching the condition.

**Example Output:**

```json
{ "acknowledged": true, "deletedCount": 1 }
```

---

### 🔵 **b) deleteMany()**

Deletes **all documents** that match your filter.

```js
db.users.deleteMany({ country: "China" })
```

✅ Removes **all users** whose `country` is `"China"`.

**Example Output:**

```json
{ "acknowledged": true, "deletedCount": 12 }
```

---

### 🔴 **c) Delete All Documents (Empty Collection)**

Pass an **empty filter `{}`** to remove **everything** from the collection.

```js
db.users.deleteMany({})
```

✅ This will **remove all documents** but keep the **collection structure** (indexes remain).

---

### ⚠️ Note

* Deletion cannot be undone unless you have backups.
* Always double-check filters before running `deleteMany({})`.

---

# 💣 2. **Dropping (Deleting) a Collection**

If you want to completely remove the **collection itself** (not just the documents inside), use:

```js
db.users.drop()
```

✅ This will:

* Delete all documents
* Remove all indexes
* Remove the `users` collection entirely from the database.

**Example Output:**

```json
true
```

(if successful)

---

# 🧨 3. **Dropping an Entire Database**

If you want to delete **the whole database** (all collections inside):

```js
use practice
db.dropDatabase()
```

✅ This will remove the entire **`practice`** database from MongoDB.

**Example Output:**

```json
{ "dropped": "practice", "ok": 1 }
```

---

## 🧠 Summary Table

| Command          | Description                        | Affects                  | Example                           |
| ---------------- | ---------------------------------- | ------------------------ | --------------------------------- |
| `deleteOne()`    | Delete the first matching document | One doc                  | `{ "name.firstName": "Mariele" }` |
| `deleteMany()`   | Delete all matching documents      | Many docs                | `{ country: "China" }`            |
| `deleteMany({})` | Delete all documents               | Whole collection content | `{}`                              |
| `drop()`         | Delete the entire collection       | Collection               | `db.users.drop()`                 |
| `dropDatabase()` | Delete entire database             | All collections          | `db.dropDatabase()`               |

---

### ✅ Pro Tip:

If you’re experimenting and want a **clean reset**:

```js
use practice
db.users.drop()         // remove only users collection
db.dropDatabase()       // remove the entire practice database
```

