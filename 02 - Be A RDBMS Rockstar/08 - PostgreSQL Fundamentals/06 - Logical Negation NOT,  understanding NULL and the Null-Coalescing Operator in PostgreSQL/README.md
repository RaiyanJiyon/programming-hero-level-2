### 🚫 PostgreSQL: **Logical Negation `NOT`, Understanding `NULL`, and the Null-Coalescing Operator `COALESCE`**

---

## 🔹 1. Logical Negation: `NOT`

The `NOT` keyword is used to **negate a condition**.

### ✅ Syntax:

```sql
SELECT * FROM table
WHERE NOT condition;
```

---

### 📌 Example:

```sql
SELECT * FROM employees
WHERE NOT is_active;
```

> Returns only employees where `is_active` is `FALSE`.

---

### 🧠 You can combine with other conditions:

```sql
SELECT * FROM employees
WHERE NOT (salary > 50000 AND department_id = 2);
```

---

## 🔹 2. Understanding `NULL` in PostgreSQL

* `NULL` represents **unknown or missing data**.
* It is **not equal to 0**, an empty string, or false.
* Any arithmetic or comparison with `NULL` results in **NULL**.

---

### 🧪 Examples:

```sql
SELECT 5 + NULL;         -- NULL
SELECT NULL = NULL;      -- NULL (not TRUE!)
```

---

### ✅ Checking for NULL

| Check       | Example                    |
| ----------- | -------------------------- |
| Is NULL     | `WHERE email IS NULL`      |
| Is not NULL | `WHERE salary IS NOT NULL` |

---

## 🔹 3. Null-Coalescing with `COALESCE`

`COALESCE(value1, value2, ...)` returns the **first non-NULL value** in the list.

### ✅ Use Case: Replace NULL with a Default Value

```sql
SELECT name, COALESCE(email, 'No Email') AS contact_email
FROM employees;
```

> 🔹 If `email` is NULL, it shows “No Email” instead.

---

### 🔄 With Calculations:

```sql
SELECT name, salary + COALESCE(bonus, 0) AS total_income
FROM employees;
```

> Ensures `bonus` is treated as 0 when NULL.

---

## 🧠 Summary Table

| Feature       | Use Case                  | Example              |
| ------------- | ------------------------- | -------------------- |
| `NOT`         | Logical negation          | `NOT is_active`      |
| `IS NULL`     | Check for missing data    | `email IS NULL`      |
| `IS NOT NULL` | Ensure value is present   | `salary IS NOT NULL` |
| `COALESCE`    | Replace NULL with default | `COALESCE(bonus, 0)` |

---

### ⚠️ Tips:

* `NULL` = unknown, not 0 or empty string.
* Use `COALESCE()` in reporting to avoid empty cells or calculations failing.
