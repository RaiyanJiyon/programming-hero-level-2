Mongoose validations ensure that **only clean and correct data** gets saved into MongoDB — preventing data corruption and making your app much more reliable.

Let’s explore both:
✅ **Built-in validations** (like `required`, `min`, `max`, `enum`, `match`, etc.)
✅ **Custom validations** (your own validation logic)

---

# 🧩 What Are Validations in Mongoose?

A **validation rule** in a Mongoose schema checks the value of a field before saving or updating a document.
If the value doesn’t meet the rule → Mongoose throws a **ValidationError** and **doesn’t save the document**.

---

## ⚙️ Example: Basic Schema with Validation

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 18, max: 65 }, // ✅ built-in validation
  email: {
    type: String,
    required: [true, "Email is required"],
    match: /.+\@.+\..+/ // ✅ regex validation
  },
  country: { type: String, enum: ["USA", "UK", "Bangladesh", "Canada"] }, // ✅ only allowed values
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
```

✅ This schema ensures:

* `name` and `email` are required
* `age` is between 18 and 65
* `email` has a valid format
* `country` is one of the allowed values

---

# 🧱 1️⃣ Built-in Validations in Mongoose

---

## ✅ a) `required: true`

Ensures that the field **must be present** when saving.

```js
name: { type: String, required: [true, "Name is required!"] }
```

🔹 Error if missing:

```
ValidationError: Name is required!
```

---

## ✅ b) `min` and `max` (for numbers or dates)

* For **numbers** → defines minimum and maximum allowed value
* For **dates** → defines earliest or latest allowed date

```js
age: {
  type: Number,
  min: [18, "Too young! Must be 18+"],
  max: [65, "Too old! Retirement time."]
}
```

🔹 Examples:

```js
await User.create({ name: "Alex", age: 15 });
// ❌ ValidationError: Too young! Must be 18+
```

---

## ✅ c) `enum`

Restricts a string field to specific values.

```js
country: {
  type: String,
  enum: {
    values: ["USA", "UK", "Bangladesh", "Canada"],
    message: "{VALUE} is not a valid country"
  }
}
```

🔹 Invalid example:

```js
await User.create({ name: "Kaela", country: "Mars" });
// ❌ ValidationError: Mars is not a valid country
```

---

## ✅ d) `match` (Regex Validation)

Used to match a specific pattern (often for emails or phone numbers).

```js
email: {
  type: String,
  match: [/.+\@.+\..+/, "Please provide a valid email address"]
}
```

🔹 Example:

```js
await User.create({ name: "Ray", email: "invalidemail" });
// ❌ ValidationError: Please provide a valid email address
```

---

## ✅ e) `maxlength` and `minlength` (for strings)

Restricts string length.

```js
name: {
  type: String,
  minlength: [3, "Name must be at least 3 characters long"],
  maxlength: [50, "Name cannot exceed 50 characters"]
}
```

---

## ✅ f) `unique`

Ensures **no duplicate** values (creates a unique index).

```js
email: { type: String, unique: true, required: true }
```

> ⚠️ Note: `unique` is not a true validator — it’s an **index** constraint.
> Use it together with a validation check for safety.

---

# 🧠 2️⃣ Custom Validators

When built-in ones aren’t enough, you can define **custom validation logic** using a `validate` function.

---

## ✅ a) Basic Custom Validator

```js
age: {
  type: Number,
  validate: {
    validator: function (value) {
      return value % 2 === 0; // only even ages allowed
    },
    message: (props) => `${props.value} is not an even number!`
  }
}
```

🔹 Example:

```js
await User.create({ name: "Raiyan", age: 25 });
// ❌ ValidationError: 25 is not an even number!
```

---

## ✅ b) Custom Validator with Async Function

You can even use async validation — for example, checking the database for duplicates manually.

```js
email: {
  type: String,
  validate: {
    validator: async function (value) {
      const count = await mongoose.models.User.countDocuments({ email: value });
      return count === 0; // returns false if email already exists
    },
    message: "Email already in use"
  }
}
```

✅ Works great when you need to check external conditions before saving.

---

## ✅ c) Conditional Custom Validation

You can make validation conditional using `this` inside the validator.

```js
discount: {
  type: Number,
  validate: {
    validator: function (value) {
      return this.isPremium ? value <= 50 : value === 0;
    },
    message: "Invalid discount for this user type"
  }
}
```

✅ Example:

* If `isPremium: true`, discount can be ≤ 50
* Otherwise, discount must be 0

---

# ⚙️ 3️⃣ Validate Before Saving

Mongoose **automatically runs validators** on:

* `save()`
* `create()`
* `insertMany()` (with `{ runValidators: true }` option)

Example:

```js
const user = new User({ name: "Jiyon", age: 16 });
await user.save(); // ❌ Will trigger ValidationError
```

If you’re using **update queries**, you must enable validators manually:

```js
await User.updateOne(
  { name: "Jiyon" },
  { age: 15 },
  { runValidators: true } // ✅ important
);
```

---

# 🧩 4️⃣ Full Example with All Validations

```js
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required"],
    minlength: [3, "Min 3 characters"],
    maxlength: [50, "Max 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
    match: [/.+\@.+\..+/, "Invalid email address"]
  },
  age: {
    type: Number,
    min: [18, "Minimum age 18"],
    max: [65, "Maximum age 65"],
    validate: {
      validator: (v) => v % 2 === 0,
      message: (props) => `${props.value} is not an even number`
    }
  },
  country: {
    type: String,
    enum: ["USA", "UK", "Bangladesh"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", userSchema);
```

---

# 🧠 5️⃣ Example Usage and Output

```js
try {
  await User.create({
    name: "Kaela",
    email: "kaela@gmail",
    age: 17,
    country: "Mars"
  });
} catch (err) {
  console.log(err.message);
}
```

**Output:**

```
User validation failed: 
age: Minimum age 18, 
email: Invalid email address, 
country: `Mars` is not a valid enum value
```

✅ Mongoose stops invalid data from being saved — before it reaches MongoDB.

---

# ✅ 6️⃣ Summary Table

| Validator                 | Works On      | Example                | Description         |
| ------------------------- | ------------- | ---------------------- | ------------------- |
| **required**              | All types     | `required: true`       | Field must exist    |
| **min / max**             | Numbers/Dates | `{ min: 18, max: 65 }` | Range restriction   |
| **minlength / maxlength** | Strings       | `{ minlength: 3 }`     | String length       |
| **enum**                  | Strings       | `{ enum: ["A", "B"] }` | Allowed values only |
| **match**                 | Strings       | `/regex/`              | Pattern matching    |
| **unique**                | All types     | `{ unique: true }`     | Enforces uniqueness |
| **validate**              | Any type      | Custom function        | User-defined logic  |

---

✅ **In short:**

> Mongoose’s validation system makes your schema *smart* —
> it automatically checks, sanitizes, and rejects invalid data before it ever touches the database.

