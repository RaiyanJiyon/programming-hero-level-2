### 🧩 **Normalization & 1st Normal Form (1NF)**

---

## 🔹 What is **Normalization**?

**Normalization** is the process of **organizing data in a database** to:

* **Reduce redundancy** (repeated data)
* **Avoid anomalies** (insert, update, delete issues)
* **Ensure data integrity**

It involves breaking large, unstructured tables into **smaller, related tables** while preserving relationships using **keys**.

---

## 🔁 Objectives of Normalization:

* Minimize **duplicate data**
* Ensure **data dependencies** are logical
* Make the database **efficient** and **easy to maintain**

---

## 🧾 **Normal Forms** (Levels of Normalization)

Each "Normal Form" builds upon the previous one:

| Normal Form | Key Focus                           |
| ----------- | ----------------------------------- |
| 1NF         | Atomic values (no repeating groups) |
| 2NF         | Eliminate partial dependencies      |
| 3NF         | Eliminate transitive dependencies   |
| BCNF        | Stronger version of 3NF             |

---

## 🔹 What is **1st Normal Form (1NF)?**

### ✅ Definition:

A table is in **1NF** if:

1. All values in each column are **atomic** (indivisible)
2. There are **no repeating groups or arrays**
3. Each record is **uniquely identifiable**

---

### ❌ Example: Table Not in 1NF

| StudentID | Name  | Courses       |
| --------- | ----- | ------------- |
| 1         | Alice | Math, English |
| 2         | Bob   | Physics       |

> Here, the column `Courses` has **multiple values** (not atomic).

---

### ✅ Convert to 1NF:

| StudentID | Name  | Course  |
| --------- | ----- | ------- |
| 1         | Alice | Math    |
| 1         | Alice | English |
| 2         | Bob   | Physics |

> Now, each field contains only **one value** → atomic → ✅ **1NF achieved**

---

## 🔁 Steps to Achieve 1NF

1. **Eliminate Repeating Groups**
   → Move multivalued fields into separate rows.

2. **Ensure Atomicity**
   → No lists, sets, or arrays in any field.

3. **Add a Primary Key**
   → Uniquely identify each record (or use a composite key).

---

## ✅ Summary Table

| Feature                     | In 1NF? |
| --------------------------- | ------- |
| Atomic (single) values only | ✅ Yes   |
| No repeating columns/groups | ✅ Yes   |
| Unique rows (via key)       | ✅ Yes   |

---

## 🎓 Real-Life Example

### 📦 Table: Orders (Before 1NF)

| OrderID | Customer | Products    |
| ------- | -------- | ----------- |
| 1001    | Sarah    | Pen, Pencil |

→ ❌ Not in 1NF (`Products` is a multivalued column)

### ✅ After 1NF

| OrderID | Customer | Product |
| ------- | -------- | ------- |
| 1001    | Sarah    | Pen     |
| 1001    | Sarah    | Pencil  |

