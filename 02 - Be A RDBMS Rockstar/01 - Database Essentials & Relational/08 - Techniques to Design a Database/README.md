### 🛠️ Techniques to Design a Database

Designing a database is a **systematic process** that ensures data is stored efficiently, accurately, and can be retrieved easily. A **well-designed database** minimizes redundancy, ensures data integrity, and supports future growth.

---

## 🔹 Step-by-Step Database Design Techniques

---

### 1. **Requirement Analysis**

* Understand the **goal** of the database
* Identify what **data** needs to be stored
* Talk to stakeholders and users to gather all **business requirements**

📌 *Example:* For a school database, you may need data about students, teachers, courses, and grades.

---

### 2. **Identify Entities and Relationships**

* Break down the system into **entities** (objects or things).
* Determine how entities are **related** to one another.

📌 *Example:*

* Entities: `Student`, `Course`, `Teacher`
* Relationships:

  * A student **enrolls** in a course
  * A teacher **teaches** a course

---

### 3. **Create an ER (Entity-Relationship) Diagram**

* Visual representation of entities and their relationships
* Includes **attributes**, **primary keys**, and **cardinalities** (1:1, 1\:N, M\:N)

📌 *Tools:* Draw\.io, Lucidchart, dbdiagram.io, etc.

---

### 4. **Define Attributes for Each Entity**

* Decide what **fields** (columns) are needed for each entity

📌 *Example:*
Entity: `Student`
Attributes: `StudentID`, `Name`, `DOB`, `Phone`

---

### 5. **Determine Keys**

* Assign **Primary Keys** to uniquely identify each record
* Identify **Foreign Keys** to establish relationships between tables

---

### 6. **Normalize the Database**

**Normalization** is the process of organizing data to eliminate:

* Redundancy (repeated data)
* Inconsistencies

✅ Apply **normal forms** step by step:

* **1NF (First Normal Form):** Eliminate repeating groups
* **2NF:** Remove partial dependencies
* **3NF:** Remove transitive dependencies

---

### 7. **Convert ER Model to Tables**

* Translate the ER diagram into **physical tables**
* Define columns, data types, constraints (NOT NULL, UNIQUE, etc.)

---

### 8. **Establish Relationships with Foreign Keys**

* Use **foreign keys** to connect tables and maintain referential integrity

---

### 9. **Review and Optimize**

* Check for:

  * Redundant tables
  * Missing relationships
  * Naming consistency
* Consider adding **indexes** for faster searches

---

### 10. **Implement the Database Using DBMS**

* Choose a suitable DBMS (e.g., MySQL, PostgreSQL, Oracle)
* Use **SQL** to create tables and relationships

---

## 🔁 Summary Table

| Step                          | Description                                         |
| ----------------------------- | --------------------------------------------------- |
| Requirement Analysis          | Understand what data to store                       |
| Identify Entities & Relations | Define what objects and relationships exist         |
| ER Diagram                    | Visual structure of data and relationships          |
| Define Attributes             | Decide what data fields are needed                  |
| Determine Keys                | Choose primary and foreign keys                     |
| Normalize                     | Reduce redundancy, ensure integrity                 |
| Create Tables                 | Translate ER to schema (tables and constraints)     |
| Establish Relationships       | Use foreign keys to link tables                     |
| Review & Optimize             | Fine-tune structure for performance and consistency |
| Implement                     | Build the database using a DBMS                     |
