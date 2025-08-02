### 🔐 PostgreSQL: **Different Methods to Define Constraints**

In PostgreSQL, **constraints** are rules applied to table columns to **enforce data integrity** and **prevent invalid data**.

---

## 🔹 🔧 Types of Constraints in PostgreSQL

| Constraint Type | Description                                                |
| --------------- | ---------------------------------------------------------- |
| `NOT NULL`      | Ensures the column cannot contain `NULL` values            |
| `UNIQUE`        | Ensures all values in a column are unique                  |
| `PRIMARY KEY`   | Combines `UNIQUE` + `NOT NULL` for a unique row identifier |
| `FOREIGN KEY`   | Links a column to a primary key in another table           |
| `CHECK`         | Validates data with a condition (e.g. `salary > 0`)        |
| `DEFAULT`       | Provides a default value if none is supplied               |

---

## 🛠️ Two Methods to Define Constraints

### ✅ 1. **Inline (Column-Level) Constraints**

Defined **next to the column** in the `CREATE TABLE` statement.

```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  salary NUMERIC(10,2) CHECK (salary > 0),
  is_active BOOLEAN DEFAULT TRUE
);
```

🔹 Constraints apply **only to the column** they're attached to.

---

### ✅ 2. **Table-Level Constraints**

Defined **after all columns**, and can:

* Apply to **multiple columns**
* Be used for **composite keys**, **multi-column checks**, etc.

```sql
CREATE TABLE enrollments (
  student_id INT,
  course_id INT,
  grade CHAR(1),
  PRIMARY KEY (student_id, course_id),            -- Composite key
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id),
  CHECK (grade IN ('A', 'B', 'C', 'D', 'F'))
);
```

---

## 🔍 Summary Table

| Method           | When to Use                                                                         |
| ---------------- | ----------------------------------------------------------------------------------- |
| **Column-Level** | For single-column constraints (e.g., `NOT NULL`, `DEFAULT`)                         |
| **Table-Level**  | For constraints involving multiple columns (e.g., composite keys, complex `CHECK`s) |

---

## 📘 Bonus: ALTER TABLE to Add Constraints Later

You can also add constraints to an existing table:

```sql
ALTER TABLE employees
ADD CONSTRAINT unique_email UNIQUE (email);

ALTER TABLE employees
ADD CONSTRAINT check_salary CHECK (salary > 0);
```
