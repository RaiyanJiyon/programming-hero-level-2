### 🗑️ PostgreSQL: **Enforcing Referential Integrity — Behaviors During Data Deletion**

When deleting rows from a **parent table** that is referenced by a **foreign key** in a **child table**, PostgreSQL enforces **referential integrity rules** to maintain consistency. You can control how PostgreSQL behaves using **`ON DELETE` actions**.

---

## 🔗 Example Setup: Parent–Child Relationship

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
  name TEXT,
  department_id INT,
  FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE <ACTION>
);
```

> Replace `<ACTION>` with one of the supported referential integrity behaviors below.

---

## 🔹 Supported `ON DELETE` Actions

| Action               | Behavior                                                          |
| -------------------- | ----------------------------------------------------------------- |
| `RESTRICT` (default) | ❌ Prevent deletion if any child rows exist                        |
| `NO ACTION`          | ❌ Similar to `RESTRICT` (but checked at the end of the statement) |
| `CASCADE`            | ✅ Automatically deletes all related child rows                    |
| `SET NULL`           | ✅ Sets the foreign key in child rows to `NULL`                    |
| `SET DEFAULT`        | ✅ Sets the foreign key to its default value in the child table    |

---

## 🔍 Deletion Scenarios

---

### ✅ 1. `ON DELETE CASCADE`

```sql
-- Set up foreign key with cascading delete
FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
```

#### Behavior:

```sql
DELETE FROM departments WHERE id = 2;
```

✅ Automatically deletes **all employees** with `department_id = 2`.

---

### ✅ 2. `ON DELETE SET NULL`

```sql
FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
```

#### Behavior:

```sql
DELETE FROM departments WHERE id = 3;
```

✅ Employees in department 3 will remain, but their `department_id` becomes `NULL`.

---

### ❌ 3. `ON DELETE RESTRICT` (default behavior)

```sql
FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT
```

#### Behavior:

```sql
DELETE FROM departments WHERE id = 1;
```

⛔ **Fails if** any employee references `department_id = 1`:

```
ERROR: update or delete on table "departments" violates foreign key constraint
DETAIL: Key is still referenced from table "employees".
```

---

### ✅ 4. `ON DELETE SET DEFAULT`

Requires the child column to have a default value:

```sql
ALTER TABLE employees
ALTER COLUMN department_id SET DEFAULT 1;

-- Then:
FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET DEFAULT
```

#### Behavior:

Deletes the department, and employees’ `department_id` becomes `1`.

---

## 📌 Summary Table

| ON DELETE Option | Child Row Behavior on Parent Deletion        |
| ---------------- | -------------------------------------------- |
| `RESTRICT`       | Prevent deletion if children exist (default) |
| `NO ACTION`      | Same as RESTRICT but checked later           |
| `CASCADE`        | Delete all child rows automatically          |
| `SET NULL`       | Set foreign key in child to NULL             |
| `SET DEFAULT`    | Set foreign key in child to default value    |

---

## 🔒 Good Practices

* Always **define ON DELETE behavior** clearly for production databases.
* Use `CASCADE` with care — unintended child deletions may occur.
* Prefer `SET NULL` or `RESTRICT` when you want to preserve child data.
