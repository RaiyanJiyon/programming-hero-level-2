## **📌 What is a Trigger?**

A **trigger** in PostgreSQL is an **automatic action** executed by the database when a certain event happens on a table or view, such as:

* `INSERT`
* `UPDATE`
* `DELETE`
* `TRUNCATE`

Triggers are **powered by functions** — PostgreSQL requires you to create a *trigger function* first, then link it to a trigger.

---

## **🛠 Types of Triggers**

1. **Row-level** → Executes for each affected row. (`FOR EACH ROW`)
2. **Statement-level** → Executes once per statement. (`FOR EACH STATEMENT`)
3. **Timing:**

   * **BEFORE** → Runs before the event.
   * **AFTER** → Runs after the event.
   * **INSTEAD OF** → Runs instead of the event (used with views).

---

## **📍 Practical Example: Logging Employee Salary Changes**

### **Step 1 – Create a table**

```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    salary NUMERIC(10,2) NOT NULL
);

CREATE TABLE salary_log (
    log_id SERIAL PRIMARY KEY,
    emp_id INT,
    old_salary NUMERIC(10,2),
    new_salary NUMERIC(10,2),
    changed_at TIMESTAMP DEFAULT NOW()
);
```

---

### **Step 2 – Create a trigger function**

A trigger function **must** return `TRIGGER`.

```sql
CREATE OR REPLACE FUNCTION log_salary_change()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO salary_log(emp_id, old_salary, new_salary)
    VALUES (OLD.id, OLD.salary, NEW.salary);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

* `OLD` → the row before update.
* `NEW` → the row after update.

---

### **Step 3 – Create the trigger**

```sql
CREATE TRIGGER after_salary_update
AFTER UPDATE OF salary ON employees
FOR EACH ROW
WHEN (OLD.salary IS DISTINCT FROM NEW.salary)
EXECUTE FUNCTION log_salary_change();
```

Here:

* **`AFTER UPDATE OF salary`** → only triggers when salary changes.
* **`WHEN`** → avoids logging if salary is unchanged.

---

### **Step 4 – Test it**

```sql
-- Insert a sample employee
INSERT INTO employees (name, salary) VALUES ('Alice', 50000);

-- Update salary
UPDATE employees SET salary = 55000 WHERE name = 'Alice';

-- Check logs
SELECT * FROM salary_log;
```

Expected log:

| log\_id | emp\_id | old\_salary | new\_salary | changed\_at |
| ------- | ------- | ----------- | ----------- | ----------- |
| 1       | 1       | 50000.00    | 55000.00    | 2025-08-11  |

---

## **⚡ Extra Examples of Trigger Use Cases**

* **Audit logging** → track who changed what.
* **Data validation** → prevent invalid data before insert/update.
* **Cascade actions** → automatically update related tables.
* **Soft deletes** → move deleted rows to an archive table instead of removing them.

---

## **📌 Dropping a Trigger**

```sql
DROP TRIGGER after_salary_update ON employees;
DROP FUNCTION log_salary_change();
```
