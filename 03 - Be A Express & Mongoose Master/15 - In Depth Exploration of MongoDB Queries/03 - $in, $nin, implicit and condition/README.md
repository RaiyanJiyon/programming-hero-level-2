## 🧩 **Data Context**

Each document has fields like:

```js
{
  name: { firstName: "Mariele", lastName: "Dangl" },
  gender: "Male",
  age: 21,
  salary: 363,
  country: "China",
  favoutiteColor: "Aquamarine"
}
```

---

## 🟢 1. `$in` — Match any value from a given list

The `$in` operator matches **if the field’s value is inside the provided array.**

### ✅ Example 1: Find users from **China, Brazil, or Indonesia**

```js
db.users.find({ "address.country": { $in: ["China", "Brazil", "Indonesia"] } })
```

➡️ Returns all users whose country is **China**, **Brazil**, or **Indonesia**.

### ✅ Example 2: Find users whose favorite color is either **Red** or **Blue**

```js
db.users.find({ favoutiteColor: { $in: ["Red", "Blue"] } })
```

---

## 🔴 2. `$nin` — Opposite of `$in`

The `$nin` operator matches documents where the field’s value is **NOT** in the array.

### ✅ Example 1: Find users **not** from China, Brazil, or Indonesia

```js
db.users.find({ "address.country": { $nin: ["China", "Brazil", "Indonesia"] } })
```

➡️ Returns users from other countries like Bangladesh, Portugal, Russia, etc.

### ✅ Example 2: Find users whose favorite color is **not** Red or Blue

```js
db.users.find({ favoutiteColor: { $nin: ["Red", "Blue"] } })
```

---

## 🟣 3. **Implicit AND Condition**

In MongoDB, when you specify **multiple fields in the same query object**, it automatically applies **AND** logic between them.

You **don’t need to write `$and`** explicitly unless you’re comparing the same field multiple times.

### ✅ Example 1: Find **Male** users whose **age > 30**

```js
db.users.find({ gender: "Male", age: { $gt: 30 } })
```

➡️ This is equivalent to:

```js
db.users.find({ $and: [ { gender: "Male" }, { age: { $gt: 30 } } ] })
```

### ✅ Example 2: Find users whose **country = China** and **salary ≥ 300**

```js
db.users.find({ "address.country": "China", salary: { $gte: 300 } })
```

➡️ Implicitly means **(country == "China") AND (salary >= 300)**

---

## ⚙️ 4. Example Combining `$in`, `$nin`, and AND

Find users:

* From **China** or **Brazil**
* With **salary ≥ 350**
* But **favorite color not “Red”**

```js
db.users.find({
  "address.country": { $in: ["China", "Brazil"] },
  salary: { $gte: 350 },
  favoutiteColor: { $nin: ["Red"] }
})
```

✅ This combines:

* `$in` (countries)
* `$nin` (exclude color)
* Implicit AND (all conditions together)

---

## 🧠 Summary Table

| Operator         | Description                       | Example                                      |
| ---------------- | --------------------------------- | -------------------------------------------- |
| `$in`            | Match any from list               | `{ age: { $in: [20, 30, 40] } }`             |
| `$nin`           | Exclude list                      | `{ country: { $nin: ["China", "Brazil"] } }` |
| **Implicit AND** | Multiple conditions in one object | `{ gender: "Male", salary: { $gt: 300 } }`   |

