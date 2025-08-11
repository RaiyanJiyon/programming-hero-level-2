## **📌 What is a View?**

A **view** is essentially a **saved SQL query** that acts like a virtual table.

* It **does not store data** (by default) — instead, it pulls data from one or more tables when queried.
* You can use it just like a table in `SELECT`, `JOIN`, etc.

Think of it as a **"window"** into your database that always shows the result of a predefined query.

---

## **🔹 Why Use Views?**

1. **Simplify Complex Queries**

   * Hide long `JOIN`s and aggregations behind a single name.
2. **Security & Access Control**

   * Give access to specific columns/rows without exposing the full table.
3. **Reusability**

   * Avoid repeating the same query logic in multiple places.
4. **Consistency**

   * Ensure everyone sees data computed in the same way.

---

## **🛠 Creating a View**

```sql
CREATE VIEW high_earners AS
SELECT id, name, salary
FROM employees
WHERE salary > 60000;
```

* Now you can query it like:

```sql
SELECT * FROM high_earners;
```

* This will always show up-to-date results from `employees`.

---

## **🔹 Creating a View with JOIN**

```sql
CREATE VIEW employee_department AS
SELECT e.id, e.name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.id;
```

* Hides the join complexity from the end user.

---

## **🔄 Updating a View**

```sql
CREATE OR REPLACE VIEW high_earners AS
SELECT id, name, salary, department_id
FROM employees
WHERE salary > 70000;
```

---

## **🗑 Dropping a View**

```sql
DROP VIEW high_earners;
```

* Use `DROP VIEW IF EXISTS` to avoid errors if the view is missing.

---

## **🔹 Materialized Views**

Unlike normal views, **materialized views** **store** the query result.

* Faster for repeated queries, but must be refreshed manually.

**Example:**

```sql
CREATE MATERIALIZED VIEW dept_avg_salary AS
SELECT department_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id;
```

**Refresh:**

```sql
REFRESH MATERIALIZED VIEW dept_avg_salary;
```

---

## **⚠️ Key Notes about Views**

* By default, normal views are **read-only** unless the query meets certain conditions (like being simple enough to map back to one table).
* Views **reflect real-time changes** in the underlying tables.
* Materialized views **do not auto-update** — you must refresh them.