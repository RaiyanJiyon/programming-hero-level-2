### 🔐 PostgreSQL: **Enforcing Referential Integrity — Behaviors During Data Insertion**

Referential Integrity ensures that relationships between tables remain **valid and consistent** — especially when inserting, updating, or deleting data in **foreign key–related tables**.

Let’s break down **how PostgreSQL behaves during INSERTs** when **foreign keys** are involved.

---

## 🧩 Referential Integrity Recap

A **foreign key constraint** ensures that a value in the **child table** **must exist** in the **parent table**.

---

## 🧪 Example Setup

### 🔹 Parent Table: `departments`

```sql
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);
```

### 🔹 Child Table: `employees`

```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

---

## 🔄 Behavior During Data Insertion

### ✅ 1. **Insert a Valid Reference (Success)**

```sql
-- First insert a department
INSERT INTO departments (name) VALUES ('IT');

-- Then insert an employee in that department
INSERT INTO employees (name, department_id)
VALUES ('Alice', 1);
```

✅ Successful: department\_id = 1 exists in the `departments` table.

---

### ❌ 2. **Insert an Invalid Reference (Fails)**

```sql
-- This will FAIL if department 999 doesn't exist
INSERT INTO employees (name, department_id)
VALUES ('Bob', 999);
```

⛔ **Error**:

```
ERROR:  insert or update on table "employees" violates foreign key constraint
DETAIL: Key (department_id)=(999) is not present in table "departments".
```

---

### ⚠️ 3. **Insert with `NULL` Foreign Key (Allowed)**

```sql
INSERT INTO employees (name, department_id)
VALUES ('Charlie', NULL);
```

✅ Allowed if the foreign key column is **nullable** and constraint doesn’t enforce `NOT NULL`.

---

## 🔒 Summary of Insertion Behaviors

| Insert Attempt Type          | Result | Reason                                        |
| ---------------------------- | ------ | --------------------------------------------- |
| Valid reference              | ✅ Pass | Referenced key exists in parent table         |
| Invalid reference            | ❌ Fail | Value not present in parent table             |
| `NULL` in foreign key column | ✅ Pass | Allowed unless `NOT NULL` is enforced         |
| Parent not inserted yet      | ❌ Fail | Must insert parent **before** inserting child |

---

## 🔁 Optional Behavior Controls with `DEFERRABLE` (Advanced)

You can defer foreign key checks until the end of a transaction:

```sql
ALTER TABLE employees
ADD CONSTRAINT fk_dept
FOREIGN KEY (department_id)
REFERENCES departments(id)
DEFERRABLE INITIALLY DEFERRED;
```

> Useful for bulk inserts where child rows are inserted before the parent (committed together).

---

## ✅ Best Practice: Insert Order

Always follow this order to avoid integrity violations:

1. **Insert into parent table** first (`departments`)
2. **Insert into child table** (`employees`)
