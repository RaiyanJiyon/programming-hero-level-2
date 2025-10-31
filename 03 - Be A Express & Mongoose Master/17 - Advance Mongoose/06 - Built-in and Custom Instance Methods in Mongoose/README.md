👉 **Instance methods** (built-in and custom).

These let you attach behavior directly to your documents — turning your data models into **smart, self-contained objects** that can perform actions on themselves.

Let’s go step-by-step 👇

---

# 🧠 What Are Instance Methods?

An **instance method** in Mongoose is a **function that operates on a single document instance** (an object returned from a model like `User.findOne()`).

💡 Think of it like:

* a “method” that belongs to a particular *user* or *post*, not the entire collection.

---

## 🔍 Example Analogy

In plain JavaScript:

```js
class User {
  constructor(name) { this.name = name }
  greet() { console.log(`Hello ${this.name}`) }
}

const user = new User("Kaela");
user.greet(); // Hello Kaela
```

In Mongoose, you can do the same thing — but attached to a **Schema**.

---

# ⚙️ Step 1: Create a Simple Schema

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});
```

---

# 🧩 Step 2: Add a Custom Instance Method

You can add your own methods like this:

```js
userSchema.methods.sayHello = function () {
  return `👋 Hello, my name is ${this.name}`;
};
```

✅ `this` refers to the **current document instance** (the specific user).

---

# ⚙️ Step 3: Create a Model

```js
const User = mongoose.model("User", userSchema);
```

---

# 🧪 Step 4: Use the Custom Method

```js
async function run() {
  await mongoose.connect("mongodb://127.0.0.1:27017/methods-demo");

  const user = await User.create({ name: "Raiyan Jiyon", email: "jiyon@gmail.com", age: 24 });

  console.log(user.sayHello()); // 👋 Hello, my name is Raiyan Jiyon
}

run();
```

✅ The instance (`user`) now has a custom method attached.

---

# ⚡ Built-in Instance Methods in Mongoose

Mongoose documents come with many **built-in methods** by default.
Here are the most common ones 👇

| Method            | Description                                           | Example                         |
| ----------------- | ----------------------------------------------------- | ------------------------------- |
| **`save()`**      | Saves (inserts or updates) the document to the DB     | `user.save()`                   |
| **`deleteOne()`** | Deletes the document                                  | `user.deleteOne()`              |
| **`remove()`**    | Deletes the document (deprecated for newer versions)  | `user.remove()`                 |
| **`validate()`**  | Runs validation on the document manually              | `await user.validate()`         |
| **`toObject()`**  | Converts the document to a plain JS object            | `user.toObject()`               |
| **`toJSON()`**    | Converts the document to JSON (used in API responses) | `user.toJSON()`                 |
| **`populate()`**  | Populates a referenced field inside a document        | `await post.populate("author")` |
| **`updateOne()`** | Updates the document                                  | `user.updateOne({ age: 30 })`   |
| **`increment()`** | Increments a numeric field                            | `user.increment()`              |

✅ You can call these directly on a document instance:

```js
const user = await User.findOne();
await user.save();
await user.deleteOne();
console.log(user.toJSON());
```

---

# 🧩 Step 5: Example of a Custom Logic Method

Let’s add a method that checks if a user is an adult:

```js
userSchema.methods.isAdult = function () {
  return this.age >= 18;
};
```

Now:

```js
const user = await User.findOne({ name: "Raiyan Jiyon" });
console.log(user.isAdult()); // true
```

✅ You can define any domain-specific logic like this — it’s perfect for reusability.

---

# 🧠 Step 6: Instance Methods with Database Operations

You can also write methods that perform actions **on the current document**, interacting with MongoDB.

```js
userSchema.methods.incrementAge = async function () {
  this.age += 1;
  await this.save();
  return this.age;
};
```

Now:

```js
const user = await User.findOne({ name: "Raiyan Jiyon" });
await user.incrementAge(); // ✅ increases age and saves
```

✅ This encapsulates logic neatly inside the model instead of spreading it across your app.

---

# ⚙️ Step 7: Instance Methods with Async Logic

Instance methods can be **async**, which makes them perfect for operations that need to:

* fetch other data
* run validation
* call APIs
* interact with related models

Example:

```js
userSchema.methods.getProfileSummary = async function () {
  return {
    name: this.name,
    email: this.email,
    status: this.age >= 18 ? "Adult" : "Minor"
  };
};
```

Usage:

```js
const summary = await user.getProfileSummary();
console.log(summary);
```

---

# ⚡ Step 8: Instance Method + Reference Example

If you’re using referencing (like `User` → `Post`), you can even add a method that **populates related documents**.

```js
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Post = mongoose.model("Post", postSchema);

// Add method to User schema
userSchema.methods.getPosts = async function () {
  return await mongoose.model("Post").find({ author: this._id });
};
```

Usage:

```js
const user = await User.findOne();
const posts = await user.getPosts(); // all posts by this user
```

✅ This is a clean, model-centric way to add domain-specific logic.

---

# 🧠 Step 9: Using `this` Safely

When defining methods:

* Always use **regular functions (`function () {}`)**, not arrow functions (`() => {}`)
* Because arrow functions don’t bind their own `this`.

❌ Wrong:

```js
userSchema.methods.sayHi = () => console.log(this.name);
```

✅ Correct:

```js
userSchema.methods.sayHi = function () {
  console.log(this.name);
};
```

---

# 🧩 Step 10: Example — Full Implementation

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

// ✅ Custom methods
userSchema.methods.sayHello = function () {
  return `Hello, I'm ${this.name}`;
};

userSchema.methods.isAdult = function () {
  return this.age >= 18;
};

userSchema.methods.incrementAge = async function () {
  this.age++;
  await this.save();
  return this.age;
};

// Model
const User = mongoose.model("User", userSchema);

// Demo
(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/instance-methods-demo");

  const user = await User.create({ name: "Kaela Kenan", email: "kaela@gmail.com", age: 25 });

  console.log(user.sayHello());      // Hello, I'm Kaela Kenan
  console.log(user.isAdult());       // true
  await user.incrementAge();         // age = 26
  console.log(user.age);             // 26
})();
```

---

# ⚡ Built-in vs Custom — Quick Comparison

| Type         | Purpose                         | Example                             |
| ------------ | ------------------------------- | ----------------------------------- |
| **Built-in** | Provided by Mongoose            | `save()`, `deleteOne()`, `toJSON()` |
| **Custom**   | Defined by you                  | `isAdult()`, `getProfileSummary()`  |
| **Scope**    | Available on document instances | `const user = await User.findOne()` |
| **Context**  | `this` refers to the document   | `this.name`, `this._id`             |

---

# ✅ Best Practices for Instance Methods

✅ Keep them short and focused
✅ Use for **logic that belongs to a single document**
✅ Avoid complex queries — those fit better in **static methods** (model-level)
✅ Always use `function` syntax (to get access to `this`)
✅ Keep async methods clean with `try/catch` if they perform DB operations

---

✅ **In short:**

> **Instance methods** turn your Mongoose models into intelligent objects —
> letting documents validate, modify, or represent themselves using built-in and custom logic.
