now diving into **third-party validation packages**, which are super useful when Mongoose’s built-in validators aren’t enough.

Let’s explore how to use external (third-party) validators with Mongoose — particularly the most popular one: **Validator.js**.

---

# 🧩 What Is a Third-Party Validator?

A **third-party validator** is an external library that provides **pre-built validation functions** for common tasks like:

* Checking if an email is valid
* Checking if a URL is valid
* Checking if a string is a strong password
* Checking if a value is an integer, IP, credit card, etc.

👉 Instead of writing custom functions, you can reuse well-tested ones.

---

# ✅ The Most Common: `validator` Package (Validator.js)

📦 Install it:

```bash
npm install validator
```

---

# ⚙️ Example 1: Using Validator.js with Mongoose

```js
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail, // ✅ using validator.js
      message: "Please provide a valid email address"
    }
  },
  website: {
    type: String,
    validate: {
      validator: validator.isURL,
      message: "Invalid website URL"
    }
  },
  password: {
    type: String,
    required: [true, "Password required"],
    validate: {
      validator: (v) => validator.isStrongPassword(v),
      message: "Password must be at least 8 chars with uppercase, number & symbol"
    }
  }
});

const User = mongoose.model("User", userSchema);
```

✅ This uses **Validator.js** to handle all validation logic cleanly:

* `validator.isEmail(value)` → checks valid email
* `validator.isURL(value)` → checks valid URL
* `validator.isStrongPassword(value)` → checks password strength

---

# 🧠 Example 2: Validator Functions You Can Use

Validator.js provides **100+ ready-made validators**:
Here are some popular ones 👇

| Validator                    | Example                                              | Description                      |
| ---------------------------- | ---------------------------------------------------- | -------------------------------- |
| `isEmail(str)`               | `validator.isEmail("test@gmail.com")`                | Valid email format               |
| `isURL(str)`                 | `validator.isURL("https://example.com")`             | Valid URL                        |
| `isStrongPassword(str)`      | `validator.isStrongPassword("Abc@1234")`             | Checks strong password           |
| `isMobilePhone(str, locale)` | `validator.isMobilePhone("+8801712345678", "bn-BD")` | Checks valid phone number        |
| `isInt(str)`                 | `validator.isInt("42")`                              | Integer check                    |
| `isLength(str, {min, max})`  | `validator.isLength("Hello", { min: 3, max: 10 })`   | String length check              |
| `isAlpha(str)`               | `validator.isAlpha("Kaela")`                         | Letters only                     |
| `isAlphanumeric(str)`        | `validator.isAlphanumeric("Kaela123")`               | Letters + numbers only           |
| `isBefore(date)`             | `validator.isBefore("2025-01-01")`                   | Checks if date is before another |
| `isAfter(date)`              | `validator.isAfter("2024-01-01")`                    | Checks if date is after another  |

---

# 🧩 Example 3: Combining Mongoose + Validator Logic

You can mix built-in validators with external ones easily.

```js
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  price: { type: Number, required: true, min: 1 },
  sku: {
    type: String,
    validate: {
      validator: (v) => validator.isAlphanumeric(v),
      message: "SKU must be alphanumeric only"
    }
  },
  releaseDate: {
    type: Date,
    validate: {
      validator: (v) => validator.isBefore(v.toISOString(), new Date().toISOString()),
      message: "Release date cannot be in the future"
    }
  }
});
```

✅ Combines:

* Mongoose’s `min`, `required`, `minlength`
* Validator.js’s `isAlphanumeric()` and `isBefore()`

---

# ⚠️ Example 4: Async Validators with Validator.js

Sometimes you might combine Validator.js with async checks (like database lookups):

```js
email: {
  type: String,
  required: true,
  validate: {
    validator: async function (value) {
      if (!validator.isEmail(value)) return false;
      const exists = await mongoose.models.User.findOne({ email: value });
      return !exists;
    },
    message: "Email already exists or is invalid"
  }
}
```

✅ This checks both:

* The email format (via `validator.isEmail`)
* Uniqueness in database (via async query)

---

# 💡 Example 5: Advanced Password Validation

Validator.js can validate password strength and options:

```js
password: {
  type: String,
  required: true,
  validate: {
    validator: (v) =>
      validator.isStrongPassword(v, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }),
    message:
      "Password must contain at least 8 characters, one uppercase, one number, and one symbol"
  }
}
```

✅ Prevents users from setting weak passwords.

---

# 🧠 Example 6: Using Validator.js with TypeScript + Mongoose

If you’re using **TypeScript**, you still get full typing support:

```ts
import { Schema, model, Document } from "mongoose";
import validator from "validator";

interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email"
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => validator.isStrongPassword(v),
      message: "Weak password"
    }
  }
});

export const User = model<IUser>("User", userSchema);
```

---

# 🚀 Example Output

If you try to save invalid data:

```js
await User.create({
  name: "Jiyon",
  email: "invalid-email",
  password: "123"
});
```

You’ll get:

```
ValidationError: 
email: Please provide a valid email address, 
password: Password must contain at least 8 characters, one uppercase, one number, and one symbol
```

✅ Prevents invalid user data right at the Mongoose model layer.

---

# 🧠 Summary

| Validator Source               | Example                         | Description                  |
| ------------------------------ | ------------------------------- | ---------------------------- |
| **Built-in**                   | `required`, `min`, `enum`, etc. | Native Mongoose              |
| **Custom**                     | `validate: (v) => v % 2 === 0`  | Your own logic               |
| **Third-Party (validator.js)** | `validator.isEmail(value)`      | Pre-built, tested validators |
| **Async Custom**               | `async (v) => await checkDB(v)` | Useful for DB checks         |

---

✅ **In short:**

> Third-party validator packages (like **Validator.js**) make it easy to add powerful, reusable validation logic — especially for emails, URLs, passwords, and more — directly into your Mongoose schemas.

