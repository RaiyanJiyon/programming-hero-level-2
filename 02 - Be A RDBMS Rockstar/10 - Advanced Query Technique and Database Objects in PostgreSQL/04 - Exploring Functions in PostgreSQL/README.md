## **📌 What is a Function in PostgreSQL?**

A **function** in PostgreSQL is a **stored block of code** that performs a task and returns a value.

* Once created, you can call it anywhere in SQL.
* They help **modularize** and **reuse** logic.
* Written in **PL/pgSQL** (PostgreSQL’s procedural language) or other supported languages.

---

## **🔹 Why Use Functions?**

1. **Reusability** – Avoid repeating the same logic in multiple queries.
2. **Performance** – Runs on the server side, reducing network overhead.
3. **Encapsulation** – Hide complex business logic.
4. **Maintainability** – Change logic in one place, affect all calls.

---

## **🛠 Creating a Simple Function**

**Example 1: Function without Parameters**

```sql
CREATE FUNCTION get_current_date()
RETURNS DATE AS $$
BEGIN
    RETURN CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;
```

**Call it:**

```sql
SELECT get_current_date();
```

---

**Example 2: Function with Parameters**

```sql
CREATE FUNCTION emp_full_name(first TEXT, last TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN first || ' ' || last;
END;
$$ LANGUAGE plpgsql;
```

**Call it:**

```sql
SELECT emp_full_name('John', 'Doe');
```

---

## **🔹 Functions Returning Tables**

```sql
CREATE FUNCTION get_high_earners(min_salary NUMERIC)
RETURNS TABLE(id INT, name TEXT, salary NUMERIC) AS $$
BEGIN
    RETURN QUERY
    SELECT e.id, e.name, e.salary
    FROM employees e
    WHERE e.salary > min_salary;
END;
$$ LANGUAGE plpgsql;
```

**Call it:**

```sql
SELECT * FROM get_high_earners(60000);
```

---

## **🔹 Using Built-in SQL Functions**

PostgreSQL already has many built-in functions:

* **String**: `UPPER()`, `LOWER()`, `CONCAT()`
* **Math**: `ROUND()`, `POWER()`, `ABS()`
* **Date/Time**: `NOW()`, `AGE()`, `DATE_TRUNC()`
* **Aggregate**: `COUNT()`, `SUM()`, `AVG()`

Example:

```sql
SELECT UPPER(name), ROUND(salary, 2) FROM employees;
```

---

## **🔄 Replacing and Dropping Functions**

* Replace logic without dropping:

```sql
CREATE OR REPLACE FUNCTION get_current_date()
RETURNS DATE AS $$
BEGIN
    RETURN NOW()::DATE;
END;
$$ LANGUAGE plpgsql;
```

* Drop function:

```sql
DROP FUNCTION get_current_date();
```

(Include parameter types if it has parameters.)

---

## **⚡ Key Notes**

* Functions can be **IMMUTABLE**, **STABLE**, or **VOLATILE**:

  * **IMMUTABLE** → Always returns same result for same inputs (e.g., `abs()`).
  * **STABLE** → Same within a single query (e.g., `current_date`).
  * **VOLATILE** → Can change anytime (e.g., `random()`).
* Functions **can** be used in `SELECT`, `WHERE`, `JOIN`, etc.
* For heavy calculations that don’t change often, **consider materialized views** instead.
