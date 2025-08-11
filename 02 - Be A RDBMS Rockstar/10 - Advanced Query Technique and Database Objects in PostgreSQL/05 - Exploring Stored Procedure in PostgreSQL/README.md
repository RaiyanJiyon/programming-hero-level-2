## **📌 What is a Stored Procedure?**

A **stored procedure** in PostgreSQL is a **named block of SQL and procedural code** stored in the database that can:

* Perform actions (INSERT, UPDATE, DELETE, DDL changes, etc.).
* Run **without necessarily returning a value**.
* Support **transactions inside them** (functions can’t do this).

**Important**: Stored procedures in PostgreSQL were introduced in **version 11** — before that, only functions existed.

---

## **🔹 Stored Procedure vs. Function**

| Feature             | Function                | Stored Procedure                                |
| ------------------- | ----------------------- | ----------------------------------------------- |
| Can return values   | ✅ Yes                   | ❌ No (but can use OUT params)                   |
| Transaction control | ❌ No                    | ✅ Yes (COMMIT, ROLLBACK inside)                 |
| Called with         | `SELECT` or `DO`        | `CALL`                                          |
| Primary purpose     | Compute & return result | Execute business logic or multi-step operations |

---

## **🛠 Creating a Simple Stored Procedure**

```sql
CREATE PROCEDURE log_message(msg TEXT)
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO logs(message, created_at)
    VALUES (msg, NOW());
END;
$$;
```

**Call it:**

```sql
CALL log_message('System started');
```

---

## **🔹 Stored Procedure with Parameters**

```sql
CREATE PROCEDURE update_salary(emp_id INT, increment NUMERIC)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE employees
    SET salary = salary + increment
    WHERE id = emp_id;
END;
$$;
```

**Call it:**

```sql
CALL update_salary(3, 5000);
```

---

## **🔹 Transaction Control Inside Procedures**

One big advantage:

```sql
CREATE PROCEDURE transfer_funds(sender INT, receiver INT, amount NUMERIC)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Deduct from sender
    UPDATE accounts
    SET balance = balance - amount
    WHERE id = sender;

    -- Add to receiver
    UPDATE accounts
    SET balance = balance + amount
    WHERE id = receiver;

    COMMIT; -- commit transaction inside procedure
END;
$$;
```

---

## **🔄 Altering and Dropping Procedures**

* Replace logic:

```sql
CREATE OR REPLACE PROCEDURE log_message(msg TEXT) ...
```

* Drop procedure:

```sql
DROP PROCEDURE log_message(TEXT);
```

---

## **⚡ Key Notes**

* Stored procedures **must** be called with `CALL`, not `SELECT`.
* They are best for **business workflows** and **data manipulation**, not returning computed results.
* If you need to return data, use a **function** or a procedure with **OUT parameters**.
* They can **open/close transactions** — great for multi-step operations where you need rollback on failure.
