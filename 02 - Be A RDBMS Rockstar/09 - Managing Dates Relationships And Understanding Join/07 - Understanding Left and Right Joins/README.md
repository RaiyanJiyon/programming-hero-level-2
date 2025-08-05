### 🔗 PostgreSQL: **Understanding `LEFT JOIN` and `RIGHT JOIN`**

In SQL, **joins** allow you to retrieve data from multiple tables based on relationships between them. While `INNER JOIN` returns only matching rows, `LEFT JOIN` and `RIGHT JOIN` also include **non-matching rows** from one of the tables.

---

## 🔹 1. What is a `LEFT JOIN`?

A `LEFT JOIN` returns:

* ✅ All rows from the **left table**
* ✅ Matching rows from the **right table**
* 🚫 `NULL`s where there's **no match** in the right table

---

### 🧩 Example

Let’s reuse two tables:

#### 🏢 Table: `departments`

| id | name    |
| -- | ------- |
| 1  | HR      |
| 2  | IT      |
| 3  | Sales   |
| 4  | Finance |

#### 👩‍💼 Table: `employees`

| id | name    | department\_id |
| -- | ------- | -------------- |
| 1  | Alice   | 2              |
| 2  | Bob     | 1              |
| 3  | Charlie | 3              |

---

### ✅ Query:

```sql
SELECT d.name AS department, e.name AS employee
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id;
```

🔹 **Result:**

| department | employee |
| ---------- | -------- |
| HR         | Bob      |
| IT         | Alice    |
| Sales      | Charlie  |
| Finance    | NULL     |

> 🧠 `Finance` has **no employees**, but still appears in the result with `NULL`.

---

## 🔹 2. What is a `RIGHT JOIN`?

A `RIGHT JOIN` returns:

* ✅ All rows from the **right table**
* ✅ Matching rows from the **left table**
* 🚫 `NULL`s where there's **no match** in the left table

---

### ✅ Query:

```sql
SELECT d.name AS department, e.name AS employee
FROM departments d
RIGHT JOIN employees e ON d.id = e.department_id;
```

🔹 **Result:**

| department | employee |
| ---------- | -------- |
| IT         | Alice    |
| HR         | Bob      |
| Sales      | Charlie  |

> If there were employees without a valid department, you'd see `NULL` in the `department` column.

---

## 🔁 Comparison Summary

| Join Type    | Returns All From | NULLs in Non-Matching Side |
| ------------ | ---------------- | -------------------------- |
| `INNER`      | Only Matches     | None                       |
| `LEFT JOIN`  | Left Table       | Right Table                |
| `RIGHT JOIN` | Right Table      | Left Table                 |

---

## 🧠 Tips

* Use `LEFT JOIN` when you want to show **all items from the primary table**, even if they have no match (e.g., all departments).
* Use `RIGHT JOIN` in reverse scenarios (e.g., all employees, even if their department is missing).
* `FULL OUTER JOIN` combines both — shows everything, matches or not.
