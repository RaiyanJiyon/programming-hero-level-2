### 🔗 Resolving **Many-to-Many (M\:N)** Relationships with a **Junction Table**

---

## 🔹 What is a Many-to-Many (M\:N) Relationship?

A **many-to-many** relationship exists when:

> One record in **Table A** can be associated with **multiple** records in **Table B**,
> and one record in **Table B** can be associated with **multiple** records in **Table A**.

---

### 📌 Example:

Let’s take two entities:

* `Students`
* `Courses`

### Relationship:

* A **student** can enroll in **many courses**
* A **course** can have **many students**

This is a **many-to-many (M\:N)** relationship.

---

## ❌ Problem:

Relational databases **do not support M\:N relationships directly**.

---

## ✅ Solution: Use a **Junction Table** (also called a bridge or associative table)

---

## 🛠️ How to Resolve It

### Step 1: Define Original Tables

#### 🧑 Table: `Students`

| StudentID (PK) | Name  |
| -------------- | ----- |
| 1              | Alice |
| 2              | Bob   |

#### 📘 Table: `Courses`

| CourseID (PK) | CourseName |
| ------------- | ---------- |
| C1            | Math       |
| C2            | English    |

---

### Step 2: Create a **Junction Table** to link them

#### 🔗 Table: `Enrollments` (Junction Table)

| StudentID (FK) | CourseID (FK) |
| -------------- | ------------- |
| 1              | C1            |
| 1              | C2            |
| 2              | C1            |

* The **composite primary key** is `(StudentID, CourseID)`
* Both columns are **foreign keys** referencing `Students` and `Courses`

---

## 🔁 Benefits of Using a Junction Table

| Advantage                  | Description                                                                   |
| -------------------------- | ----------------------------------------------------------------------------- |
| ✅ Eliminates redundancy    | No repeated course or student data                                            |
| ✅ Maintains data integrity | Ensures valid course and student combinations                                 |
| ✅ Allows additional info   | You can store extra info like `EnrollmentDate`, `Grade` in the junction table |

---

### 🧪 Bonus: SQL Example

```sql
CREATE TABLE Enrollments (
  StudentID INT,
  CourseID VARCHAR(10),
  EnrollmentDate DATE,
  PRIMARY KEY (StudentID, CourseID),
  FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
  FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);
```

---

## ✅ Summary

| Table       | Purpose                                                             |
| ----------- | ------------------------------------------------------------------- |
| Students    | Stores student details                                              |
| Courses     | Stores course details                                               |
| Enrollments | **Junction table** that links students ↔ courses using foreign keys |
