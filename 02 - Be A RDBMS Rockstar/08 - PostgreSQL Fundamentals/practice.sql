/*
 * =============================================
 * STUDENTS DATABASE SCHEMA & OPERATIONS
 * =============================================
 *
 * TABLE: students
 *
 * Column Name     | Description
 * ----------------|---------------------------------------------------
 * id              | Auto-incremented primary key
 * roll            | Unique roll number for each student
 * name            | Name of the student
 * age             | Age of the student (must be > 0)
 * department      | Student’s department (CSE, EEE, ME, CE, BBA)
 * score           | Score achieved (0–100)
 * status          | Academic status ('passed', 'failed')
 * last_login      | Last login timestamp (defaults to current time)
 * student_email   | Email address (unique, valid format)
 *
 * =============================================
 */

-- ✅ 1. CREATE TABLE with constraints
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    roll INT UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    age INT CHECK (age > 0),
    department VARCHAR(50) NOT NULL 
        CHECK (department IN ('CSE', 'EEE', 'ME', 'CE', 'BBA')),
    score DECIMAL(5, 2) 
        CHECK (score >= 0 AND score <= 100),
    status VARCHAR(10) NOT NULL 
        CHECK (status IN ('passed', 'failed')),
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ✅ 2. INSERT INITIAL DATA (First batch)
INSERT INTO students (roll, name, age, department, score, status)
VALUES 
    (101, 'Alice Smith', 20, 'CSE', 85.50, 'passed'),
    (102, 'Bob Johnson', 22, 'EEE', 78.00, 'passed'),
    (103, 'Charlie Brown', 19, 'ME', 65.00, 'failed'),
    (104, 'Diana Prince', 21, 'CE', 90.00, 'passed'),
    (105, 'Ethan Hunt', 23, 'BBA', 72.50, 'passed');

-- ✅ 3. INSERT ADDITIONAL DATA (Second batch)
INSERT INTO students (roll, name, age, department, score, status)
VALUES 
    (106, 'Fiona Gallagher', 20, 'CSE', 88.00, 'passed'),
    (107, 'George Costanza', 22, 'EEE', 55.00, 'failed'),
    (108, 'Hannah Baker', 19, 'ME', 80.00, 'passed'),
    (109, 'Ian Malcolm', 21, 'CE', 95.00, 'passed'),
    (110, 'Julia Roberts', 23, 'BBA', 67.50, 'failed');


-- ✅ 4. ALTER TABLE: Add email column with validation
ALTER TABLE students
ADD COLUMN student_email VARCHAR(100) UNIQUE NOT NULL
    CHECK (student_email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');


-- ✅ 5. RENAME COLUMN (example of schema change)
-- Note: We already added as 'student_email', so this is redundant.
-- But if it was 'email', we'd rename it like this:
-- ALTER TABLE students RENAME COLUMN email TO student_email;


-- ✅ 6. TEMPORARY: Show all students (before dropping email)
SELECT * FROM students;


-- ✅ 7. ALTER TABLE: Drop email column (for demonstration)
ALTER TABLE students DROP COLUMN student_email;


-- ✅ 8. SELECT: Show final data (without email)
SELECT * FROM students;


-- ✅ 9. FILTERING QUERIES

-- Students with score > 80
SELECT * FROM students 
WHERE score > 80 AND score IS NOT NULL;

-- Exclude students from CSE department
SELECT * FROM students
WHERE NOT department = 'CSE';

-- Names starting with 'A' (case-sensitive and insensitive)
SELECT * FROM students
WHERE name LIKE 'A%' OR name ILIKE 'A%';

-- Students aged between 18 and 25
SELECT * FROM students
WHERE age BETWEEN 18 AND 25;

-- Specific roll numbers
SELECT * FROM students
WHERE roll IN (101, 103, 105, 107);


-- ✅ 10. AGGREGATE QUERIES

-- Total number of students
SELECT COUNT(*) AS total_students FROM students;

-- Number of students with non-NULL scores
SELECT COUNT(score) AS students_with_score FROM students;

-- Number of unique departments
SELECT COUNT(DISTINCT department) AS unique_departments FROM students;

-- Number of students who passed
SELECT COUNT(*) AS passed_count FROM students WHERE status = 'passed';

-- Number of students in CSE
SELECT COUNT(*) AS cse_count FROM students WHERE department = 'CSE';

-- Average score for CSE students
SELECT ROUND(AVG(score), 2) AS average_score
FROM students
WHERE department = 'CSE';

-- Average score per department
SELECT 
    department, 
    ROUND(AVG(score), 2) AS average_score
FROM students
GROUP BY department;

-- Max and min age
SELECT MAX(age) AS max_age, MIN(age) AS min_age FROM students;


-- ✅ 11. UPDATE: Set status based on score
-- Update: Mark students with score < 70 as 'failed' (even if previously passed)
UPDATE students
SET status = 'failed'
WHERE score < 70;

-- Verify update
SELECT * FROM students;


-- ✅ 12. DELETE: Remove inactive students (not logged in for over a year)
-- Note: CURRENT_DATE - INTERVAL works in PostgreSQL
DELETE FROM students
WHERE last_login < CURRENT_DATE - INTERVAL '1 year';

-- Check remaining students
SELECT * FROM students;


-- ✅ 13. PAGINATION: Second page, 5 rows per page
-- Ordered by id for consistent results
SELECT * FROM students
ORDER BY id
LIMIT 5 OFFSET 5;