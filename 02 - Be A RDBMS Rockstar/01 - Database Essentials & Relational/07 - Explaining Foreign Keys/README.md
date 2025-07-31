### 🔗 **Foreign Key – Explained Simply**

A **foreign key** is a **column (or a group of columns)** in one table that **links to the primary key** in another table.

---

## 🔹 ✅ Definition:

> A **foreign key** creates a **relationship** between two tables by **referring to the primary key** of another table.

* It ensures **referential integrity**, meaning the value in the foreign key **must match** a value in the referenced primary key, or be **NULL** (if allowed).
* It **prevents invalid data entry** that would break the relationship between tables.

---

## 🔹 📘 Real-Life Example:

### 🗂️ Table 1: `Students`

| **StudentID** (PK) | Name  | Age |
| ------------------ | ----- | --- |
| 101                | Alice | 20  |
| 102                | Bob   | 21  |

### 📄 Table 2: `Enrollments`

| **EnrollmentID** | **StudentID** (FK) | Course      |
| ---------------- | ------------------ | ----------- |
| 1                | 101                | Math        |
| 2                | 102                | Physics     |
| 3                | 101                | Programming |

🔸 Here, `StudentID` in the **Enrollments** table is a **foreign key** that refers to `StudentID` in the **Students** table.

---

## 🔹 🔐 Key Points About Foreign Keys

| Feature               | Description                                          |
| --------------------- | ---------------------------------------------------- |
| **Purpose**           | To connect related tables                            |
| **Points to**         | A **primary key** or **unique key** in another table |
| **Maintains**         | Data integrity across tables                         |
| **Allows duplicates** | Yes, unlike primary keys                             |
| **Allows NULLs**      | Sometimes, depending on the design                   |

---

## 🔄 Example of Relationship:

* One **Student** can be enrolled in **many Courses** → **One-to-Many** relationship
* So, `Enrollments.StudentID` is a **foreign key** linking many records to a **single student** in the `Students` table.

---

## 🔧 Foreign Key Syntax in SQL

```sql
CREATE TABLE Enrollments (
  EnrollmentID INT PRIMARY KEY,
  StudentID INT,
  Course VARCHAR(50),
  FOREIGN KEY (StudentID) REFERENCES Students(StudentID)
);
```

---

## 🔁 Summary:

| Term            | Role in Foreign Key Relationship                  |
| --------------- | ------------------------------------------------- |
| **Primary Key** | Unique identifier in the **parent** table         |
| **Foreign Key** | References the primary key in the **child** table |

