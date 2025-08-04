### 🔍 PostgreSQL 8–5: **Data Filtering Using `WHERE`, Logical Operators & Comparison Operators**

---

## 🔹 🔧 What is the `WHERE` Clause?

The `WHERE` clause filters records by **applying conditions** to rows returned by a `SELECT`, `UPDATE`, or `DELETE` query.

### ✅ Basic Syntax:

```sql
SELECT column1, column2
FROM table_name
WHERE condition;
```

---

## 🔹 📏 Comparison Operators

| Operator     | Meaning                     | Example (`salary = 50000`)       |
| ------------ | --------------------------- | -------------------------------- |
| `=`          | Equal to                    | `salary = 50000`                 |
| `!=` or `<>` | Not equal to                | `salary != 50000`                |
| `>`          | Greater than                | `age > 30`                       |
| `<`          | Less than                   | `age < 60`                       |
| `>=`         | Greater than or equal       | `salary >= 40000`                |
| `<=`         | Less than or equal          | `age <= 40`                      |
| `BETWEEN`    | Within a range (inclusive)  | `salary BETWEEN 30000 AND 60000` |
| `IN`         | Matches any value in a list | `department_id IN (1, 2, 3)`     |
| `LIKE`       | Pattern matching            | `name LIKE 'A%'`                 |
| `IS NULL`    | Value is NULL               | `email IS NULL`                  |

---

## 🔹 🔗 Logical Operators

| Operator | Description                 | Example                         |
| -------- | --------------------------- | ------------------------------- |
| `AND`    | All conditions must be true | `age > 25 AND salary < 50000`   |
| `OR`     | At least one must be true   | `age < 25 OR department_id = 3` |
| `NOT`    | Negates a condition         | `NOT (salary > 50000)`          |

---

## 🧪 Practical Examples

### 1️⃣ **Filter employees earning over 40,000**

```sql
SELECT * FROM employees
WHERE salary > 40000;
```

---

### 2️⃣ **Find employees in department 1 or 2**

```sql
SELECT * FROM employees
WHERE department_id IN (1, 2);
```

---

### 3️⃣ **Get employees whose names start with "A"**

```sql
SELECT * FROM employees
WHERE first_name LIKE 'A%';
```

---

### 4️⃣ **Filter with multiple conditions**

```sql
SELECT * FROM employees
WHERE salary BETWEEN 30000 AND 60000
  AND is_active = TRUE;
```

---

### 5️⃣ **Check for missing values**

```sql
SELECT * FROM employees
WHERE email IS NULL;
```

---

## 🔹 🧠 Tips

* Use `()` to group conditions:

  ```sql
  WHERE (salary > 40000 AND department_id = 1) OR is_active = FALSE;
  ```
* `LIKE` is case-sensitive; use `ILIKE` for case-insensitive matching:

  ```sql
  WHERE name ILIKE 'a%'; -- matches 'alice', 'Alice', etc.
  ```

---

## ✅ Summary

| Tool           | Use Case                     | Example                      |
| -------------- | ---------------------------- | ---------------------------- |
| `WHERE`        | Filter rows                  | `WHERE age > 30`             |
| Comparison Ops | Define conditions            | `=`, `!=`, `<`, `IN`, `LIKE` |
| Logical Ops    | Combine or negate conditions | `AND`, `OR`, `NOT`           |
