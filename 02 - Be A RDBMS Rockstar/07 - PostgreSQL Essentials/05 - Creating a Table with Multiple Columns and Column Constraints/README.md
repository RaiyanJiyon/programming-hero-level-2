### 🧱 PostgreSQL: **Creating a Table with Multiple Columns and Column Constraints**

---

## 🔹 What is a Table?

A **table** in PostgreSQL is a collection of **rows** and **columns** used to store structured data.

Each **column** has a **name**, a **data type**, and often **constraints** (rules to ensure data validity).

---

## ✅ Example: Create a Table with Multiple Columns + Constraints

```sql
CREATE TABLE employees (
  employee_id SERIAL PRIMARY KEY,               -- Auto-incrementing ID
  first_name VARCHAR(50) NOT NULL,              -- Cannot be empty
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,           -- Must be unique
  date_of_birth DATE CHECK (date_of_birth < CURRENT_DATE),  -- Must be in the past
  salary NUMERIC(10, 2) DEFAULT 0.00 CHECK (salary >= 0),   -- Non-negative
  department_id INT REFERENCES departments(id), -- Foreign Key constraint
  is_active BOOLEAN DEFAULT TRUE
);
```

---

## 🔍 Column Constraints Explained

| Constraint          | Meaning                                                                |
| ------------------- | ---------------------------------------------------------------------- |
| `PRIMARY KEY`       | Uniquely identifies each row; auto-indexed                             |
| `NOT NULL`          | Column **must** have a value                                           |
| `UNIQUE`            | No duplicate values allowed                                            |
| `CHECK (condition)` | Validates data against a rule (e.g., age > 0)                          |
| `DEFAULT`           | Value used if none is provided                                         |
| `REFERENCES`        | Foreign Key: Ensures the value exists in another table (enforces link) |

---

## 📘 Minimal Example

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  age INT CHECK (age >= 0 AND age <= 150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🧪 Insert Sample Data

```sql
INSERT INTO employees (first_name, last_name, email, date_of_birth, salary, department_id)
VALUES ('Alice', 'Rahman', 'alice@example.com', '1990-05-10', 50000, 2);
```

---

## ✅ Summary

You can use multiple columns and apply **constraints** to each column during table creation to ensure:

* **Data integrity**
* **Validation**
* **Relationships** between tables

