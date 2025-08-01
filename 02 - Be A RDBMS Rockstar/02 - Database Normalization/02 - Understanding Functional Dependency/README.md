### 🔍 Understanding **Functional Dependency** in DBMS

---

## ✅ **What is Functional Dependency?**

A **functional dependency** (FD) is a **relationship between attributes (columns)** in a relational database. It shows how **one attribute depends on another**.

> **Definition:**
> In a table **R**, attribute **Y** is functionally dependent on attribute **X** if for every **value of X**, there is **only one value of Y**.

This is written as:

```
X → Y  
(X functionally determines Y)
```

---

## 🔹 📘 Example:

### Table: Students

| StudentID | Name  | Department |
| --------- | ----- | ---------- |
| 101       | Alice | CSE        |
| 102       | Bob   | EEE        |
| 103       | Alice | CSE        |

### Functional Dependencies:

* `StudentID → Name` ✅
  Because each **StudentID** uniquely determines a **Name**

* `Name → StudentID` ❌
  Because multiple students can have the same name

---

## 🔹 Types of Functional Dependency

### 1. **Trivial Functional Dependency**

* A dependency is **trivial** if the dependent is a subset of the determinant.

> Example:
> `{StudentID, Name} → StudentID` ✅ (trivial)

---

### 2. **Non-Trivial Functional Dependency**

* A dependency is **non-trivial** if the dependent is **not a subset** of the determinant.

> Example:
> `StudentID → Name` ✅ (non-trivial)

---

### 3. **Partial Dependency**

* When an attribute is functionally dependent on **part of a composite key** (not the whole key).

> Example:
> If `StudentID + CourseID` → `Marks`, but `StudentID → StudentName`
> Then `StudentName` has a **partial dependency**.

---

### 4. **Transitive Dependency**

* If `A → B` and `B → C`, then `A → C` is a **transitive dependency**.

---

## 🔁 Why is Functional Dependency Important?

Functional dependencies are **essential for**:

✅ **Normalization**
✅ **Detecting anomalies**
✅ **Designing efficient schemas**
✅ **Determining keys** (primary, candidate)

---

## 🔁 Summary

| Term                  | Meaning                                      |
| --------------------- | -------------------------------------------- |
| `X → Y`               | X determines Y                               |
| Trivial FD            | Y is part of X (`{X, Y} → X`)                |
| Non-Trivial FD        | Y is not part of X                           |
| Partial Dependency    | Attribute depends on part of a composite key |
| Transitive Dependency | A → B and B → C implies A → C                |

---

## 📌 Quick Test Example:

**Table: Orders**

| OrderID | CustomerName | Address    |
| ------- | ------------ | ---------- |
| 201     | Sarah        | Dhaka      |
| 202     | Imran        | Chittagong |

* `OrderID → CustomerName, Address` ✅
* `CustomerName → Address` ❌ (Not valid unless names are unique)