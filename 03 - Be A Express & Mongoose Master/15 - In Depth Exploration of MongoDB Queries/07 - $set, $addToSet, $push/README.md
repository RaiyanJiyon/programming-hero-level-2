`$set`, `$addToSet`, and `$push`.
These are used in **update operations** (like `updateOne()` or `updateMany()`) to modify existing documents.

Let’s use your `users` collection from `practice-data.json` to demonstrate practical examples.

---

## 🧩 Base Example Document

Let’s take one sample document:

```js
{
  name: { firstName: "Mariele", lastName: "Dangl" },
  age: 21,
  interests: ["Cooking", "Writing", "Reading"],
  skills: [
    { name: "JAVASCRIPT", level: "Expert" },
    { name: "PYTHON", level: "Beginner" }
  ]
}
```

---

## 🟢 1. `$set` — Create or update a field

`$set` lets you **add new fields** or **update existing ones** in a document.

### ✅ Example 1: Update a single field

```js
db.users.updateOne(
  { "name.firstName": "Mariele" },
  { $set: { age: 25 } }
)
```

➡️ Changes her age to **25**.

---

### ✅ Example 2: Add a new field if it doesn’t exist

```js
db.users.updateOne(
  { "name.firstName": "Mariele" },
  { $set: { country: "Bangladesh" } }
)
```

➡️ Adds `"country": "Bangladesh"` to her document.

---

### ✅ Example 3: Update a nested field

```js
db.users.updateOne(
  { "name.firstName": "Mariele" },
  { $set: { "address.city": "Dhaka" } }
)
```

➡️ Updates the nested `address.city` inside the object.

---

## 🟣 2. `$addToSet` — Add unique values to an array

`$addToSet` adds a value to an array **only if it doesn’t already exist** (like a “set” in math).

### ✅ Example 1: Add a new interest if it’s not already there

```js
db.users.updateOne(
  { "name.firstName": "Mariele" },
  { $addToSet: { interests: "Travelling" } }
)
```

➡️ Adds `"Travelling"` to the `interests` array **only if** it’s not already present.

---

### ✅ Example 2: Add multiple unique values

You can combine `$addToSet` with `$each` to add multiple values safely:

```js
db.users.updateOne(
  { "name.firstName": "Mariele" },
  { $addToSet: { interests: { $each: ["Reading", "Gardening", "Sports"] } } }
)
```

➡️ Only adds new ones — skips duplicates.

---

## 🔵 3. `$push` — Add (append) a value to an array

`$push` always adds new elements, even if duplicates already exist.

### ✅ Example 1: Add one new interest

```js
db.users.updateOne(
  { "name.firstName": "Mariele" },
  { $push: { interests: "Singing" } }
)
```

➡️ `"Singing"` will be added to the end of `interests` array (even if it already exists).

---

### ✅ Example 2: Add multiple elements with `$each`

```js
db.users.updateOne(
  { "name.firstName": "Mariele" },
  { $push: { interests: { $each: ["Cycling", "Gaming"] } } }
)
```

➡️ Adds both values to the array in order.

---

### ✅ Example 3: `$push` with sort & limit

You can even control array order and size.

```js
db.users.updateOne(
  { "name.firstName": "Mariele" },
  {
    $push: {
      interests: {
        $each: ["Art", "Dance"],
        $sort: 1,     // sort alphabetically
        $slice: 5     // keep only first 5 elements
      }
    }
  }
)
```

---

## ⚖️ 4. `$set` vs `$addToSet` vs `$push`

| Operator    | Works On  | What It Does                   | Prevents Duplicates? | Example                                   |
| ----------- | --------- | ------------------------------ | -------------------- | ----------------------------------------- |
| `$set`      | Any field | Sets/updates a field’s value   | ❌ No                 | `{ $set: { age: 25 } }`                   |
| `$addToSet` | Arrays    | Adds value only if not present | ✅ Yes                | `{ $addToSet: { interests: "Reading" } }` |
| `$push`     | Arrays    | Always appends value(s)        | ❌ No                 | `{ $push: { interests: "Reading" } }`     |

---

## 🧠 Bonus Example: Combine Operators

Let’s say you want to:

* Set `age` to 30
* Add `"Running"` to `interests` (only if not there)
* Push a new skill object

```js
db.users.updateOne(
  { "name.firstName": "Mariele" },
  {
    $set: { age: 30 },
    $addToSet: { interests: "Running" },
    $push: {
      skills: { name: "NODE.JS", level: "Intermediate", isLearning: true }
    }
  }
)
```

---

## ✅ Summary

| Operator    | Description                           | Use Case                               |
| ----------- | ------------------------------------- | -------------------------------------- |
| `$set`      | Add or update a field                 | Change scalar values or nested objects |
| `$addToSet` | Add unique values to array            | Prevent duplicates                     |
| `$push`     | Add values to array (even duplicates) | Append or bulk-insert array elements   |

