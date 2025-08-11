## **📌 What Happens Without an Index**

When you run:

```sql
SELECT * FROM employees WHERE name = 'Alice';
```

PostgreSQL checks **every row** in the `employees` table (a **sequential scan**), even if there are millions of rows.
This is **O(n)** time complexity — slow for large datasets.

---

## **🔹 What an Index Does**

An **index** is a **separate data structure** stored on disk (and cached in memory) that acts like a **shortcut** to the location of rows matching your query.

Instead of searching row-by-row:

* PostgreSQL searches the **index** (much smaller, faster).
* The index gives **pointers** (row locations) to matching rows.
* PostgreSQL jumps directly to those rows in the table (called a **heap** in PostgreSQL).

---

## **🔍 Default Index Structure — B-Tree**

* PostgreSQL’s default index is a **B-Tree** (balanced tree).
* Data in the index is **sorted**.
* Search is **O(log n)** — much faster than O(n).
* Perfect for:

  * Equality searches (`=`)
  * Range queries (`BETWEEN`, `<`, `>`)
  * Ordering (`ORDER BY`)

Example:

```sql
CREATE INDEX idx_emp_name ON employees (name);
```

When you search for `name = 'Alice'`, PostgreSQL:

1. Searches the B-Tree to find `'Alice'` (binary search style).
2. Gets the **TID** (tuple ID: `(block_number, row_offset)`).
3. Fetches that exact row from the table.

---

## **🗂 How PostgreSQL Stores Indexes**

* **Indexes are stored separately** from the table.
* PostgreSQL may keep **multiple indexes** per table (one per indexed column or combination).
* They consume **extra disk space**.
* Updating a table means **updating all its indexes**, so there’s a write-performance tradeoff.

---

## **📜 Index Usage Process**

When you run a query:

1. **Parser** reads your SQL.
2. **Planner/Optimizer** decides whether using the index is worth it.
3. If beneficial:

   * **Index scan** happens.
   * Matching TIDs are retrieved.
4. **Heap fetch** gets the actual rows.

If the optimizer decides the table is small, it may **ignore** the index and use a sequential scan (because the overhead of jumping around might be slower than reading all rows).

---

## **🔹 Types of Index Scans**

* **Index Scan** → Uses index to find rows, then fetches from table.
* **Index Only Scan** → Uses index entirely (if all needed columns are in the index).
* **Bitmap Index Scan** → Efficient for many matches; fetches in batches.

---

## **⚠ Important Notes**

* Indexes **speed up reads** but **slow down writes** (INSERT/UPDATE/DELETE).
* Too many indexes = slower updates + wasted disk space.
* Indexes must be **ANALYZED** (`ANALYZE table_name;`) for the optimizer to know their value.

---

## **🛠 Quick Demo**

```sql
-- Create sample table
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name TEXT,
    department TEXT
);

-- Insert 1M rows
INSERT INTO employees (name, department)
SELECT md5(random()::text), 'IT'
FROM generate_series(1, 1000000);

-- Create index
CREATE INDEX idx_name ON employees(name);

-- Compare
EXPLAIN ANALYZE SELECT * FROM employees WHERE name = 'abc';
```

You’ll see:

* Without index → **Seq Scan** (scans all rows)
* With index → **Index Scan** (jumps to matching rows instantly)