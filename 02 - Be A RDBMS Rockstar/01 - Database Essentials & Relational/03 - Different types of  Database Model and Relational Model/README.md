## 🔹 Different Types of **Database Models**

A **Database Model** defines **how data is organized**, **stored**, and **related** to each other in a database.

Here are the main types:

---

### 1. **Hierarchical Model**

* **Structure:** Tree-like (parent-child)
* **Each child** has only **one parent**
* Fast for simple, one-to-many relationships.

**Example:**
A company database where

* `Department` → `Employees`

**Limitation:**

* Rigid structure; hard to manage complex relationships.

---

### 2. **Network Model**

* **Structure:** Graph-like (many-to-many)
* A child can have **multiple parents**
* More flexible than hierarchical.

**Example:**
Projects linked to multiple employees and vice versa.

**Limitation:**

* Complex to design and maintain.

---

### 3. **Relational Model** ✅ *(Most commonly used today)*

* **Structure:** Tables (rows and columns)
* Uses **keys** (primary & foreign) to define relationships.
* Based on **relational algebra**

**Example:**
Tables: `Students`, `Courses`, `Enrollments`
Relationships managed by matching keys.

**Advantages:**

* Easy to use, scalable, supports SQL.

---

### 4. **Object-Oriented Model**

* Data is stored as **objects** (like in object-oriented programming)
* Supports complex data like multimedia, images, etc.

**Example:**
A CAD system storing images and dimensions as objects.

---

### 5. **Document Model** (used in NoSQL)

* Data is stored in **documents** (e.g., JSON, XML)
* No fixed schema

**Example:**
MongoDB – stores user profiles with flexible fields.

---

### 6. **Key-Value Model** (also NoSQL)

* Data stored as a collection of **key–value pairs**
* Very fast, used for caching and high-performance apps.

**Example:**
Redis, Amazon DynamoDB

---

### 7. **Graph Model**

* Designed for data with **complex relationships**
* Nodes and edges represent entities and their relationships.

**Example:**
Social networks – users connected with friends, likes, posts.

---

## 🔹 Relational Model – In Detail

### ✅ Definition:

The **Relational Model** organizes data into **tables (relations)**. Each table consists of:

* **Rows (Tuples)** – individual records
* **Columns (Attributes)** – fields or properties

---

### ✅ Key Concepts:

| Term                   | Description                                 |
| ---------------------- | ------------------------------------------- |
| **Table (Relation)**   | A set of data organized in rows and columns |
| **Row (Tuple)**        | A single record or entry                    |
| **Column (Attribute)** | A field of the record                       |
| **Primary Key**        | Uniquely identifies each row                |
| **Foreign Key**        | Links to primary key in another table       |

---

### ✅ Example:

#### Table: **Students**

| StudentID | Name  | Age |
| --------- | ----- | --- |
| 101       | Alice | 20  |
| 102       | Bob   | 21  |

#### Table: **Courses**

| CourseID | Title       |
| -------- | ----------- |
| C01      | Math        |
| C02      | Programming |

#### Table: **Enrollments**

| StudentID | CourseID |
| --------- | -------- |
| 101       | C01      |
| 101       | C02      |
| 102       | C02      |

* `StudentID` and `CourseID` are **foreign keys** linking to other tables.
* This shows a **many-to-many** relationship.

---

### ✅ Advantages of Relational Model:

* Easy to understand and use
* Supports powerful **querying with SQL**
* Maintains **data integrity** using keys
* Scalable and widely supported
