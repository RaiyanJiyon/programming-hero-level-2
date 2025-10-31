**Virtuals**.

They’re simple but incredibly powerful for creating **computed fields**, **virtual relationships**, and **clean data models** without changing the actual database data.

Let’s go step-by-step 👇

---

# 🧠 What Are Virtuals in Mongoose?

**Virtuals** are *virtual properties* that are **not stored in MongoDB**,
but are **computed dynamically** from existing document fields.

Think of them as “smart fields” — data that exists only in Mongoose, not in your database.

---

### 🧩 Analogy

If your document looks like:

```js
{ firstName: "Kaela", lastName: "Kenan" }
```

You can define a **virtual** property `fullName` that returns:

```js
"Kaela Kenan"
```

✅ You can **get** and even **set** values using virtuals.
✅ They exist **only in memory**, not in MongoDB.

---

# ⚙️ Step 1: Basic Schema

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number
});
```

---

# 🧩 Step 2: Define a Virtual Property

```js
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
```

✅ `.virtual("name")` → creates a virtual field.
✅ `.get(fn)` → defines a getter (computed value).
✅ `this` → refers to the **document instance**.

---

### Usage Example:

```js
const User = mongoose.model("User", userSchema);

(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/virtuals-demo");

  const user = await User.create({ firstName: "Kaela", lastName: "Kenan", age: 25 });

  console.log(user.fullName); // "Kaela Kenan"
})();
```

✅ `fullName` behaves like a real property — even though it’s never saved to the DB.

---

# ⚡ Step 3: Virtual Setter (Two-Way Virtual)

You can also **set** virtuals and make them modify real fields.

```js
userSchema.virtual("fullName")
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (value) {
    const [first, last] = value.split(" ");
    this.firstName = first;
    this.lastName = last;
  });
```

### Usage:

```js
const user = new User();
user.fullName = "Raiyan Jiyon"; // sets firstName & lastName automatically
console.log(user.firstName); // "Raiyan"
console.log(user.lastName);  // "Jiyon"
```

✅ Virtuals can be used for **computed accessors and mutators**.

---

# ⚙️ Step 4: Enabling Virtuals in JSON and Object Output

By default, virtuals **don’t appear** when you call `.toJSON()` or `.toObject()` —
you need to enable them manually.

```js
userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });
```

✅ Now virtuals appear in API responses or console logs.

### Example:

```js
const user = await User.findOne();
console.log(user.toJSON());
```

Output:

```json
{
  "_id": "671d1a8a...",
  "firstName": "Kaela",
  "lastName": "Kenan",
  "age": 25,
  "fullName": "Kaela Kenan"
}
```

---

# ⚡ Step 5: Virtual for Derived or Computed Values

You can use virtuals to create **computed fields** from numeric or date data.

Example — `birthYear`:

```js
userSchema.virtual("birthYear").get(function () {
  return new Date().getFullYear() - this.age;
});
```

Usage:

```js
const user = await User.findOne({ firstName: "Kaela" });
console.log(user.birthYear); // e.g., 2000
```

✅ Great for creating derived properties without storing them in DB.

---

# 🧩 Step 6: Virtual Population (Relational Virtuals)

This is where virtuals get **really powerful** —
you can define “virtual relationships” between collections without actually storing foreign keys in both places.

---

### Example — Users and Posts

#### 📄 `User` model:

```js
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

// Virtual populate
userSchema.virtual("posts", {
  ref: "Post",              // Model to reference
  localField: "_id",        // Field on the User model
  foreignField: "author"    // Field on the Post model
});

userSchema.set("toJSON", { virtuals: true });
```

#### 📄 `Post` model:

```js
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
```

---

### Usage:

```js
const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/virtuals-demo2");

  await User.deleteMany({});
  await Post.deleteMany({});

  const user = await User.create({ name: "Raiyan Jiyon", email: "jiyon@gmail.com" });

  await Post.create([
    { title: "Intro to Mongoose", content: "Learn Mongoose basics", author: user._id },
    { title: "Virtuals in Depth", content: "Master virtuals", author: user._id }
  ]);

  const result = await User.findOne({ _id: user._id }).populate("posts");
  console.log(JSON.stringify(result, null, 2));

  mongoose.connection.close();
})();
```

✅ Output:

```json
{
  "_id": "671d1b3f...",
  "name": "Raiyan Jiyon",
  "email": "jiyon@gmail.com",
  "posts": [
    { "title": "Intro to Mongoose", "content": "Learn Mongoose basics" },
    { "title": "Virtuals in Depth", "content": "Master virtuals" }
  ]
}
```

🧠 You didn’t store a `posts` array inside the user —
but `populate("posts")` created that virtual link automatically!

---

# ⚙️ Step 7: Filter & Sort in Virtual Populate

You can define options in the virtual relationship:

```js
userSchema.virtual("recentPosts", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
  options: { sort: { createdAt: -1 }, limit: 2 }
});
```

Usage:

```js
const user = await User.findOne().populate("recentPosts");
```

✅ Returns only 2 most recent posts.

---

# ⚡ Step 8: Virtuals in API Responses

Virtuals are perfect for **computed fields** in REST APIs —
for example, in a user profile API, you can compute:

* full name
* age group
* follower count
* derived data like total posts (via virtual populate)

Example:

```js
userSchema.virtual("ageGroup").get(function () {
  return this.age >= 18 ? "Adult" : "Minor";
});
```

Response:

```json
{
  "name": "Kaela",
  "age": 25,
  "ageGroup": "Adult"
}
```

✅ Clean, readable data — no redundant storage in MongoDB.

---

# 🧠 Step 9: When to Use Virtuals

| Use Case                | Type             | Example                              |
| ----------------------- | ---------------- | ------------------------------------ |
| **Computed field**      | Getter Virtual   | `fullName`, `ageGroup`, `birthYear`  |
| **Linked relationship** | Virtual Populate | `user.posts`, `category.products`    |
| **Data transformation** | Getter/Setter    | Combine/split fields dynamically     |
| **API enhancements**    | JSON virtuals    | Add human-readable data in responses |

---

# ⚡ Step 10: Full Working Example — Combined Virtuals

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number
});

// Full name (getter + setter)
userSchema.virtual("fullName")
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (v) {
    const [first, last] = v.split(" ");
    this.firstName = first;
    this.lastName = last;
  });

// Computed age group
userSchema.virtual("ageGroup").get(function () {
  return this.age >= 18 ? "Adult" : "Minor";
});

// Enable in JSON output
userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("User", userSchema);

(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/virtuals-full-demo");

  const user = await User.create({ fullName: "Raiyan Jiyon", age: 22 });
  console.log(user.toJSON());
})();
```

✅ Output:

```json
{
  "_id": "671d1b3f...",
  "firstName": "Raiyan",
  "lastName": "Jiyon",
  "age": 22,
  "fullName": "Raiyan Jiyon",
  "ageGroup": "Adult"
}
```

---

# ✅ Summary

| Concept              | Description                                      |
| -------------------- | ------------------------------------------------ |
| **Virtuals**         | Computed fields not stored in MongoDB            |
| **Getter Virtual**   | Read-only computed property                      |
| **Setter Virtual**   | Mutates real fields when set                     |
| **Virtual Populate** | Define reverse relationship between models       |
| **Enable in JSON**   | `schema.set("toJSON", { virtuals: true })`       |
| **Use Cases**        | Computed fields, dynamic data, reverse relations |

---

✅ **In short:**

> **Virtuals** make your Mongoose models *smarter* —
> adding computed fields and relationships without storing extra data in MongoDB.

