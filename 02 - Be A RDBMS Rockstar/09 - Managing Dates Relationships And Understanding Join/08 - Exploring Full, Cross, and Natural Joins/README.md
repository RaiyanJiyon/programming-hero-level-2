### 🔗 PostgreSQL: **Exploring `FULL JOIN`, `CROSS JOIN`, and `NATURAL JOIN`**

Besides `INNER`, `LEFT`, and `RIGHT JOINs`, PostgreSQL also supports:

* `FULL JOIN` – combines both `LEFT` and `RIGHT JOIN`
* `CROSS JOIN` – returns all possible combinations
* `NATURAL JOIN` – joins automatically on columns with the same name

---

## 🔹 1. `FULL JOIN` (or `FULL OUTER JOIN`)

Combines results of both `LEFT JOIN` and `RIGHT JOIN`.

> ✅ Returns all rows from **both** tables.
> 🔸 `NULL`s are shown where there's no match.

### 🔸 Syntax:

```sql
SELECT *
FROM table1
FULL JOIN table2
ON table1.column = table2.column;
```

---

### 🧩 Example:

```sql
SELECT d.name AS department, e.name AS employee
FROM departments d
FULL JOIN employees e
ON d.id = e.department_id;
```

🧾 Result:

| department | employee |                              |
| ---------- | -------- | ---------------------------- |
| HR         | Bob      |                              |
| IT         | Alice    |                              |
| Sales      | Charlie  |                              |
| Finance    | NULL     |                              |
| NULL       | David    | ← if David has no department |

---

## 🔹 2. `CROSS JOIN`

Returns the **Cartesian product** of two tables:
Every row from table A is joined with **every row** from table B.

### 🔸 Syntax:

```sql
SELECT *
FROM table1
CROSS JOIN table2;
```

---

### 🧩 Example:

```sql
SELECT e.name AS employee, d.name AS department
FROM employees e
CROSS JOIN departments d;
```

If there are **3 employees** and **4 departments**, result = `3 x 4 = 12 rows`.

> ⚠️ Use carefully: `CROSS JOIN` can return massive results.

---

## 🔹 3. `NATURAL JOIN`

Automatically joins tables **using columns with the same name and data type**.

### 🔸 Syntax:

```sql
SELECT *
FROM table1
NATURAL JOIN table2;
```

---

### 🧩 Example:

If both `employees` and `departments` tables have a column named `department_id`:

```sql
SELECT *
FROM employees
NATURAL JOIN departments;
```

> Joins on `department_id` automatically.

---

### ⚠️ Caution:

* `NATURAL JOIN` is **convenient but risky** — if a new same-named column is added to both tables, it might unexpectedly change results.
* Prefer `ON` for clarity and control.

---

## ✅ Summary Table

| Join Type      | Returns                                    | Use Case                                 |
| -------------- | ------------------------------------------ | ---------------------------------------- |
| `FULL JOIN`    | All matches + non-matches from both tables | Merge left/right with unmatched rows     |
| `CROSS JOIN`   | All combinations                           | Testing, permutations, matrix-style data |
| `NATURAL JOIN` | Matches on same-named columns              | Quick joins where schema is predictable  |

---

## 🧠 Best Practices

* Use `FULL JOIN` for **comprehensive reporting** where all data matters.
* Use `CROSS JOIN` with **small tables only** to avoid performance issues.
* Use `NATURAL JOIN` with **care** — explicit `ON` clauses are safer and clearer.
