### 📘 Exploring Subqueries in PostgreSQL

Subqueries (also known as *inner queries* or *nested queries*) are queries nested inside another query. They allow you to perform more complex filtering, comparisons, and data manipulations by embedding one SQL statement within another.

---

### 🔹 Types of Subqueries

1. **Scalar Subquery**

   * Returns a single value (one row, one column).
   * Can be used in `SELECT`, `WHERE`, or `SET` clauses.

   ```sql
   SELECT name, (SELECT AVG(salary) FROM employees) AS avg_salary
   FROM employees;
   ```

2. **Column Subquery**

   * Returns a single column of multiple rows.
   * Often used with `IN`, `ANY`, `ALL`.

   ```sql
   SELECT name FROM employees
   WHERE department_id IN (SELECT id FROM departments WHERE location = 'Dhaka');
   ```

3. **Row Subquery**

   * Returns a single row with multiple columns.

   ```sql
   SELECT name FROM employees
   WHERE (department_id, salary) = (SELECT department_id, MAX(salary) FROM employees);
   ```

4. **Table Subquery**

   * A subquery that returns a full table (can be used with `FROM` clause).

   ```sql
   SELECT * FROM (
     SELECT name, salary FROM employees
     WHERE salary > 50000
   ) AS high_earners;
   ```

---

### 🔹 Subquery in `WHERE` Clause

```sql
SELECT name FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```

---

### 🔹 Subquery in `FROM` Clause

```sql
SELECT department, avg_salary FROM (
  SELECT department_id AS department, AVG(salary) AS avg_salary
  FROM employees
  GROUP BY department_id
) AS dept_avg;
```

---

### 🔹 Subquery in `SELECT` Clause

```sql
SELECT name, 
  (SELECT COUNT(*) FROM tasks WHERE tasks.employee_id = employees.id) AS task_count
FROM employees;
```

---

### 🔹 Correlated Subqueries

* Reference columns from the outer query.
* Executed once for every row in the outer query.

```sql
SELECT name FROM employees e
WHERE salary > (
  SELECT AVG(salary) FROM employees WHERE department_id = e.department_id
);
```

---

### ⚠️ Subquery Best Practices

* **Performance**: Subqueries can be slow; consider using `JOINs` if possible.
* **Readability**: Use meaningful aliases and formatting.
* **Avoid unnecessary nesting**: Especially for scalar values.
