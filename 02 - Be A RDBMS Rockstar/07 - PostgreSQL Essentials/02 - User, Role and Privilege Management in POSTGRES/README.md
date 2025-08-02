### 👤 PostgreSQL: **User, Role, and Privilege Management**

In PostgreSQL, **users**, **roles**, and **privileges** are core components of **database security and access control**.

---

## 🔹 What is a Role in PostgreSQL?

In PostgreSQL, **roles** are used for **authentication** and **authorization**.

> 🔸 A **role** can act as a **user**, a **group**, or both.

Each role can:

* Own database objects
* Log in to the server
* Be granted privileges
* Inherit other roles

---

## 🔑 Key Role Types:

| Role Type      | Description                           |
| -------------- | ------------------------------------- |
| **Login Role** | Can log in to the database (`LOGIN`)  |
| **Group Role** | Used to group privileges (no `LOGIN`) |
| **Superuser**  | Has all privileges (like `root`)      |

---

## 🔹 Create Roles/Users

### ✅ Create a Login Role (User)

```sql
CREATE ROLE myuser WITH LOGIN PASSWORD 'mypassword';
```

### ✅ Add Superuser Privileges (not recommended for general users)

```sql
ALTER ROLE myuser WITH SUPERUSER;
```

### ✅ Create a Role Without Login (for grouping)

```sql
CREATE ROLE readonly;
```

---

## 🔹 Granting Privileges

### 🔸 Common Privileges:

| Privilege | Purpose                     |
| --------- | --------------------------- |
| `SELECT`  | Read data from tables/views |
| `INSERT`  | Add new rows                |
| `UPDATE`  | Modify existing rows        |
| `DELETE`  | Remove rows                 |
| `ALL`     | Grant all privileges        |

---

### ✅ Grant Privilege on a Table

```sql
GRANT SELECT, INSERT ON students TO myuser;
```

---

### ✅ Grant Privilege on All Tables in a Schema

```sql
GRANT SELECT ON ALL TABLES IN SCHEMA public TO myuser;
```

---

### ✅ Grant a Role to Another Role (like a group)

```sql
GRANT readonly TO myuser;
```

---

## 🔹 Revoking Privileges

```sql
REVOKE INSERT ON students FROM myuser;
```

---

## 🔍 Check Roles & Permissions

* List all roles:

```sql
\du
```

* Check table privileges:

```sql
\z students
```

---

## 🧪 Example: Create a User and Grant Read-Only Access

```sql
-- Create user
CREATE ROLE report_user WITH LOGIN PASSWORD 'secure123';

-- Grant read access
GRANT CONNECT ON DATABASE school TO report_user;
GRANT USAGE ON SCHEMA public TO report_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO report_user;
```

---

## ✅ Summary Table

| Task                        | Command Example                                   |
| --------------------------- | ------------------------------------------------- |
| Create user role            | `CREATE ROLE username WITH LOGIN PASSWORD 'pwd';` |
| Grant table privileges      | `GRANT SELECT, INSERT ON table TO username;`      |
| Revoke privileges           | `REVOKE DELETE ON table FROM username;`           |
| Add role to role            | `GRANT readonly TO user;`                         |
| List all roles              | `\du`                                             |
| Check privileges on a table | `\z tablename`                                    |

