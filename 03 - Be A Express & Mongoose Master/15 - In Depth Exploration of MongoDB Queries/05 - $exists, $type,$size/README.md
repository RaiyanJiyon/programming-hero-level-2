## 🟢 1. `$exists` — Check if a field exists

The `$exists` operator checks whether a document contains a particular field.

### ✅ Example 1: Find users who **have the `salary` field**

```js
db.users.find({ salary: { $exists: true } })
```

➡️ Returns all documents that include the `salary` key.

### ✅ Example 2: Find users who **do not have `skills` field**

```js
db.users.find({ skills: { $exists: false } })
```

➡️ Returns users missing the `skills` array entirely.

---

## 🟣 2. `$type` — Match by BSON data type

MongoDB stores values in **BSON** (Binary JSON).
`$type` lets you filter by the **data type** of a field.

### Common Type Numbers:

| Type | Meaning | Example                |
| ---- | ------- | ---------------------- |
| 1    | Double  | Floating point numbers |
| 2    | String  | Text fields            |
| 3    | Object  | Subdocuments           |
| 4    | Array   | Arrays                 |
| 8    | Boolean | true/false             |
| 10   | Null    | Null value             |
| 16   | Int32   | Whole numbers          |
| 18   | Int64   | Large integers         |

---

### ✅ Example 1: Find users where `salary` is a **number**

```js
db.users.find({ salary: { $type: "number" } })
```

OR equivalently:

```js
db.users.find({ salary: { $type: 16 } }) // Int32
```

### ✅ Example 2: Find users where `email` is a **string**

```js
db.users.find({ email: { $type: "string" } })
```

### ✅ Example 3: Find users where `skills` is an **array**

```js
db.users.find({ skills: { $type: "array" } })
```

---

## 🔵 3. `$size` — Match arrays by their length

Use `$size` to find documents where an **array field** has a specific number of elements.

### ✅ Example 1: Find users with **exactly 3 interests**

```js
db.users.find({ interests: { $size: 3 } })
```

➡️ Matches documents like:

```json
"interests": ["Reading", "Writing", "Travelling"]
```

### ✅ Example 2: Find users who have **exactly 5 friends**

```js
db.users.find({ friends: { $size: 5 } })
```

### ⚠️ Note:

`$size` only supports **exact matches** (e.g., exactly 3 elements).
If you want *greater than or less than*, you need to use the **`$expr`** operator with `$size`.

#### Example:

Find users with **more than 3 friends**

```js
db.users.find({
  $expr: { $gt: [ { $size: "$friends" }, 3 ] }
})
```

---

## 🧠 **Summary Table**

| Operator  | Description                | Example                          |
| --------- | -------------------------- | -------------------------------- |
| `$exists` | Checks if a field exists   | `{ salary: { $exists: true } }`  |
| `$type`   | Checks data type           | `{ email: { $type: "string" } }` |
| `$size`   | Matches exact array length | `{ friends: { $size: 5 } }`      |

---

## 🧩 **Example Combining All**

Find users who:

* Have a `skills` field,
* `skills` is an array,
* And have **exactly 2 skills**.

```js
db.users.find({
  skills: { $exists: true, $type: "array", $size: 2 }
})
```
