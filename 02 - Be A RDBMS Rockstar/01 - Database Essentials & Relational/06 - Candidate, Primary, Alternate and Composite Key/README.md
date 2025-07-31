## 🔑 1. **Candidate Key**

### ✅ Definition:

A **candidate key** is **any minimal set of attributes** that can **uniquely identify** a row (tuple) in a table.

* There can be **multiple candidate keys** in one table.
* Must be **unique** and **not null**.

### 📌 Example:

**Table: Students**

| StudentID | Email                                     | Phone       | Name  |
| --------- | ----------------------------------------- | ----------- | ----- |
| 101       | [alice@gmail.com](mailto:alice@gmail.com) | 01234567890 | Alice |
| 102       | [bob@gmail.com](mailto:bob@gmail.com)     | 01987654321 | Bob   |

**Candidate Keys:**

* `StudentID`
* `Email`
* `Phone`
  (Each of these can uniquely identify a student.)

---

## 🔑 2. **Primary Key**

### ✅ Definition:

A **primary key** is a **chosen candidate key** that **uniquely identifies each row** in a table.

* Only **one primary key** per table.
* Cannot be **NULL** or **duplicate**.

### 📌 Example:

From the candidate keys above, if we choose `StudentID` as the main identifier, it becomes the **Primary Key**.

---

## 🔑 3. **Alternate Key**

### ✅ Definition:

An **alternate key** is a **candidate key** that **was not selected** as the primary key.

* Still unique and can be used to identify records.
* Useful for applying unique constraints.

### 📌 Example:

If `StudentID` is the primary key, then:

* `Email` and `Phone` become **alternate keys**

---

## 🔑 4. **Composite Key**

### ✅ Definition:

A **composite key** is a **primary key made of two or more columns** used **together** to uniquely identify a row.

* Used when no single column is unique on its own.

### 📌 Example:

**Table: Enrollments**

| StudentID | CourseID | Grade |
| --------- | -------- | ----- |
| 101       | C01      | A     |
| 101       | C02      | B     |
| 102       | C02      | A     |

Here:

* Neither `StudentID` nor `CourseID` alone is unique.
* But together, the pair `(StudentID, CourseID)` **uniquely identifies** each record.

So:
**Composite Key = (StudentID + CourseID)**

---

## 🔁 Summary Table

| Key Type          | Definition                                         | Example                 |
| ----------------- | -------------------------------------------------- | ----------------------- |
| **Candidate Key** | Set of fields that uniquely identify rows          | `StudentID`, `Email`    |
| **Primary Key**   | Main selected candidate key for unique ID          | `StudentID`             |
| **Alternate Key** | Candidate key not chosen as primary                | `Email`, `Phone`        |
| **Composite Key** | Combination of columns used as a unique identifier | `(StudentID, CourseID)` |