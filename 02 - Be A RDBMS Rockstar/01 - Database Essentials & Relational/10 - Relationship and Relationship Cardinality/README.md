### 🔗 **Relationship and Relationship Cardinality in DBMS**

---

## 🔹 What is a **Relationship**?

In a **relational database**, a **relationship** is an **association between two or more entities (tables)**. It shows **how data in one table relates** to data in another.

---

### ✅ Example:

If you have two tables:

#### `Students`

| StudentID | Name  |
| --------- | ----- |
| 1         | Alice |
| 2         | Bob   |

#### `Courses`

| CourseID | Title   |
| -------- | ------- |
| 101      | Math    |
| 102      | English |

A **relationship** would show **which students are enrolled in which courses**. This could be represented in a third table called `Enrollments`:

#### `Enrollments`

| StudentID | CourseID |
| --------- | -------- |
| 1         | 101      |
| 1         | 102      |
| 2         | 101      |

This shows a **relationship** between `Students` and `Courses`.

---

## 🔹 What is **Relationship Cardinality**?

### ✅ **Cardinality** defines the **number of instances** of one entity that can or must be associated with each instance of another entity.

It answers:

> **"How many?"**

---

## 🔢 Types of Relationship Cardinality

---

### 1. **One-to-One (1:1)**

* Each record in Table A is related to **one and only one** record in Table B.
* Rare in practice.

**Example:**
Each person has **one passport**, and each passport belongs to **one person**.

---

### 2. **One-to-Many (1\:N)**

* One record in Table A can be related to **many** records in Table B.
* Most common relationship type.

**Example:**
One **teacher** teaches **many courses**, but each course has only **one teacher**.

---

### 3. **Many-to-One (N:1)**

* Many records in Table A relate to **one** record in Table B.

**Example:**
Many **employees** work in **one department**.

---

### 4. **Many-to-Many (M\:N)**

* Many records in Table A can relate to **many** records in Table B.
* Implemented using a **junction (bridge) table**.

**Example:**

* Many **students** enroll in many **courses**
* Use a table like `Enrollments` to link `Students` and `Courses`

---

## 🔁 Summary Table

| Cardinality Type    | Description                           | Example                |
| ------------------- | ------------------------------------- | ---------------------- |
| One-to-One (1:1)    | One record in A ↔ One record in B     | Person ↔ Passport      |
| One-to-Many (1\:N)  | One record in A → Many records in B   | Teacher → Courses      |
| Many-to-One (N:1)   | Many records in A → One record in B   | Employees → Department |
| Many-to-Many (M\:N) | Many records in A ↔ Many records in B | Students ↔ Courses     |
