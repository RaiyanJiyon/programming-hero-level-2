## 🟢 1. `$eq` → Equal To

Find users whose **age = 50**:

```js
db.users.find({ age: { $eq: 50 } })
```

🧩 Example match:
`Nerta Bartod` (Male, 50 years old)

---

## 🟣 2. `$ne` → Not Equal To

Find users whose **gender is not "Male"**:

```js
db.users.find({ gender: { $ne: "Male" } })
```

✅ Returns all female users.

---

## 🔵 3. `$gt` → Greater Than

Find users whose **salary > 400**:

```js
db.users.find({ salary: { $gt: 400 } }, { name: 1, salary: 1, _id: 0 })
```

✅ Shows users earning above 400, e.g.:

* Candy Peaker (499)
* Kaela Kenan (482)
* Kordula Tacker (493)

---

## 🟠 4. `$lt` → Less Than

Find users whose **age < 18**:

```js
db.users.find({ age: { $lt: 18 } }, { name: 1, age: 1, _id: 0 })
```

✅ Matches younger users like:

* Kally Lovitt (4)
* Wilmer Lavens (16)
* Otto Mirfin (12)
* Jewell Lye (18 but not included since `<18`)

---

## 🟢 5. `$gte` → Greater Than or Equal To

Find users whose **age ≥ 60**:

```js
db.users.find({ age: { $gte: 60 } }, { name: 1, age: 1, _id: 0 })
```

✅ Results may include:

* Candy Peaker (70)
* Vanya Kardos-Stowe (75)
* Sharyl Rivalland (87)
* Hendrik Rathbone (84)

---

## 🔴 6. `$lte` → Less Than or Equal To

Find users whose **salary ≤ 200**:

```js
db.users.find({ salary: { $lte: 200 } }, { name: 1, salary: 1, _id: 0 })
```

✅ Example results:

* Ivan Seares (114)
* Cacilie Boyack (115)
* Nerta Bartod (116)
* Tannie Dugall (185)

---

## 🧩 Combined Example

Find **Female users** with **salary ≥ 400**:

```js
db.users.find(
  { gender: "Female", salary: { $gte: 400 } },
  { name: 1, gender: 1, salary: 1, _id: 0 }
)
```

✅ Shows female users earning ≥ 400 (like Kaela Kenan, Kordula Tacker, etc.)

---

## 🧠 Summary Table

| Operator | Description           | Example                       |
| -------- | --------------------- | ----------------------------- |
| `$eq`    | Equal                 | `{ age: { $eq: 50 } }`        |
| `$ne`    | Not Equal             | `{ gender: { $ne: "Male" } }` |
| `$gt`    | Greater Than          | `{ salary: { $gt: 400 } }`    |
| `$lt`    | Less Than             | `{ age: { $lt: 18 } }`        |
| `$gte`   | Greater Than or Equal | `{ age: { $gte: 60 } }`       |
| `$lte`   | Less Than or Equal    | `{ salary: { $lte: 200 } }`   |
