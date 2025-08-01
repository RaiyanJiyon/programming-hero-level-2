### 📘 **3rd Normal Form (3NF)** & **Transitive Dependency** – Explained Clearly

---

## 🔹 What is **3rd Normal Form (3NF)?**

A table is in **3NF** if:

1. It is already in **2NF**, and
2. It has **no transitive dependency** on the **primary key**.

---

## 🔁 First, What is a **Transitive Dependency**?

### ✅ **Definition:**

A **transitive dependency** occurs when:

> **Non-key attribute A** depends on **another non-key attribute B**,
> and **B** depends on the **primary key**.

In other words:

```
Primary Key → B → A  
⇒ A is transitively dependent on the primary key
```

---

## 📌 Example (Not in 3NF):

**Table: Students**

| StudentID (PK) | StudentName | DeptID | DeptName |
| -------------- | ----------- | ------ | -------- |
| 1              | Alice       | D1     | CSE      |
| 2              | Bob         | D2     | EEE      |

### ⚠️ Transitive Dependency:

* `StudentID → DeptID`
* `DeptID → DeptName`
  ⛔ So, `DeptName` is **transitively dependent** on `StudentID` → violates 3NF.

---

## ✅ Convert to 3NF (Remove Transitive Dependency):

### Break the table into two:

1. **Students Table**

| StudentID | StudentName | DeptID |
| --------- | ----------- | ------ |
| 1         | Alice       | D1     |
| 2         | Bob         | D2     |

2. **Departments Table**

| DeptID | DeptName |
| ------ | -------- |
| D1     | CSE      |
| D2     | EEE      |

✅ Now there is **no transitive dependency**
✅ The tables are now in **3rd Normal Form (3NF)**

---

## 🧠 When is 3NF Important?

* To **eliminate hidden dependencies**
* To improve **data integrity and consistency**
* To avoid **redundant updates**

---

## 🔁 Summary Table

| Concept               | Description                                                     |
| --------------------- | --------------------------------------------------------------- |
| 2NF                   | No partial dependency                                           |
| 3NF                   | No transitive dependency                                        |
| Transitive Dependency | Non-key attribute depends on another non-key attribute          |
| Solution              | Split table to isolate dependent attributes into separate table |

---

### 🔑 Golden Rule of 3NF:

> Every **non-prime attribute** must depend **only on the primary key**, and **nothing else**.

