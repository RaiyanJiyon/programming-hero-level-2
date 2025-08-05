### 🗓️ PostgreSQL: **Handling Date and Date Functions**

PostgreSQL offers powerful built-in support for **dates**, **times**, and **date functions**. These tools allow you to store, manipulate, and calculate time-based data easily.

---

## 🔹 1. Common Date/Time Data Types

| Data Type     | Description                                 |
| ------------- | ------------------------------------------- |
| `DATE`        | Only date (e.g., `2025-07-31`)              |
| `TIME`        | Only time (e.g., `14:30:00`)                |
| `TIMESTAMP`   | Date and time (e.g., `2025-07-31 14:30:00`) |
| `TIMESTAMPTZ` | Timestamp with time zone                    |
| `INTERVAL`    | A span of time (e.g., `2 days`, `3 hours`)  |

---

## 🔹 2. Getting Current Date and Time

```sql
SELECT CURRENT_DATE;         -- Only the date
SELECT CURRENT_TIME;         -- Only the time
SELECT CURRENT_TIMESTAMP;    -- Date + time
SELECT NOW();                -- Same as CURRENT_TIMESTAMP
```

---

## 🔹 3. Inserting Date/Time Data

```sql
INSERT INTO events (title, event_date)
VALUES ('Workshop', '2025-08-15');

-- With timestamp
INSERT INTO logs (log_message, created_at)
VALUES ('System started', NOW());
```

---

## 🔹 4. Extracting Parts of a Date

```sql
SELECT EXTRACT(YEAR FROM CURRENT_DATE);       -- 2025
SELECT EXTRACT(MONTH FROM CURRENT_DATE);      -- 7
SELECT EXTRACT(DAY FROM CURRENT_DATE);        -- 31
```

---

## 🔹 5. Date Arithmetic

### ✅ Adding / Subtracting Intervals:

```sql
SELECT CURRENT_DATE + INTERVAL '5 days';      -- 5 days later
SELECT CURRENT_DATE - INTERVAL '1 month';     -- 1 month earlier
```

### ✅ Age Between Dates:

```sql
SELECT AGE('2025-07-31', '2000-01-01');       -- 25 years, 7 months, ...
```

---

## 🔹 6. Filtering by Date

```sql
SELECT * FROM events
WHERE event_date = CURRENT_DATE;

SELECT * FROM employees
WHERE hire_date BETWEEN '2020-01-01' AND '2023-12-31';
```

---

## 🔹 7. Formatting Dates with `TO_CHAR`

```sql
SELECT TO_CHAR(CURRENT_DATE, 'YYYY-MM-DD');          -- 2025-07-31
SELECT TO_CHAR(NOW(), 'Month DD, YYYY');             -- July 31, 2025
SELECT TO_CHAR(NOW(), 'HH24:MI:SS');                 -- 24-hour time
```

> 🧠 Use `TO_CHAR()` to convert dates into readable/custom formats.

---

## ✅ Summary Table

| Task                   | Example                                            |
| ---------------------- | -------------------------------------------------- |
| Get current date/time  | `NOW()`, `CURRENT_DATE`, `CURRENT_TIMESTAMP`       |
| Extract year/month/day | `EXTRACT(YEAR FROM date_column)`                   |
| Add/Subtract time      | `date + INTERVAL '7 days'`                         |
| Age between dates      | `AGE(date1, date2)`                                |
| Format as string       | `TO_CHAR(date, 'YYYY-MM-DD')`                      |
| Filter by date range   | `WHERE date BETWEEN '2023-01-01' AND '2023-12-31'` |
