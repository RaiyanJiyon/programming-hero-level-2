### ⚠️ Understanding **Anomalies in Database Systems**

In a poorly designed database (especially **un-normalized** or **partially normalized** databases), anomalies can occur during **data operations** like insert, update, or delete. These are known as **data anomalies**.

---

## 🔍 What is a Database Anomaly?

A **database anomaly** is an **undesired or inconsistent state** in a database that can happen when inserting, deleting, or updating data.

Anomalies are a **sign of poor database design** and often occur when multiple entities are stored in the same table.

---

## 🔸 Types of Anomalies

---

### 1. **Insertion Anomaly**

❗ Problem: You **can’t insert data** because other unrelated data is missing.

**Example:**
You want to insert a new course into the system, but you can’t because no student has enrolled in it yet.

**Why?**
In an unnormalized table storing student and course data together, you must have a student to add a course row.

---

### 2. **Update Anomaly**

❗ Problem: You must **update the same data in many places**, and missing one causes inconsistency.

**Example:**
If a course name changes, you must update it in **every row** where it appears. If one row is missed, data becomes inconsistent.

---

### 3. **Deletion Anomaly**

❗ Problem: **Deleting one piece of data** removes **unintended information**.

**Example:**
If the **only student enrolled in a course** is deleted from the table, you also lose the **course information**, even though the course still exists.

---

## 🔁 Example of All Anomalies in One Table

Suppose this unnormalized table:

| StudentID | StudentName | CourseName | CourseFee |
| --------- | ----------- | ---------- | --------- |
| 1         | Alice       | Math       | 3000      |
| 2         | Bob         | Math       | 3000      |
| 3         | Charlie     | English    | 2500      |

### Insertion Anomaly:

* You can’t insert a new course unless at least one student is enrolled.

### Update Anomaly:

* To change `Math` fee to `3500`, you must update multiple rows. If you miss one → inconsistency.

### Deletion Anomaly:

* If Charlie is removed, you also lose all info about the `English` course.

---

## 🛠️ How to Avoid Anomalies?

The main solution is **Normalization**:

* Breaking large tables into smaller, logical ones
* Creating proper **entity relationships**
* Using **primary keys** and **foreign keys**

---

## ✅ Summary Table

| Type          | Problem                                           | Solution                   |
| ------------- | ------------------------------------------------- | -------------------------- |
| **Insertion** | Can’t add data without other related data         | Normalize the table        |
| **Update**    | Must change the same data in multiple places      | Use separate tables        |
| **Deletion**  | Deleting one item removes unrelated critical data | Break into multiple tables |
