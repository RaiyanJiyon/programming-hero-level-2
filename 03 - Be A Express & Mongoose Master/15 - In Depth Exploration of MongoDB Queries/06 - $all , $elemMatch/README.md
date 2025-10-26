👉 `$all` and `$elemMatch`.

These are essential when your data contains **arrays of values** or **arrays of objects**, like in your `practice-data.json` dataset (fields like `friends`, `interests`, `skills`, etc.).

---

## 🧩 **Quick Context Example**

Each user document in your dataset looks like this:

```js
{
  name: { firstName: "Mariele", lastName: "Dangl" },
  friends: ["Najmus Sakib", "Mir Hussain", "Fahim Ahammed Firoz"],
  interests: ["Cooking", "Writing", "Reading"],
  skills: [
    { name: "JAVASCRIPT", level: "Expert", isLearning: false },
    { name: "C#", level: "Expert", isLearning: true }
  ]
}
```

---

## 🟢 1. `$all` — Match arrays containing **all specified elements**

Use `$all` when you want to find documents whose array field includes **every value** from a list.

### ✅ Example 1: Find users who have **both "Reading" and "Writing"** as interests

```js
db.users.find({ interests: { $all: ["Reading", "Writing"] } })
```

➡️ Returns documents where **both values exist** in the `interests` array.

Even if the user has other interests (like “Cooking”), they’ll still match — as long as they have *both Reading and Writing*.

---

### ✅ Example 2: Find users whose **friends list includes both “Najmus Sakib” and “Fahim Ahammed Firoz”**

```js
db.users.find({ friends: { $all: ["Najmus Sakib", "Fahim Ahammed Firoz"] } })
```

➡️ Matches anyone who has *both friends* in their `friends` array.

---

### ✅ Example 3: `$all` with nested fields (less common)

You can even use `$all` with arrays of subdocuments if combined with `$elemMatch`, but for now, `$all` works best with arrays of primitive values (strings, numbers, etc.).

---

## 🟣 2. `$elemMatch` — Match **a single element** in an array of **objects**

When you have **arrays of objects** (like your `skills` array), `$elemMatch` is the right tool.

It ensures that **all conditions apply to the same array element**, not across multiple ones.

---

### ⚠️ Example Problem Without `$elemMatch`

If you query like this:

```js
db.users.find({ "skills.name": "JAVA", "skills.level": "Expert" })
```

MongoDB will return documents where:

* One element might have `name: "JAVA"`
* And another separate element might have `level: "Expert"`

❌ That means it could match across two different skill objects.

---

### ✅ Example 1: Correct usage — Find users who have a **skill "JAVA" with level "Expert"**

```js
db.users.find({
  skills: { $elemMatch: { name: "JAVA", level: "Expert" } }
})
```

✅ This ensures both conditions (`name` and `level`) match **within the same skill object**.

---

### ✅ Example 2: Find users who are **learning** (`isLearning: true`) and have a skill level of `"Expert"`

```js
db.users.find({
  skills: { $elemMatch: { isLearning: true, level: "Expert" } }
})
```

➡️ Returns users who have at least one skill that meets both criteria in the same subdocument.

---

### ✅ Example 3: Find users who have **GO** skill at **Expert** level

```js
db.users.find({
  skills: { $elemMatch: { name: "GO", level: "Expert" } }
})
```

➡️ Matches users like:

* **Hendrik Rathbone**
* **Mariele Dangl**

(both have `"GO"` at `"Expert"` level in your dataset)

---

## 🧠 **When to Use Each**

| Operator     | Used For                                     | Works On                  | Example                                                         |
| ------------ | -------------------------------------------- | ------------------------- | --------------------------------------------------------------- |
| `$all`       | Ensure all values are present                | Array of primitive values | `{ interests: { $all: ["Reading", "Writing"] } }`               |
| `$elemMatch` | Match one object meeting multiple conditions | Array of objects          | `{ skills: { $elemMatch: { name: "JAVA", level: "Expert" } } }` |

---

## 🧩 Bonus Example — Combine `$all` and `$elemMatch`

Find users who have **multiple matching skill objects**:

* One skill: `JAVA` at `Expert`
* Another skill: `GO` at `Expert`

```js
db.users.find({
  $and: [
    { skills: { $elemMatch: { name: "JAVA", level: "Expert" } } },
    { skills: { $elemMatch: { name: "GO", level: "Expert" } } }
  ]
})
```

✅ Returns users who are **experts in both JAVA and GO**.
