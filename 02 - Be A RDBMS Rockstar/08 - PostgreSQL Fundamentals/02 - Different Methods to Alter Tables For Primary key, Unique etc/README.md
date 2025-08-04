### 🔧 PostgreSQL: **Different Methods to ALTER Tables for Constraints**

(**Primary Key**, **Unique**, **Foreign Key**, **Check**, etc.)

The `ALTER TABLE` command in PostgreSQL allows you to **add**, **drop**, or **modify** constraints **after** a table has been created.

---

## 🔹 🔑 1. **Add a Primary Key**

### ✅ If the column already exists:

```sql
ALTER TABLE employees
ADD CONSTRAINT employees_pk PRIMARY KEY (id);
```

> 🧠 You must make sure that all existing values in `id` are unique and NOT NULL before adding this.

---

## 🔹 🆔 2. **Add a UNIQUE Constraint**

```sql
ALTER TABLE employees
ADD CONSTRAINT unique_email UNIQUE (email);
```

> ✅ You can also add a **composite UNIQUE**:

```sql
ALTER TABLE employees
ADD CONSTRAINT unique_email_dept UNIQUE (email, department_id);
```

---

## 🔹 🔐 3. **Add a FOREIGN KEY Constraint**

```sql
ALTER TABLE employees
ADD CONSTRAINT fk_department
FOREIGN KEY (department_id) REFERENCES departments(id);
```

> ➕ Optional: Use `ON DELETE` or `ON UPDATE` rules:

```sql
FOREIGN KEY (department_id) REFERENCES departments(id)
ON DELETE SET NULL
ON UPDATE CASCADE;
```

---

## 🔹 📏 4. **Add a CHECK Constraint**

```sql
ALTER TABLE employees
ADD CONSTRAINT check_salary_positive
CHECK (salary >= 0);
```

---

## 🔹 ❌ 5. **Drop Constraints**

You must know the **constraint name** (use `\d tablename` in `psql` to find it):

```sql
ALTER TABLE employees
DROP CONSTRAINT check_salary_positive;
```

---

## 🔹 🔁 6. **Change a Column to NOT NULL**

```sql
ALTER TABLE employees
ALTER COLUMN name SET NOT NULL;
```

To remove:

```sql
ALTER TABLE employees
ALTER COLUMN name DROP NOT NULL;
```

---

## 🔹 🧾 7. **Set or Change Default Values**

```sql
ALTER TABLE employees
ALTER COLUMN is_active SET DEFAULT TRUE;
```

Remove default:

```sql
ALTER TABLE employees
ALTER COLUMN is_active DROP DEFAULT;
```

---

## ✅ Summary Table

| Task                  | Syntax Example                                                |
| --------------------- | ------------------------------------------------------------- |
| Add PRIMARY KEY       | `ADD CONSTRAINT name PRIMARY KEY (col)`                       |
| Add UNIQUE            | `ADD CONSTRAINT name UNIQUE (col)`                            |
| Add FOREIGN KEY       | `ADD CONSTRAINT name FOREIGN KEY (col) REFERENCES table(col)` |
| Add CHECK             | `ADD CONSTRAINT name CHECK (condition)`                       |
| Drop constraint       | `DROP CONSTRAINT name`                                        |
| Alter column NOT NULL | `ALTER COLUMN col SET NOT NULL`                               |
| Set default value     | `ALTER COLUMN col SET DEFAULT value`                          |
