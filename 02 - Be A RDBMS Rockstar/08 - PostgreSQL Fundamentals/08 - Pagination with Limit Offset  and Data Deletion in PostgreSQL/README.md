### 📚 PostgreSQL: **Pagination with `LIMIT` and `OFFSET`** & **Data Deletion**

---

## 🔹 1. Pagination Using `LIMIT` and `OFFSET`

Pagination allows you to **retrieve chunks of rows** (like pages in a book), especially useful when working with large datasets in apps, dashboards, or web pages.

---

### ✅ Basic Syntax:

```sql
SELECT * FROM table_name
ORDER BY column_name
LIMIT number_of_rows OFFSET number_to_skip;
```

---

### 🔸 Example: Employees Table

```sql
-- Get first 5 records
SELECT * FROM employees
ORDER BY id
LIMIT 5;

-- Get next 5 records (page 2)
SELECT * FROM employees
ORDER BY id
LIMIT 5 OFFSET 5;

-- Get page 3 (rows 11–15)
SELECT * FROM employees
ORDER BY id
LIMIT 5 OFFSET 10;
```

> 🧠 `OFFSET` skips rows, and `LIMIT` determines how many to return.

---

### 🔹 Pro Tip: Page-Based Pagination Formula

```sql
OFFSET = (page_number - 1) * page_size
```

---

### 🧠 Note:

Always use `ORDER BY` when paginating to ensure consistent and predictable results.

---

## 🔹 2. Data Deletion in PostgreSQL

Use the `DELETE` statement to **remove rows** from a table.

---

### ✅ Basic Syntax:

```sql
DELETE FROM table_name
WHERE condition;
```

> ⚠️ Without a `WHERE` clause, **all rows** will be deleted!

---

### 🔸 Examples:

```sql
-- Delete a single employee
DELETE FROM employees
WHERE id = 101;

-- Delete all employees in department 3
DELETE FROM employees
WHERE department_id = 3;
```

---

### 🔥 Delete All Rows (use with caution!)

```sql
DELETE FROM employees;
-- OR for faster truncate (reset IDs too):
TRUNCATE TABLE employees RESTART IDENTITY;
```

---

### 🛑 Safe Deletion Tip

Always test with `SELECT` first:

```sql
SELECT * FROM employees
WHERE salary < 10000;

-- If results look correct, then delete
DELETE FROM employees
WHERE salary < 10000;
```

---

## ✅ Summary Table

| Feature    | Use Case                              | Syntax Example                   |
| ---------- | ------------------------------------- | -------------------------------- |
| `LIMIT`    | Set max rows to return                | `LIMIT 10`                       |
| `OFFSET`   | Skip rows before returning data       | `OFFSET 20`                      |
| `DELETE`   | Delete specific rows                  | `DELETE FROM table WHERE id = 5` |
| `TRUNCATE` | Delete all rows (fast & irreversible) | `TRUNCATE TABLE table_name`      |
