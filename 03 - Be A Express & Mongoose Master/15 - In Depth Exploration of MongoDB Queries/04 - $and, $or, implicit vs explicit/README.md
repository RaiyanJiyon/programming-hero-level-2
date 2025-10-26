## 🧠 Recap:

Each document looks roughly like:

```js
{
  name: { firstName: "Mariele", lastName: "Dangl" },
  gender: "Male",
  age: 21,
  salary: 363,
  "address.country": "China",
  favoutiteColor: "Aquamarine"
}
```

---

## 🟢 1. **Implicit AND** (default behavior)

When you write multiple conditions in a single query object, MongoDB automatically combines them with an **AND**.

### ✅ Example: Find **male** users who are **older than 40**

```js
db.users.find({ gender: "Male", age: { $gt: 40 } })
```

➡️ This means:

```js
db.users.find({
  $and: [
    { gender: "Male" },
    { age: { $gt: 40 } }
  ]
})
```

✅ **Result:** Users where `gender = "Male"` **AND** `age > 40`.

**👉 Key Point:**
You don’t need `$and` if you’re comparing *different fields* — MongoDB automatically applies it.

---

## 🔵 2. **Explicit `$and`**

You use `$and` explicitly when:

* You want to be very clear about multiple conditions, or
* You’re comparing **the same field** in multiple ways.

### ✅ Example 1: Same result as implicit AND

```js
db.users.find({
  $and: [
    { gender: "Male" },
    { age: { $gt: 40 } }
  ]
})
```

### ✅ Example 2: Compare the same field

Find users with **salary between 300 and 400**

```js
db.users.find({
  $and: [
    { salary: { $gte: 300 } },
    { salary: { $lte: 400 } }
  ]
})
```

🧩 Here you **must** use `$and`, because you’re checking **the same field (`salary`)** twice.

---

## 🟣 3. **`$or` — Either condition can be true**

Returns documents that match **at least one** of the given conditions.

### ✅ Example 1: Users from **China** OR **Brazil**

```js
db.users.find({
  $or: [
    { "address.country": "China" },
    { "address.country": "Brazil" }
  ]
})
```

✅ Matches all users from China **or** Brazil.

---

### ✅ Example 2: Users with **salary > 400** OR **age < 20**

```js
db.users.find({
  $or: [
    { salary: { $gt: 400 } },
    { age: { $lt: 20 } }
  ]
})
```

✅ Matches:

* High earners (salary > 400),
* Young users (age < 20).

---

## 🔴 4. **Combine `$and` + `$or`**

You can mix them for complex queries.

### ✅ Example:

Find users who are **Male**, and (from **China** OR **Brazil**)

```js
db.users.find({
  $and: [
    { gender: "Male" },
    {
      $or: [
        { "address.country": "China" },
        { "address.country": "Brazil" }
      ]
    }
  ]
})
```

---

## ⚖️ 5. **Implicit vs Explicit AND — Key Difference**

| Type             | Example                                                            | When to Use                                      |
| ---------------- | ------------------------------------------------------------------ | ------------------------------------------------ |
| **Implicit AND** | `{ gender: "Male", age: { $gt: 40 } }`                             | When comparing **different fields**              |
| **Explicit AND** | `{ $and: [{ salary: { $gte: 300 } }, { salary: { $lte: 400 } }] }` | When comparing the **same field multiple times** |
| **$or**          | `{ $or: [{ country: "China" }, { country: "Brazil" }] }`           | When **any one** condition should match          |

---

## 🧩 6. **Bonus Example**

Find users who are:

* **Female**
* Have a **salary ≥ 400**, OR are **from China**

```js
db.users.find({
  $and: [
    { gender: "Female" },
    {
      $or: [
        { salary: { $gte: 400 } },
        { "address.country": "China" }
      ]
    }
  ]
})
```

---

✅ **Summary**

| Operator     | Meaning                             | Example                                                        |
| ------------ | ----------------------------------- | -------------------------------------------------------------- |
| Implicit AND | All conditions must be true         | `{ gender: "Male", age: { $gt: 30 } }`                         |
| `$and`       | Combine multiple filters explicitly | `{ $and: [ { age: { $gt: 20 } }, { salary: { $lt: 400 } } ] }` |
| `$or`        | At least one condition true         | `{ $or: [ { age: 20 }, { salary: 300 } ] }`                    |

