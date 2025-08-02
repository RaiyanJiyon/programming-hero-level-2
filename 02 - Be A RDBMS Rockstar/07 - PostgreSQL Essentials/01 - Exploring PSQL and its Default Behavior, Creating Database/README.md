### 🐘 **Exploring `psql` (PostgreSQL CLI) – Default Behavior & Creating a Database**

---

## 🔹 What is `psql`?

`psql` is the **command-line interface (CLI)** for interacting with **PostgreSQL** databases.

You can use it to:

* Create, modify, and delete databases
* Run SQL queries
* Manage tables, users, and permissions
* Import/export data

---

## 🛠️ How to Access `psql`

### 🔸 Linux/macOS:

```bash
sudo -i -u postgres
psql
```

### 🔸 Windows (via command prompt or pgAdmin terminal):

```bash
psql -U postgres
```

You’ll be prompted to enter the password you set during installation.

---

## 🔹 Default Behavior of `psql`

| Behavior         | Description                                                                 |
| ---------------- | --------------------------------------------------------------------------- |
| Default user     | `postgres`                                                                  |
| Default database | Connects to a database with **same name as the user** (if no DB name given) |
| Prompt format    | `postgres=#` (means you are in the `postgres` DB as superuser)              |
| Command type     | Use `\` for meta-commands (e.g., `\l`, `\dt`), and regular SQL for queries  |

---

## 🧪 Example: First-Time `psql` Usage

```bash
psql -U postgres
```

Once logged in, you'll see:

```
postgres=#
```

---

## 🔹 Useful `psql` Meta-Commands

| Command     | Purpose                           |
| ----------- | --------------------------------- |
| `\l`        | List all databases                |
| `\c dbname` | Connect to a database             |
| `\dt`       | List all tables in the current DB |
| `\du`       | List all users/roles              |
| `\q`        | Quit `psql`                       |

---

## 🛠️ How to Create a New Database

Once inside `psql`:

```sql
CREATE DATABASE mydb;
```

✅ To verify:

```sql
\l
```

✅ To connect to the new DB:

```sql
\c mydb
```

---

## 🧑‍💻 Example Session:

```bash
psql -U postgres
```

```sql
-- Create database
CREATE DATABASE school;

-- List databases
\l

-- Connect to school
\c school

-- Create a test table
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  age INT
);

-- Insert data
INSERT INTO students (name, age) VALUES ('Alice', 20);

-- View data
SELECT * FROM students;
```

---

## 📌 Summary

| Task                | Command / Description   |
| ------------------- | ----------------------- |
| Start `psql`        | `psql -U postgres`      |
| List databases      | `\l`                    |
| Create database     | `CREATE DATABASE mydb;` |
| Connect to database | `\c mydb`               |
| Quit                | `\q`                    |

