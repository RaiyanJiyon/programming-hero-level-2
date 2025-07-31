## 🔑 What is a **Key** in DBMS?

A **key** is an attribute (column) or a set of attributes used to **uniquely identify** a row (tuple) in a table. Keys help enforce **uniqueness**, **integrity**, and allow us to establish **relationships** between tables.

---

## 🔹 What is a **Super Key**?

### ✅ **Definition:**

A **super key** is **any combination** of attributes that **uniquely identifies** a row in a table.

### ✅ Characteristics:

* Can consist of one or **more attributes**.
* Every **primary key** is a **super key**, but not every super key is a primary key.
* There can be **many super keys** in one table.

---

### 🔹 Example:

Let’s take a table: `Students`

| StudentID | Name  | Email                                     | Phone       |
| --------- | ----- | ----------------------------------------- | ----------- |
| 101       | Alice | [alice@gmail.com](mailto:alice@gmail.com) | 01234567890 |
| 102       | Bob   | [bob@gmail.com](mailto:bob@gmail.com)     | 01987654321 |

### Possible **Super Keys**:

* `{StudentID}` ✅
* `{Email}` ✅
* `{Phone}` ✅
* `{StudentID, Email}` ✅
* `{StudentID, Name}` ✅

> All of these **uniquely identify** each student, so they're **super keys**.

---

## 🔹 What is a **Candidate Key**?

A **candidate key** is a **minimal** super key.
→ It **must not have any extra attributes** that are not necessary to uniquely identify a row.

### From above:

* `{StudentID}` ✅ → Candidate Key
* `{Email}` ✅ → Candidate Key
* `{StudentID, Email}` ❌ → **Not** a candidate key (extra attribute)

---

## 🔹 What is a **Primary Key**?

A **primary key** is one **chosen candidate key** that uniquely identifies records in a table.
It **cannot have NULL values**.

In the example:

* `StudentID` can be selected as the **Primary Key**.

---

## 🔁 Summary Comparison

| Term              | Description                                          | Example                  |
| ----------------- | ---------------------------------------------------- | ------------------------ |
| **Super Key**     | Any set of attributes that uniquely identifies a row | `{StudentID, Email}`     |
| **Candidate Key** | Minimal super key (no extra attributes)              | `{StudentID}`, `{Email}` |
| **Primary Key**   | Chosen candidate key for unique identification       | `{StudentID}`            |
