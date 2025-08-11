## **1️⃣ Subqueries in `SELECT` Clause**

Used to compute a value for each row.

**Example:**

```sql
SELECT 
    name,
    (SELECT COUNT(*) 
     FROM tasks 
     WHERE tasks.employee_id = employees.id) AS task_count
FROM employees;
```

* Here, the subquery counts how many tasks each employee has.
* Runs once for **each row** in `employees`.

---

## **2️⃣ Subqueries in `FROM` Clause** (*Derived Tables*)

Used when you want to treat the result of a subquery as a table.

**Example:**

```sql
SELECT department_id, avg_salary
FROM (
    SELECT department_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id
) AS dept_avg
WHERE avg_salary > 60000;
```

* The subquery calculates average salary per department.
* The outer query filters the results.

---

## **3️⃣ Subqueries in `WHERE` Clause**

Used to filter rows based on the result of another query.

**Example:**

```sql
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```

* The subquery returns the average salary.
* The outer query selects employees above that average.

---

## **4️⃣ Subqueries in `HAVING` Clause**

Used to filter aggregated data.

**Example:**

```sql
SELECT department_id, COUNT(*) AS emp_count
FROM employees
GROUP BY department_id
HAVING COUNT(*) > (
    SELECT AVG(dept_count)
    FROM (
        SELECT COUNT(*) AS dept_count
        FROM employees
        GROUP BY department_id
    ) AS sub
);
```

* First, an inner subquery calculates employee counts per department.
* Then `HAVING` compares each department’s count to the overall average.

---

## **5️⃣ Subqueries in `INSERT` Statement**

You can insert the result of a subquery into a table.

**Example:**

```sql
INSERT INTO high_earners (name, salary)
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```

* Inserts only high earners into a new table.

---

## **6️⃣ Subqueries in `UPDATE` Statement**

You can update rows based on a subquery’s result.

**Example:**

```sql
UPDATE employees
SET salary = salary * 1.1
WHERE id IN (
    SELECT id FROM employees WHERE performance_rating = 'A'
);
```

* Gives a 10% raise to all employees with performance rating "A".

---

## **7️⃣ Subqueries in `DELETE` Statement**

Delete rows that match subquery criteria.

**Example:**

```sql
DELETE FROM employees
WHERE department_id IN (
    SELECT id FROM departments WHERE is_closed = TRUE
);
```

* Deletes all employees belonging to closed departments.

---

✅ **Summary Table:**

| Clause   | Purpose                     | Typical Use           |
| -------- | --------------------------- | --------------------- |
| `SELECT` | Compute values for each row | Inline calculations   |
| `FROM`   | Treat query result as table | Derived tables        |
| `WHERE`  | Filter rows                 | Conditional checks    |
| `HAVING` | Filter aggregates           | Group filtering       |
| `INSERT` | Insert query results        | Bulk insert           |
| `UPDATE` | Modify based on query       | Conditional updates   |
| `DELETE` | Remove based on query       | Conditional deletions |
