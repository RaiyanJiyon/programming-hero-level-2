### 📘 2nd Normal Form (2NF) & Partial Dependency – Explained Simply

---

## 🔹 What is **2nd Normal Form (2NF)?**

A table is in **2nd Normal Form (2NF)** **if**:

1. It is already in **1st Normal Form (1NF)** ✅
2. It has **no partial dependency** ❌

---

## 🧩 But what is a **Partial Dependency**?

### ✅ **Definition**:

A **partial dependency** happens when a **non-prime attribute** (i.e., not part of any candidate key) is dependent on **part of a composite primary key**, not the whole key.

> This only applies if the table has a **composite primary key** (a key with 2 or more columns).

---

### 📌 Example (Not in 2NF):

**Table: Student\_Course**

| **StudentID** | **CourseID** | StudentName | CourseName |
| ------------- | ------------ | ----------- | ---------- |
| 1             | C1           | Alice       | Math       |
| 1             | C2           | Alice       | English    |
| 2             | C1           | Bob         | Math       |

🔸 **Primary Key = (StudentID, CourseID)**

### ❌ Partial Dependencies:

* `StudentName` depends only on `StudentID`
* `CourseName` depends only on `CourseID`

These are **partial dependencies** because they don’t depend on the **whole primary key**.

---

## 🔧 Convert to 2NF (Remove Partial Dependencies):

### Break into 3 tables:

1. **Students**

| StudentID | StudentName |
| --------- | ----------- |
| 1         | Alice       |
| 2         | Bob         |

2. **Courses**

| CourseID | CourseName |
| -------- | ---------- |
| C1       | Math       |
| C2       | English    |

3. **Student\_Course (Enrollments)**

| StudentID | CourseID |
| --------- | -------- |
| 1         | C1       |
| 1         | C2       |
| 2         | C1       |

✅ Now, all non-key attributes **fully depend** on their respective primary keys → The database is in **2NF**.

---

## 🔁 Summary Table

| Concept               | Description                                                               |
| --------------------- | ------------------------------------------------------------------------- |
| 1NF                   | Atomic columns, no repeating groups                                       |
| 2NF                   | 1NF + No partial dependencies                                             |
| Partial Dependency    | Non-key attribute depends on part of a composite key                      |
| Composite Primary Key | A key made of two or more columns                                         |
| Goal of 2NF           | Eliminate redundancy & ensure full functional dependency on the whole key |

---

### 🧠 Tip:

If your table has a **single-column primary key**, you’re automatically free from **partial dependency**, so **2NF = 1NF** in that case.

