### 🧪 PostgreSQL: **Inserting Data into a Table & Checking Constraints**

---

## 🔹 🔧 Before You Begin: Sample Table with Constraints

Let's create a table with **multiple constraints** to demonstrate how they work.

```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  salary NUMERIC(10, 2) CHECK (salary >= 0),
  department_id INT,
  is_active BOOLEAN DEFAULT TRUE
);
```

---

## 🟢 **1. Inserting Valid Data**

```sql
INSERT INTO employees (name, email, salary, department_id)
VALUES ('Alice Rahman', 'alice@example.com', 50000.00, 1);
```

✅ This will succeed because:

* `name` is not null
* `email` is unique
* `salary` is ≥ 0

---

## 🔴 **2. Violating Constraints (Examples)**

### ❌ `NOT NULL` Constraint

```sql
INSERT INTO employees (email, salary)
VALUES ('bob@example.com', 40000);
```

> 🔥 **Error:** `null value in column "name" violates not-null constraint`

---

### ❌ `UNIQUE` Constraint

```sql
INSERT INTO employees (name, email, salary)
VALUES ('Bob Karim', 'alice@example.com', 42000);
```

> 🔥 **Error:** `duplicate key value violates unique constraint "employees_email_key"`

---

### ❌ `CHECK` Constraint

```sql
INSERT INTO employees (name, email, salary)
VALUES ('Charlie Hasan', 'charlie@example.com', -100);
```

> 🔥 **Error:** `new row for relation "employees" violates check constraint "employees_salary_check"`

---

## 🧪 **3. How to Check Existing Constraints**

### ✅ View Constraints on a Table

```sql
-- List all constraints on a table
SELECT conname, contype, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conrelid = 'employees'::regclass;
```

---

### ✅ Using `psql` Meta-Command

```bash
\d employees
```

This shows:

* Columns
* Data types
* Default values
* Constraints (`PK`, `UNIQUE`, `CHECK`, etc.)

---

## ✅ Summary of Common Constraint Violations

| Constraint    | Error Cause                             | Error Message Hint                |
| ------------- | --------------------------------------- | --------------------------------- |
| `NOT NULL`    | Required column is left empty           | `violates not-null constraint`    |
| `UNIQUE`      | Duplicate value in a unique column      | `violates unique constraint`      |
| `CHECK`       | Data doesn't meet validation condition  | `violates check constraint`       |
| `FOREIGN KEY` | Value doesn't exist in referenced table | `violates foreign key constraint` |