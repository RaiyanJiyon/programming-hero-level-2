These are used to **delete fields or remove elements** from arrays — basically the “clean up” side of CRUD.
We’ll keep using your `users` collection from `practice-data.json`.

---

## 🧩 Example Document

Let’s assume this sample user document:

```js
{
  name: { firstName: "Mariele", lastName: "Dangl" },
  age: 25,
  city: "Dhaka",
  interests: ["Reading", "Writing", "Cooking", "Gaming"],
  skills: [
    { name: "JAVA", level: "Expert" },
    { name: "PYTHON", level: "Beginner" },
    { name: "GO", level: "Expert" }
  ]
}
```

---

## 🟢 1. `$unset` — Remove a field from a document

Used to **delete fields** (keys) completely.
If the field doesn’t exist, it does nothing.

### ✅ Example 1: Remove a single field

```js
db.users.updateOne(
  { "name.firstName": "Mariele" },
  { $unset: { city: "" } }
)
```

➡️ Removes the `city` field entirely.

Result:

```js
{
  name: { firstName: "Mariele", lastName: "Dangl" },
  age: 25,
  interests: [...],
  skills: [...]
}
```

---

### ✅ Example 2: Remove multiple fields

```js
db.users.updateOne(
  { "name.firstName": "Mariele" },
  { $unset: { age: "", "address.city": "" } }
)
```

➡️ Deletes both `age` and nested `address.city`.

---

## 🟣 2. `$pop` — Remove **first or last element** from an array

Used when you want to remove elements **by position**, not by value.

* `1` → removes **last element**
* `-1` → removes **first element**

---

### ✅ Example 1: Remove the **last** interest

```js
db.users.updateOne(
  { "name.firstName": "Mariele" },
  { $pop: { interests: 1 } }
)
```

➡️ Removes `"Gaming"` (the last element in the array).

Result:

```js
interests: ["Reading", "Writing", "Cooking"]
```

---

### ✅ Example 2: Remove the **first** interest

```js
db.users.updateOne(
  { "name.firstName": "Mariele" },
  { $pop: { interests: -1 } }
)
```

➡️ Removes `"Reading"` (the first element).

---

## 🔵 3. `$pull` — Remove elements **matching a condition**

Removes **specific values or objects** from an array based on a condition.

---

### ✅ Example 1: Remove a specific value from an array

```js
db.users.updateOne(
  { "name.firstName": "Mariele" },
  { $pull: { interests: "Writing" } }
)
```

➡️ Removes `"Writing"` from the `interests` array.

Result:

```js
interests: ["Reading", "Cooking", "Gaming"]
```

---

### ✅ Example 2: Remove all matching objects from array of documents

```js
db.users.updateOne(
  { "name.firstName": "Mariele" },
  { $pull: { skills: { level: "Beginner" } } }
)
```

➡️ Removes all skill objects where `level` is `"Beginner"`.

Result:

```js
skills: [
  { name: "JAVA", level: "Expert" },
  { name: "GO", level: "Expert" }
]
```

---

### ✅ Example 3: Remove nested conditionally

```js
db.users.updateOne(
  { "name.firstName": "Mariele" },
  { $pull: { skills: { name: "JAVA", level: "Expert" } } }
)
```

➡️ Removes only the skill that matches both fields in one subdocument.

---

## 🔴 4. `$pullAll` — Remove **multiple specific values** at once

Similar to `$pull`, but instead of a condition, it removes a **set of exact values**.

---

### ✅ Example 1: Remove multiple interests

```js
db.users.updateOne(
  { "name.firstName": "Mariele" },
  { $pullAll: { interests: ["Reading", "Cooking"] } }
)
```

➡️ Removes both `"Reading"` and `"Cooking"` if they exist.

---

### ✅ Example 2: Works only with **exact matches**

If the array contains objects, you must match **entire objects exactly**.

```js
db.users.updateOne(
  { "name.firstName": "Mariele" },
  {
    $pullAll: {
      skills: [
        { name: "JAVA", level: "Expert" },
        { name: "GO", level: "Expert" }
      ]
    }
  }
)
```

➡️ Removes both skills if they match **exactly**.

---

## 🧠 Summary Table

| Operator   | Description                               | Works On                   | Example                                               |
| ---------- | ----------------------------------------- | -------------------------- | ----------------------------------------------------- |
| `$unset`   | Removes field from document               | Field                      | `{ $unset: { age: "" } }`                             |
| `$pop`     | Removes first or last array element       | Array (by position)        | `{ $pop: { interests: 1 } }`                          |
| `$pull`    | Removes array elements matching condition | Array (by value or object) | `{ $pull: { interests: "Reading" } }`                 |
| `$pullAll` | Removes multiple exact values             | Array (by list)            | `{ $pullAll: { interests: ["Reading", "Cooking"] } }` |

---

## 🧩 Bonus Example — Combine for cleanup

Let’s say we want to:

* Remove the `city` field,
* Delete `"Gaming"` from `interests`,
* Remove `"Beginner"` skills.

```js
db.users.updateOne(
  { "name.firstName": "Mariele" },
  {
    $unset: { city: "" },
    $pull: { interests: "Gaming", skills: { level: "Beginner" } }
  }
)
```
