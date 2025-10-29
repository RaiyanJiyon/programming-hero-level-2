 now focusing on one of the **most important** Mongoose fundamentals:
👉 **Data Types** and **Required Fields** in a Schema.

These define the **shape**, **validation**, and **consistency** of every document in your MongoDB collection.

Let’s break this down clearly with examples 👇

---

## 🧠 What is a Schema in Mongoose?

A **Schema** in Mongoose defines:

* What fields exist in a document
* What type of data each field should hold
* Which fields are required
* Default values, validation rules, etc.

👉 Think of a Schema as a *blueprint* for your collection’s documents.

---

## 🧩 Example: Basic Schema

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  isActive: Boolean
});
```

✅ Defines:

* `name`: a string
* `age`: a number
* `isActive`: a boolean

If you insert a document with other types, Mongoose **tries to cast** it automatically (e.g., `"25"` → `25`).

---

# 🧱 Common Mongoose Data Types

| Data Type    | Description                 | Example                         |
| ------------ | --------------------------- | ------------------------------- |
| **String**   | Text data                   | `"Kaela"`                       |
| **Number**   | Integers or decimals        | `25`, `3.14`                    |
| **Boolean**  | True/False values           | `true`                          |
| **Date**     | Date/time values            | `new Date()`                    |
| **Array**    | List of values              | `["JS", "Python"]`              |
| **ObjectId** | References another document | `new mongoose.Types.ObjectId()` |
| **Mixed**    | Any data type (rarely used) | `{ key: "value" }`              |
| **Buffer**   | Binary data (images/files)  | `<Buffer>`                      |

---

## 🧩 Example Schema with Multiple Data Types

```js
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  isAdmin: Boolean,
  skills: [String],              // array of strings
  address: {                     // nested object
    city: String,
    country: String
  },
  createdAt: { type: Date, default: Date.now }
});
```

✅ Supports nested objects, arrays, and default values.

---

# 🚨 Required Fields in a Schema

The **`required`** property ensures that a field **must be provided** when creating a document.

---

## ✅ Example 1: Using `required: true`

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: Number
});
```

If you try to insert a user **without** `name` or `email`, it will fail:

```js
await User.create({ age: 25 });
```

❌ Error:

```
ValidationError: User validation failed: name: Path `name` is required.
```

---

## ✅ Example 2: Custom Error Message

You can provide a **custom error message** for required fields:

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required!"] },
  email: { type: String, required: [true, "Email cannot be empty!"] }
});
```

❌ If missing:

```
ValidationError: Email cannot be empty!
```

---

## ✅ Example 3: Conditional Required

You can make a field required **only under certain conditions** (function-based).

```js
const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: function () {
      return this.isVerified; // required only if user is verified
    }
  },
  isVerified: Boolean
});
```

---

## 🧠 Bonus: Other Useful Field Options

| Option                    | Description                  | Example                                               |
| ------------------------- | ---------------------------- | ----------------------------------------------------- |
| **default**               | Sets a default value         | `{ type: Date, default: Date.now }`                   |
| **unique**                | Prevents duplicates          | `{ type: String, unique: true }`                      |
| **min / max**             | Range for numbers or dates   | `{ type: Number, min: 18, max: 65 }`                  |
| **enum**                  | Restrict values              | `{ type: String, enum: ["Male", "Female", "Other"] }` |
| **match**                 | Regex pattern for strings    | `{ type: String, match: /@gmail\.com$/ }`             |
| **trim**                  | Removes spaces (string only) | `{ type: String, trim: true }`                        |
| **lowercase / uppercase** | Auto-format strings          | `{ type: String, lowercase: true }`                   |

---

## 🧩 Example: Full Schema with Rules

```js
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"], trim: true },
  email: { 
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: /.+\@.+\..+/ 
  },
  age: { type: Number, min: 0, max: 120 },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  createdAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});
```

✅ This ensures every document is clean and consistent:

* `name` must exist and has no extra spaces
* `email` must be unique, lowercase, and valid format
* `age` must be between 0–120
* `gender` must be one of the 3 options
* `createdAt` automatically sets when created

---

## 🧪 Example Insert (Success)

```js
await User.create({
  name: "  Kaela Kenan  ",
  email: "Kaela@Gmail.com",
  age: 25,
  gender: "Female"
});
```

✅ Output document stored in MongoDB:

```json
{
  "_id": "671c108bd4f1e5d87adf3e0b",
  "name": "Kaela Kenan",
  "email": "kaela@gmail.com",
  "age": 25,
  "gender": "Female",
  "isActive": true,
  "createdAt": "2025-10-25T09:18:00.000Z"
}
```

---

## 🚫 Example Insert (Failure)

```js
await User.create({
  age: 25,
  gender: "Alien"
});
```

❌ Error:

```
ValidationError: User validation failed: 
name: Name is required,
email: Email is required,
gender: `Alien` is not a valid enum value for path `gender`
```

✅ Mongoose prevents bad data from being stored!

---

## 🧠 Summary Table

| Feature            | Example                    | Description               |
| ------------------ | -------------------------- | ------------------------- |
| **Data Type**      | `type: String`             | Defines field type        |
| **Required**       | `required: true`           | Field must exist          |
| **Custom Message** | `[true, "Custom message"]` | Custom validation message |
| **Default**        | `default: Date.now`        | Auto value if missing     |
| **Unique**         | `unique: true`             | Prevents duplicates       |
| **Trim**           | `trim: true`               | Removes spaces            |
| **Enum**           | `enum: ["Male", "Female"]` | Restricts valid values    |
| **Regex Match**    | `match: /@gmail\.com$/`    | Validates string pattern  |

---

✅ **In short:**

> Mongoose Schemas let you **enforce structure**, **validate input**, and **keep your database clean and predictable** — even though MongoDB is schema-less by default.
