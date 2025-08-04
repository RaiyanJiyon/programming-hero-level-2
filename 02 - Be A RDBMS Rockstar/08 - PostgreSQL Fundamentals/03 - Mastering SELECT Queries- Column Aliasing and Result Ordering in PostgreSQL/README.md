### 🧠 Mastering `SELECT` Queries in PostgreSQL

🪄 Focus: **Column Aliasing** & **Result Ordering**

---

## 🔹 What is a `SELECT` Query?

The `SELECT` statement is used to **retrieve data** from one or more tables in a PostgreSQL database.

Basic syntax:

```sql
SELECT column1, column2 FROM table_name;
```

---

## 🔸 Part 1: **Column Aliasing with `AS`**

**Aliasing** means giving a temporary name to a column or expression to make results clearer.

### ✅ Syntax:

```sql
SELECT column_name AS alias_name FROM table;
```

> 🔹 You can also alias **without `AS`**:

```sql
SELECT column_name alias_name FROM table;
```

---

### 📌 Example:

Suppose you have this table:

```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  salary NUMERIC
);
```

### 👇 Query with aliasing:

```sql
SELECT
  first_name || ' ' || last_name AS full_name,
  salary AS monthly_salary
FROM employees;
```

🔹 Result:

| full\_name   | monthly\_salary |
| ------------ | --------------- |
| Alice Rahman | 50000           |
| Bob Karim    | 42000           |

---

### 💡 Why use aliases?

* Make output more readable
* Rename calculated or combined columns
* Help when joining multiple tables

---

## 🔸 Part 2: **Ordering Results with `ORDER BY`**

Use `ORDER BY` to **sort results** by one or more columns.

### ✅ Syntax:

```sql
SELECT * FROM table_name
ORDER BY column_name [ASC | DESC];
```

* `ASC` = ascending (default)
* `DESC` = descending

---

### 📌 Example:

```sql
SELECT first_name, salary
FROM employees
ORDER BY salary DESC;
```

🔹 Result: Employees sorted by highest salary first

---

### ✅ Multi-column ORDER BY:

```sql
SELECT first_name, last_name, salary
FROM employees
ORDER BY last_name ASC, first_name ASC;
```

🔹 Sorts by `last_name`, then by `first_name` for duplicates.

---

### 💡 You can also sort by **column alias** or **position**:

```sql
SELECT first_name || ' ' || last_name AS full_name, salary
FROM employees
ORDER BY full_name;
```

or:

```sql
SELECT first_name, salary
FROM employees
ORDER BY 2 DESC;  -- sorts by the second column (salary)
```

---

## ✅ Summary Table

| Feature          | Syntax Example                         | Purpose                        |
| ---------------- | -------------------------------------- | ------------------------------ |
| Column aliasing  | `SELECT name AS full_name FROM users;` | Rename output column           |
| Order ascending  | `ORDER BY salary ASC;`                 | Sort low to high               |
| Order descending | `ORDER BY salary DESC;`                | Sort high to low               |
| Sort by alias    | `ORDER BY full_name;`                  | Use renamed column for sorting |
| Sort by position | `ORDER BY 2;`                          | Sort by second selected column |
