### 🔗 PostgreSQL: **Constructing Relationships with Foreign Key Constraints**

In relational databases, a **foreign key** creates a **link between two tables**. It ensures **referential integrity**, meaning a value in one table **must match** a value in another table — just like creating a parent-child relationship.

---

## 🔹 What is a Foreign Key?

A **foreign key** is a column (or set of columns) in one table that **references the primary key** of another table.

---

### ✅ Example: Two Related Tables

#### 🎯 Table 1: `departments`

```sql
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);
```

#### 🧑‍💼 Table 2: `employees` (with foreign key)

```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

> This ensures that every `department_id` in `employees` **must exist** in `departments(id)`.

---

## 🔹 Syntax to Add a Foreign Key (During Table Creation)

```sql
FOREIGN KEY (column_name) REFERENCES parent_table(primary_key_column)
```

---

## 🔹 Adding Foreign Key After Table Creation

```sql
ALTER TABLE employees
ADD CONSTRAINT fk_department
FOREIGN KEY (department_id)
REFERENCES departments(id);
```

---

## 🔹 Cascade Options for Deletion/Update

| Option               | Description                                                          |
| -------------------- | -------------------------------------------------------------------- |
| `ON DELETE CASCADE`  | Delete child rows when parent row is deleted                         |
| `ON DELETE SET NULL` | Set child column to NULL if parent row is deleted                    |
| `ON DELETE RESTRICT` | Prevent deletion if there are matching child rows (default behavior) |
| `ON UPDATE CASCADE`  | Update child rows if parent key changes                              |

### 🔸 Example:

```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name TEXT,
  department_id INT,
  FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE
);
```

---

## 🧠 Why Use Foreign Keys?

* Enforce data **accuracy and integrity**
* Prevent orphan records (e.g., an employee linked to a non-existent department)
* Ensure valid relationships between tables

---

## ✅ Summary

| Concept                   | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| Foreign Key               | Column that references another table’s primary key           |
| Referential Integrity     | Ensures valid and consistent data relationships              |
| `ON DELETE` / `ON UPDATE` | Control behavior when referenced rows are changed or removed |

---

### 🔎 Check Foreign Keys in `psql`

```bash
\d employees
```

> Shows constraints, including foreign keys.
