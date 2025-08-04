### 🔍 PostgreSQL: Exploring `IN`, `BETWEEN`, `LIKE`, and `ILIKE` Operators

These are powerful **pattern-matching** and **value-comparison** tools used in `WHERE` clauses to filter rows flexibly and efficiently.

---

## 🔹 1. `IN` Operator

Used to match **one value against a list** of values.

### ✅ Syntax:

```sql
SELECT * FROM employees
WHERE department_id IN (1, 3, 5);
```

> 🔸 Returns rows where `department_id` is **1, 3, or 5**

### ❌ NOT IN:

```sql
WHERE department_id NOT IN (2, 4)
```

---

## 🔹 2. `BETWEEN` Operator

Used to match a value **within a range** (inclusive).

### ✅ Syntax:

```sql
SELECT * FROM employees
WHERE salary BETWEEN 30000 AND 60000;
```

> 🔸 Equivalent to:

```sql
WHERE salary >= 30000 AND salary <= 60000
```

### ❌ NOT BETWEEN:

```sql
WHERE salary NOT BETWEEN 20000 AND 50000
```

---

## 🔹 3. `LIKE` Operator

Used for **basic pattern matching** with **wildcards**:

| Wildcard | Meaning                                                  |
| -------- | -------------------------------------------------------- |
| `%`      | Matches **any sequence** of characters (including empty) |
| `_`      | Matches **exactly one** character                        |

### ✅ Examples:

```sql
-- Starts with 'A'
SELECT * FROM employees
WHERE name LIKE 'A%';

-- Ends with 'n'
SELECT * FROM employees
WHERE name LIKE '%n';

-- 3-letter names starting with J and ending with n
SELECT * FROM employees
WHERE name LIKE 'J_n';
```

---

## 🔹 4. `ILIKE` Operator (Case-Insensitive LIKE)

**`ILIKE`** works the same as `LIKE`, but **ignores case**.

### ✅ Examples:

```sql
SELECT * FROM employees
WHERE name ILIKE 'a%';
```

> Matches **"Alice", "ALICE", "alice", "aLiCe"** etc.

---

## ✅ Summary Table

| Operator  | Description                         | Example                       |
| --------- | ----------------------------------- | ----------------------------- |
| `IN`      | Value is in a list                  | `WHERE dept_id IN (1, 2, 3)`  |
| `BETWEEN` | Value is within a range (inclusive) | `WHERE age BETWEEN 20 AND 30` |
| `LIKE`    | Pattern match (case-sensitive)      | `WHERE name LIKE 'J_n%'`      |
| `ILIKE`   | Pattern match (case-insensitive)    | `WHERE name ILIKE '%smith'`   |

---

### 🧠 Pro Tips:

* Use `ILIKE` for user-friendly searches in UIs.
* Use `LIKE 'a%'` when searching for **prefixes** — this can use indexes.
* Avoid `NOT IN (NULL, ...)` – it can produce unexpected results due to `NULL` handling.