### 📊 PostgreSQL: **Grouping and Filtering Data with `GROUP BY` and `HAVING`**

The `GROUP BY` and `HAVING` clauses allow you to **group data by categories** and **filter the grouped results** — especially useful with aggregate functions like `COUNT()`, `SUM()`, `AVG()`, etc.

---

## 🔹 1. `GROUP BY` — Group Rows by Column

It groups rows that have the same values in specified columns into summary rows.

### ✅ Syntax:

```sql
SELECT column, AGGREGATE_FUNCTION(column)
FROM table
GROUP BY column;
```

---

### 🔸 Example:

```sql
SELECT department, COUNT(*) AS total_employees
FROM employees
GROUP BY department;
```

🔹 Output:

| department | total\_employees |
| ---------- | ---------------- |
| HR         | 5                |
| IT         | 7                |
| Sales      | 4                |

---

## 🔹 2. Using Aggregate Functions with GROUP BY

Common aggregates used:

* `COUNT()` – number of rows
* `SUM()` – total
* `AVG()` – average
* `MIN()` – lowest value
* `MAX()` – highest value

---

### Example: Average salary per department

```sql
SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department;
```

---

## 🔹 3. `HAVING` — Filter Grouped Results

* `WHERE` filters **before** grouping.
* `HAVING` filters **after** grouping.

### ✅ Syntax:

```sql
SELECT column, AGG(column)
FROM table
GROUP BY column
HAVING condition_on_aggregate;
```

---

### 🔸 Example: Only show departments with more than 5 employees

```sql
SELECT department, COUNT(*) AS total_employees
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;
```

---

### 🔸 Combine `WHERE` and `HAVING`

```sql
SELECT department, AVG(salary) AS avg_salary
FROM employees
WHERE is_active = TRUE
GROUP BY department
HAVING AVG(salary) > 50000;
```

> 🔍 `WHERE` filters rows before grouping, `HAVING` filters groups after aggregation.

---

## ✅ Summary Table

| Clause     | Purpose                                | Example                |
| ---------- | -------------------------------------- | ---------------------- |
| `GROUP BY` | Group rows by column values            | `GROUP BY department`  |
| `HAVING`   | Filter grouped results (like WHERE)    | `HAVING COUNT(*) > 5`  |
| `WHERE`    | Filter individual rows before grouping | `WHERE salary > 30000` |

---

## 🧠 Tip:

* Always use `GROUP BY` with aggregate functions when summarizing.
* Use `HAVING` only when you need to filter **after aggregation**.
