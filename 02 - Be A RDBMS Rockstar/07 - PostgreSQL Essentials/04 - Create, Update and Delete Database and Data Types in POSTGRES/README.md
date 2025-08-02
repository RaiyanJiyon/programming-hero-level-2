### 🛠️ PostgreSQL: **Create, Update & Delete Database** + **Common Data Types**

---

## 🔹 📦 Create, Update, and Delete a **Database**

### ✅ **1. Create a Database**

```sql
CREATE DATABASE mydb;
```

You can specify:

```sql
CREATE DATABASE mydb
  WITH OWNER = postgres
  ENCODING = 'UTF8'
  LC_COLLATE = 'en_US.UTF-8'
  LC_CTYPE = 'en_US.UTF-8'
  TEMPLATE = template0;
```

---

### ✅ **2. Connect to a Database**

```sql
\c mydb
```

---

### ✅ **3. Rename a Database**

```sql
ALTER DATABASE mydb RENAME TO newdb;
```

> 🔒 You **must disconnect** from the DB before renaming it.

---

### ✅ **4. Delete (Drop) a Database**

```sql
DROP DATABASE mydb;
```

> ⚠️ **Irreversible** – all data will be lost.

---

## 🔹 🧾 Create, Update, and Delete **Data (DML)**

### 📌 **Create Table + Insert Data**

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  age INT
);

INSERT INTO students (name, age) VALUES ('Alice', 20);
```

---

### 🔁 **Update Data**

```sql
UPDATE students
SET age = 21
WHERE name = 'Alice';
```

---

### ❌ **Delete Data**

```sql
DELETE FROM students
WHERE name = 'Alice';
```

---

## 🔹 🧱 PostgreSQL Data Types (Most Common)

### 🔸 String Types

| Type         | Description                      |
| ------------ | -------------------------------- |
| `CHAR(n)`    | Fixed-length string (padded)     |
| `VARCHAR(n)` | Variable-length string (limit n) |
| `TEXT`       | Unlimited-length text            |

---

### 🔸 Numeric Types

| Type      | Description              |
| --------- | ------------------------ |
| `INT`     | Integer (4 bytes)        |
| `SERIAL`  | Auto-increment integer   |
| `BIGINT`  | Large integer (8 bytes)  |
| `NUMERIC` | Exact decimal            |
| `REAL`    | Floating point (4 bytes) |
| `DOUBLE`  | Floating point (8 bytes) |

---

### 🔸 Date & Time Types

| Type        | Description            |
| ----------- | ---------------------- |
| `DATE`      | Calendar date          |
| `TIME`      | Time of day            |
| `TIMESTAMP` | Date + time            |
| `INTERVAL`  | Duration (e.g. 2 days) |

---

### 🔸 Boolean Type

```sql
is_active BOOLEAN;  -- TRUE / FALSE
```

---

### 🔸 JSON & Arrays

| Type     | Use Case                         |
| -------- | -------------------------------- |
| `JSON`   | Store JSON objects (text format) |
| `JSONB`  | Binary JSON (faster queries)     |
| `TEXT[]` | Array of text                    |

---

## ✅ Example: Create Table with Various Types

```sql
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  salary NUMERIC(10,2),
  joined_at TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);
```
