### 📘 Anatomy of a Table / Relation in the Relational Model

In the **Relational Database Model**, a **table** is also called a **relation**. It is the core structure used to store and manage data in **rows and columns**.

---

## 🔹 Structure of a Table (Relation)

A table consists of the following components:

| Component       | Description                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| **Table Name**  | The name of the relation (e.g., `Students`, `Employees`)                    |
| **Attributes**  | The **columns** of the table; each attribute has a name and data type       |
| **Tuples**      | The **rows** of the table; each row is a record (an entry in the table)     |
| **Domain**      | The **data type** allowed in each column (e.g., INT, VARCHAR, DATE)         |
| **Degree**      | Number of columns (attributes) in the table                                 |
| **Cardinality** | Number of rows (tuples) in the table                                        |
| **Primary Key** | A column (or combination) that uniquely identifies each row                 |
| **Foreign Key** | A column that links to a primary key in another table to form relationships |

---

## 🔹 Example: Table – `Students`

| **StudentID** (PK) | **Name** | **Age** | **Department** |
| ------------------ | -------- | ------- | -------------- |
| 101                | Alice    | 20      | CSE            |
| 102                | Bob      | 21      | EEE            |
| 103                | Charlie  | 22      | CSE            |

### Breakdown:

| Element                                  | Description                                                                |
| ---------------------------------------- | -------------------------------------------------------------------------- |
| `Students`                               | Table name                                                                 |
| `StudentID`, `Name`, `Age`, `Department` | Attributes (columns)                                                       |
| `(101, Alice, 20, CSE)`                  | A tuple (row)                                                              |
| `StudentID`                              | Primary Key (PK) – uniquely identifies each student                        |
| `Department`                             | Could be a **foreign key** if linked to another table called `Departments` |

---

### 🔸 Additional Concepts:

* **Null value:** A field with no data (unknown or missing).
* **Constraints:** Rules applied to columns, such as:

  * `NOT NULL`
  * `UNIQUE`
  * `CHECK`
  * `DEFAULT`

---

### 🔄 Summary Table:

| Term        | Meaning                     | Example                    |
| ----------- | --------------------------- | -------------------------- |
| Table Name  | Name of the relation        | `Students`                 |
| Attribute   | Column                      | `Name`, `Age`, `StudentID` |
| Tuple       | Row                         | `(101, Alice, 20, CSE)`    |
| Domain      | Data type of column values  | `Age` → INTEGER            |
| Degree      | Number of attributes        | 4 (in the above table)     |
| Cardinality | Number of tuples/rows       | 3 (in the above table)     |
| Primary Key | Unique identifier per row   | `StudentID`                |
| Foreign Key | Link to another table’s key | `Department`               |
