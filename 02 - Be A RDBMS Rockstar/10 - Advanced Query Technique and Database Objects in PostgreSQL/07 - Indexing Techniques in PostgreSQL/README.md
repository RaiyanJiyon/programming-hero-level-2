## **📌 What is an Index?**

An **index** is like a "lookup table" that PostgreSQL uses to speed up **searches** and **query filtering**.
Without an index, PostgreSQL has to scan every row (**sequential scan**), which gets slow for large tables.

Think of it like the index at the back of a book — instead of reading every page, you jump straight to the page with the keyword.

---

## **🛠 Basic Index Creation**

```sql
CREATE INDEX idx_employee_name
ON employees (name);
```

* Now queries like

  ```sql
  SELECT * FROM employees WHERE name = 'Alice';
  ```

  will be much faster.

---

## **🔹 Types of Indexes in PostgreSQL**

PostgreSQL supports **multiple indexing techniques**, each optimized for different scenarios.

### 1. **B-Tree Index** (default)

* Best for **equality** and **range queries** (`=`, `<`, `>`, `BETWEEN`).
* Created by default if you don’t specify the type.

```sql
CREATE INDEX idx_salary ON employees (salary);
```

---

### 2. **Hash Index**

* Best for **equality lookups** (`=` only), faster than B-tree for this case.
* Needs `USING hash` explicitly.

```sql
CREATE INDEX idx_emp_email_hash
ON employees USING hash (email);
```

---

### 3. **GIN (Generalized Inverted Index)**

* Best for **full-text search** and **array columns**.

```sql
CREATE INDEX idx_emp_skills_gin
ON employees USING gin (skills);
```

Example query:

```sql
SELECT * FROM employees WHERE skills @> ARRAY['PostgreSQL'];
```

---

### 4. **GiST (Generalized Search Tree)**

* Best for **geospatial data** (PostGIS), ranges, and fuzzy matching.

```sql
CREATE INDEX idx_emp_location_gist
ON employees USING gist (location);
```

---

### 5. **BRIN (Block Range Index)**

* Best for **large, sequentially ordered data** (like timestamps).
* Very small in size but works best when data is physically sorted.

```sql
CREATE INDEX idx_emp_joined_brin
ON employees USING brin (joined_date);
```

---

### 6. **Partial Index**

* Index only a subset of rows to save space and speed up queries.

```sql
CREATE INDEX idx_active_employees
ON employees (name)
WHERE active = true;
```

---

### 7. **Unique Index**

* Enforces uniqueness (automatically created with `UNIQUE` constraint).

```sql
CREATE UNIQUE INDEX idx_unique_email
ON employees (email);
```

---

### 8. **Covering Index (INCLUDE)**

* Store extra columns in the index to avoid looking up the table.

```sql
CREATE INDEX idx_name_with_salary
ON employees (name) INCLUDE (salary);
```

---

## **📍 Checking Index Usage**

```sql
EXPLAIN ANALYZE
SELECT * FROM employees WHERE name = 'Alice';
```

* Shows whether PostgreSQL used your index or not.

---

## **⚠ When NOT to Use Indexes**

* Small tables (overhead > benefit)
* Columns with very few unique values (low **selectivity**)
* Frequent updates/deletes (index maintenance cost)

---

## **🚀 Pro Tip for Performance**

In **large-scale systems**, mixing:

* **B-tree** for IDs and ranges
* **GIN** for full-text and JSONB
* **BRIN** for time-series data
  gives the best balance.
