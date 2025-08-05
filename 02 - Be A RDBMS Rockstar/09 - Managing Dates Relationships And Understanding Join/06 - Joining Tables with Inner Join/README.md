### 🔗 PostgreSQL: **Joining Tables with `INNER JOIN`**

`INNER JOIN` is one of the most commonly used joins in SQL. It returns rows **only when there is a match in both tables** based on a specified condition (usually using a foreign key).

---

## 🔹 What is an `INNER JOIN`?

An `INNER JOIN` returns **only the rows** from both tables where the **join condition is true**.

> 🔍 If there’s no match in the other table, the row is **excluded** from the result.

---

## 🧩 Example Setup

### 🏢 `departments` Table (Parent)

| id | name  |
| -- | ----- |
| 1  | HR    |
| 2  | IT    |
| 3  | Sales |

### 👩‍💼 `employees` Table (Child)

| id | name    | department\_id |
| -- | ------- | -------------- |
| 1  | Alice   | 2              |
| 2  | Bob     | 1              |
| 3  | Charlie | 3              |
| 4  | David   | NULL           |

---

## 🔧 Syntax of INNER JOIN

```sql
SELECT columns
FROM table1
INNER JOIN table2
ON table1.column = table2.column;
```

---

## ✅ Example: Joining `employees` and `departments`

```sql
SELECT 
  employees.name AS employee_name,
  departments.name AS department_name
FROM 
  employees
INNER JOIN departments
  ON employees.department_id = departments.id;
```

🔹 **Result:**

| employee\_name | department\_name |
| -------------- | ---------------- |
| Alice          | IT               |
| Bob            | HR               |
| Charlie        | Sales            |

> 🚫 David is **excluded** because his `department_id` is `NULL`.

---

## 🔄 Alternative Syntax (Same Result)

```sql
SELECT e.name, d.name
FROM employees e
JOIN departments d
  ON e.department_id = d.id;
```

---

## 🔍 Filtering After Join

```sql
SELECT e.name, d.name
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE d.name = 'Sales';
```

---

## ✅ Summary

| Concept         | Description                                |
| --------------- | ------------------------------------------ |
| `INNER JOIN`    | Returns only rows with matching values     |
| Match Condition | Usually based on foreign key relationships |
| Aliasing        | Use short aliases (`e`, `d`) for clarity   |

---

### 🧠 Notes:

* `INNER JOIN` is ideal when you **only want matching rows**.
* If you want **all** rows from one table even without matches, use `LEFT JOIN` (not covered here).

