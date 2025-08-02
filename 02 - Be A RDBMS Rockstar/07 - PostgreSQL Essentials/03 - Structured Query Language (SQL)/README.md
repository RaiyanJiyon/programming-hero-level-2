### 🧑‍💻 Structured Query Language (SQL) – Overview

---

## 🔹 What is SQL?

**SQL (Structured Query Language)** is the **standard programming language** used to **communicate with relational databases**.

It allows you to:

* **Create** and **manage databases**
* **Insert**, **retrieve**, **update**, and **delete** data
* **Control user access** and **permissions**

---

## 🔹 Types of SQL Commands

SQL is categorized into **five main types** of commands:

| Type    | Description                  | Examples                     |
| ------- | ---------------------------- | ---------------------------- |
| **DDL** | Data Definition Language     | `CREATE`, `ALTER`, `DROP`    |
| **DML** | Data Manipulation Language   | `INSERT`, `UPDATE`, `DELETE` |
| **DQL** | Data Query Language          | `SELECT`                     |
| **TCL** | Transaction Control Language | `COMMIT`, `ROLLBACK`         |
| **DCL** | Data Control Language        | `GRANT`, `REVOKE`            |

---

## 🔹 Common SQL Syntax Examples

---

### 🔸 1. **DDL (Data Definition Language)**

```sql
-- Create a table
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  age INT
);

-- Alter a table
ALTER TABLE students ADD COLUMN email VARCHAR(100);

-- Drop a table
DROP TABLE students;
```

---

### 🔸 2. **DML (Data Manipulation Language)**

```sql
-- Insert data
INSERT INTO students (name, age) VALUES ('Alice', 20);

-- Update data
UPDATE students SET age = 21 WHERE name = 'Alice';

-- Delete data
DELETE FROM students WHERE id = 1;
```

---

### 🔸 3. **DQL (Data Query Language)**

```sql
-- Retrieve data
SELECT * FROM students;

-- Filtered query
SELECT name FROM students WHERE age > 18;

-- Ordered results
SELECT * FROM students ORDER BY age DESC;
```

---

### 🔸 4. **TCL (Transaction Control Language)**

```sql
BEGIN;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;  -- Save changes
-- or
ROLLBACK;  -- Undo changes if there's an error
```

---

### 🔸 5. **DCL (Data Control Language)**

```sql
-- Grant privilege
GRANT SELECT ON students TO user1;

-- Revoke privilege
REVOKE INSERT ON students FROM user1;
```

---

## 🔹 SQL Keywords (Quick Reference)

| Keyword    | Purpose                           |
| ---------- | --------------------------------- |
| `SELECT`   | Retrieve data                     |
| `FROM`     | Specify table                     |
| `WHERE`    | Filter results                    |
| `ORDER BY` | Sort results                      |
| `GROUP BY` | Group results                     |
| `JOIN`     | Combine rows from multiple tables |
| `LIKE`     | Pattern matching (`%`, `_`)       |
| `IN`       | Match against a list              |
| `AS`       | Alias for columns or tables       |

---

## ✅ Summary

* SQL is essential for **managing and querying relational databases** like PostgreSQL, MySQL, SQL Server, etc.
* Learn SQL by **understanding CRUD** (Create, Read, Update, Delete)
* Use tools like **pgAdmin**, **DBeaver**, or **psql CLI** for practice
