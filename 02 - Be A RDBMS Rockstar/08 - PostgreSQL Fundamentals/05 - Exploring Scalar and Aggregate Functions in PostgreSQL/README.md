### 📊 Exploring Scalar and Aggregate Functions in PostgreSQL

PostgreSQL provides **built-in functions** to **manipulate**, **analyze**, and **summarize** data. These are classified as:

---

## 🔹 1. Scalar Functions

🔹 **Scalar functions** operate on a **single value** and return a **single result**.

### ✅ Common Scalar Function Categories

| Function Type  | Example                                       | Description       |
| -------------- | --------------------------------------------- | ----------------- |
| **String**     | `UPPER()`, `LOWER()`, `LENGTH()`, `CONCAT()`  | Operate on text   |
| **Numeric**    | `ROUND()`, `CEIL()`, `FLOOR()`, `ABS()`       | Work with numbers |
| **Date/Time**  | `NOW()`, `AGE()`, `CURRENT_DATE`, `EXTRACT()` | Handle date/time  |
| **Conversion** | `CAST()`, `TO_CHAR()`, `TO_DATE()`            | Change data types |

---

### 🔸 String Function Example

```sql
SELECT UPPER('postgres') AS upper_name;
-- Result: POSTGRES
```

```sql
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM employees;
```

---

### 🔸 Numeric Function Example

```sql
SELECT ROUND(123.4567, 2);  -- Result: 123.46
```

```sql
SELECT ABS(-10);  -- Result: 10
```

---

### 🔸 Date/Time Function Example

```sql
SELECT NOW();  -- Current timestamp

SELECT AGE('2000-01-01');  -- Returns age from date

SELECT EXTRACT(YEAR FROM CURRENT_DATE); -- Returns current year
```

---

## 🔹 2. Aggregate Functions

🔹 **Aggregate functions** operate on a **set of rows** and return a **single summary value**.

### ✅ Common Aggregate Functions

| Function  | Description             | Example Output     |
| --------- | ----------------------- | ------------------ |
| `COUNT()` | Count of rows           | `COUNT(*) → 10`    |
| `SUM()`   | Sum of a numeric column | `SUM(salary)`      |
| `AVG()`   | Average value           | `AVG(age)`         |
| `MIN()`   | Minimum value           | `MIN(joined_date)` |
| `MAX()`   | Maximum value           | `MAX(salary)`      |

---

### 🔸 Aggregate Function Examples

```sql
SELECT COUNT(*) FROM employees;
```

```sql
SELECT AVG(salary) AS average_salary FROM employees;
```

```sql
SELECT department_id, MAX(salary)
FROM employees
GROUP BY department_id;
```

> 🧠 `GROUP BY` is often used with aggregate functions to summarize by category.

---

## 🔸 Using Both Scalar and Aggregate Together

```sql
SELECT department_id,
       ROUND(AVG(salary), 2) AS avg_salary
FROM employees
GROUP BY department_id;
```

---

## ✅ Summary Table

| Function Type | Example       | Use Case                            |
| ------------- | ------------- | ----------------------------------- |
| Scalar        | `UPPER(name)` | Format/manipulate individual fields |
| Aggregate     | `AVG(salary)` | Summarize groups of data            |