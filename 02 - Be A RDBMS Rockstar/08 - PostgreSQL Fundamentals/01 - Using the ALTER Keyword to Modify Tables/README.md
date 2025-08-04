### 🔧 PostgreSQL: **Using the `ALTER` Keyword to Modify Tables**

The `ALTER TABLE` command in PostgreSQL is used to **change the structure** of an existing table—like adding, removing, or modifying columns, constraints, or table properties.

---

## 🔹 ✅ Basic Syntax

```sql
ALTER TABLE table_name
ACTION;
```

---

## 🔹 🔁 Common Use Cases of `ALTER TABLE`

---

### 1️⃣ **Add a New Column**

```sql
ALTER TABLE employees
ADD COLUMN phone VARCHAR(20);
```

---

### 2️⃣ **Remove (Drop) a Column**

```sql
ALTER TABLE employees
DROP COLUMN phone;
```

---

### 3️⃣ **Rename a Column**

```sql
ALTER TABLE employees
RENAME COLUMN salary TO monthly_salary;
```

---

### 4️⃣ **Change a Column’s Data Type**

```sql
ALTER TABLE employees
ALTER COLUMN monthly_salary TYPE NUMERIC(12,2);
```

> ⚠️ If there’s incompatible data, PostgreSQL may block the change.

---

### 5️⃣ **Set or Drop a Default Value**

```sql
-- Set a default
ALTER TABLE employees
ALTER COLUMN is_active SET DEFAULT TRUE;

-- Remove the default
ALTER TABLE employees
ALTER COLUMN is_active DROP DEFAULT;
```

---

### 6️⃣ **Add a Constraint**

```sql
-- Add a UNIQUE constraint
ALTER TABLE employees
ADD CONSTRAINT unique_email UNIQUE (email);

-- Add a CHECK constraint
ALTER TABLE employees
ADD CONSTRAINT positive_salary CHECK (monthly_salary > 0);
```

---

### 7️⃣ **Drop a Constraint**

```sql
ALTER TABLE employees
DROP CONSTRAINT unique_email;
```

> Use `\d employees` in `psql` to find constraint names.

---

### 8️⃣ **Rename the Table**

```sql
ALTER TABLE employees
RENAME TO staff;
```

---

### 9️⃣ **Set Column to NOT NULL**

```sql
ALTER TABLE employees
ALTER COLUMN name SET NOT NULL;
```

---

### 🔍 View Table Structure (In psql)

```bash
\d employees
```

---

## 🧠 Summary Table

| Action             | Command Example                   |
| ------------------ | --------------------------------- |
| Add column         | `ADD COLUMN col_name TYPE;`       |
| Drop column        | `DROP COLUMN col_name;`           |
| Rename column      | `RENAME COLUMN old TO new;`       |
| Change column type | `ALTER COLUMN col TYPE new_type;` |
| Add constraint     | `ADD CONSTRAINT name CHECK (...)` |
| Drop constraint    | `DROP CONSTRAINT name;`           |
| Rename table       | `RENAME TO new_table;`            |
