These are powerful tools for attaching **custom logic directly to your Model (not to individual documents)** — ideal for reusable database operations, queries, and business logic at the collection level.

Let’s explore this clearly and step-by-step 👇

---

# 🧠 What Are Static Methods?

A **static method** is a function attached to a **Model**, not an individual document.

🧩 In short:

* **Instance Method** → works on *one document* (`user.sayHello()`)
* **Static Method** → works on *the entire collection* (`User.findByEmail()`)

---

### ⚙️ Example Analogy (JavaScript Class)

```js
class User {
  static findByEmail(email) {
    return db.find({ email });
  }
}
```

Now you can call it like:

```js
User.findByEmail("kaela@gmail.com");
```

✅ That’s exactly what **static methods** in Mongoose do — but on your **model**.

---

# 🧩 Step 1: Define a Schema

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: { type: Boolean, default: true }
});
```

---

# ⚙️ Step 2: Add a Custom Static Method

Static methods are added using `.statics` on the schema:

```js
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email }); // 'this' = the model itself
};
```

✅ Note:

* Use `function () {}` (not arrow functions) — so `this` refers to the Model.

---

# 🧱 Step 3: Create the Model

```js
const User = mongoose.model("User", userSchema);
```

---

# 🧪 Step 4: Use the Static Method

```js
async function run() {
  await mongoose.connect("mongodb://127.0.0.1:27017/static-demo");

  await User.create({ name: "Kaela Kenan", email: "kaela@gmail.com", age: 25 });

  const user = await User.findByEmail("kaela@gmail.com");
  console.log(user.name); // "Kaela Kenan"
}

run();
```

✅ You can now call your static method directly on the model, not the document.

---

# ⚡ Step 5: Multiple Static Methods Example

You can add as many statics as you need — each one encapsulating common query logic.

```js
userSchema.statics = {
  findActive() {
    return this.find({ isActive: true });
  },

  findAdults(minAge = 18) {
    return this.find({ age: { $gte: minAge } });
  },

  async deactivateByEmail(email) {
    return this.updateOne({ email }, { $set: { isActive: false } });
  }
};
```

Usage:

```js
const adults = await User.findAdults(21);
const activeUsers = await User.findActive();
await User.deactivateByEmail("kaela@gmail.com");
```

✅ This makes your **model a self-contained API layer** — keeping routes/controllers clean.

---

# ⚙️ Step 6: Async Static Methods (with Logic)

Static methods can also include async operations or calculations.

Example: finding or creating a user automatically.

```js
userSchema.statics.findOrCreate = async function (email, name) {
  let user = await this.findOne({ email });
  if (!user) {
    user = await this.create({ email, name });
  }
  return user;
};
```

Usage:

```js
const user = await User.findOrCreate("kaela@gmail.com", "Kaela Kenan");
```

✅ A common pattern in authentication or registration flows.

---

# 🧠 Step 7: Built-in Static Methods in Mongoose

Mongoose models already come with **built-in static methods** for CRUD operations:

| Method                 | Description                    | Example                                  |
| ---------------------- | ------------------------------ | ---------------------------------------- |
| **`create()`**         | Create new document(s)         | `User.create({ name: "Jiyon" })`         |
| **`find()`**           | Find multiple documents        | `User.find({ age: 25 })`                 |
| **`findOne()`**        | Find a single document         | `User.findOne({ email })`                |
| **`findById()`**       | Find document by `_id`         | `User.findById(id)`                      |
| **`updateOne()`**      | Update first matching document | `User.updateOne({ email }, { age: 30 })` |
| **`deleteOne()`**      | Delete one document            | `User.deleteOne({ email })`              |
| **`countDocuments()`** | Count number of matches        | `User.countDocuments({ age: 25 })`       |
| **`aggregate()`**      | Run aggregation pipelines      | `User.aggregate([...])`                  |

✅ You can mix your own **custom statics** with these built-ins for a cleaner API layer.

---

# 🧩 Step 8: Example — Combine Built-in + Custom Methods

```js
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  role: { type: String, enum: ["admin", "user"], default: "user" }
});

// Custom static methods
userSchema.statics = {
  async findAdmins() {
    return this.find({ role: "admin" });
  },
  async countUsers() {
    return this.countDocuments();
  },
  async promoteToAdmin(email) {
    return this.updateOne({ email }, { role: "admin" });
  }
};

const User = mongoose.model("User", userSchema);
```

Usage:

```js
await User.promoteToAdmin("kaela@gmail.com");
const admins = await User.findAdmins();
console.log(await User.countUsers());
```

---

# ⚙️ Step 9: Real-World Example — Login / Auth Helper

Static methods are excellent for **authentication** logic.

```js
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Static method for authentication
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  return user;
};
```

Usage:

```js
try {
  const user = await User.login("kaela@gmail.com", "secret123");
  console.log("Welcome", user.email);
} catch (err) {
  console.log(err.message);
}
```

✅ The logic stays inside the model — not in your controller or route.

---

# ⚡ Step 10: Instance vs Static Methods — Summary

| Feature          | **Instance Method**            | **Static Method**        |
| ---------------- | ------------------------------ | ------------------------ |
| Belongs to       | Document instance              | Model                    |
| Called on        | `user` (object)                | `User` (model)           |
| Access to `this` | Refers to current document     | Refers to model          |
| Example use      | Check age, modify one document | Query or update multiple |
| Example syntax   | `user.isAdult()`               | `User.findAdults()`      |
| Common use case  | Business logic per record      | Reusable query helpers   |

✅ **Rule of Thumb:**

> * Use **instance methods** for operations on a single document.
> * Use **static methods** for collection-wide or reusable queries.

---

# 🧩 Step 11: Full Working Example

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

// 🧠 Static Methods
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

userSchema.statics.findAdults = function () {
  return this.find({ age: { $gte: 18 } });
};

const User = mongoose.model("User", userSchema);

(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/static-methods-demo");

  await User.create([
    { name: "Kaela", email: "kaela@gmail.com", age: 25 },
    { name: "Raiyan", email: "raiyan@gmail.com", age: 17 }
  ]);

  const adultUsers = await User.findAdults();
  console.log("Adult Users:", adultUsers.map(u => u.name));

  const foundUser = await User.findByEmail("kaela@gmail.com");
  console.log("Found User:", foundUser.name);
})();
```

✅ Output:

```
Adult Users: [ 'Kaela' ]
Found User: Kaela
```

---

# ✅ Summary

| Type                | Scope                                 | Example                                             | Common Use                             |
| ------------------- | ------------------------------------- | --------------------------------------------------- | -------------------------------------- |
| **Built-in Static** | Model-level                           | `User.find()`                                       | CRUD operations                        |
| **Custom Static**   | Model-level                           | `User.findByEmail()`                                | Custom reusable logic                  |
| **Async Static**    | Model-level                           | `User.findOrCreate()`                               | Advanced queries or external API calls |
| **When to use**     | For actions across multiple documents | Reusable query helpers, authentication, aggregation |                                        |

---

✅ **In short:**

> **Static methods** turn your Mongoose models into mini “service layers” —
> letting you bundle reusable queries and logic directly into the schema, keeping your controllers clean and your app maintainable.