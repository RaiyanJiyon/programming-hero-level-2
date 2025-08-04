### 🔄 PostgreSQL: **Understanding and Using the `UPDATE` Operator**

The `UPDATE` statement is used to **modify existing rows** in a PostgreSQL table.

---

## 🔹 ✅ Basic Syntax

```sql
UPDATE table_name
SET column1 = value1,
    column2 = value2,
    ...
WHERE condition;
```

> ⚠️ Without a `WHERE` clause, **all rows** in the table will be updated.

---

## 🔸 Example Table: `employees`

```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name TEXT,
  salary NUMERIC(10,2),
  department TEXT
);
```

---

## 🔸 1. **Update a Single Row**

```sql
UPDATE employees
SET salary = 60000
WHERE id = 1;
```

> Updates only the employee with `id = 1`

---

## 🔸 2. **Update Multiple Columns**

```sql
UPDATE employees
SET salary = 70000,
    department = 'Marketing'
WHERE name = 'Alice Rahman';
```

---

## 🔸 3. **Update Multiple Rows**

```sql
UPDATE employees
SET salary = salary * 1.10
WHERE department = 'Sales';
```

> Gives a 10% raise to all employees in Sales

---

## 🔸 4. **Update All Rows (Use with Caution)**

```sql
UPDATE employees
SET is_active = FALSE;
```

> Affects **every row** in the table!

---

## 🔸 5. **Using `RETURNING` to View Changes**

```sql
UPDATE employees
SET salary = salary + 5000
WHERE department = 'IT'
RETURNING id, name, salary;
```

> 🔍 Shows you which rows were updated and the new values.

---

## 🔹 🧠 Tips

* Always test with a `SELECT` first before running your `UPDATE`.
* Use the `RETURNING` clause to **preview updates** in real time.
* Combine with `JOIN` to update values based on another table (advanced).

---

## ✅ Summary

| Task                    | Syntax Example                 |
| ----------------------- | ------------------------------ |
| Update one column       | `SET column = value`           |
| Update multiple columns | `SET col1 = val1, col2 = val2` |
| Update using condition  | `WHERE id = 5`                 |
| Update all rows         | No `WHERE` clause (dangerous)  |
| Preview changes         | `RETURNING column1, column2`   |