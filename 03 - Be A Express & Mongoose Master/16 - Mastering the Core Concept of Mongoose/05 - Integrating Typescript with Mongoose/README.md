Let’s go step by step 👇
We’ll set up TypeScript + Mongoose from scratch and create a **fully typed model** (e.g., a Note model).

---

# 🧩 1️⃣ Why Use TypeScript with Mongoose?

Mongoose works perfectly with plain JavaScript — but with **TypeScript**, you get:
✅ Strong typing for your schemas and models
✅ IntelliSense & auto-completion in VSCode
✅ Compile-time error detection
✅ Safer and more maintainable backend code

---

# ⚙️ 2️⃣ Setup TypeScript + Mongoose

### 🧱 Step 1: Initialize a new project

```bash
mkdir ts-mongoose-app
cd ts-mongoose-app
npm init -y
```

### 🧱 Step 2: Install dependencies

```bash
npm install mongoose dotenv
npm install --save-dev typescript ts-node @types/node @types/mongoose
```

### 🧱 Step 3: Create a TypeScript config file

```bash
npx tsc --init
```

Then edit **`tsconfig.json`** (important parts 👇):

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

---

# 🚀 3️⃣ Folder Structure

```
ts-mongoose-app/
│
├── src/
│   ├── models/
│   │   └── Note.ts
│   ├── config/
│   │   └── db.ts
│   └── server.ts
└── tsconfig.json
```

---

# 🧩 4️⃣ MongoDB Connection (db.ts)

Create a reusable connection file in `src/config/db.ts`:

```ts
import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/noteapp");
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
```

---

# 🧠 5️⃣ Creating a Typed Schema & Model (Note.ts)

This is where TypeScript shines 🔥

```ts
import { Schema, model, Document } from "mongoose";

// 1️⃣ Define the TypeScript interface
export interface INote extends Document {
  title: string;
  content: string;
  isPinned?: boolean;
  createdAt: Date;
}

// 2️⃣ Define the Mongoose schema
const noteSchema = new Schema<INote>({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "Content is required"],
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 3️⃣ Create the model
export const Note = model<INote>("Note", noteSchema);
```

✅ What’s happening here:

* `INote` is a **TypeScript interface** describing your document’s shape.
* `Schema<INote>` ensures your schema aligns with that interface.
* `model<INote>` gives you a fully **type-safe model**.

---

# 🧱 6️⃣ Using the Model (server.ts)

```ts
import express, { Request, Response } from "express";
import { connectDB } from "./config/db";
import { Note } from "./models/Note";

const app = express();
app.use(express.json());

connectDB();

// ➕ Create Note
app.post("/notes", async (req: Request, res: Response) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: "Failed to create note", error });
  }
});

// 📋 Get All Notes
app.get("/notes", async (req: Request, res: Response) => {
  const notes = await Note.find();
  res.json(notes);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
```

✅ You now get full type-safety:

* Autocomplete for `note.title`, `note.content`, etc.
* Type errors if you pass invalid fields

---

# ⚡ 7️⃣ Run the Project

To run TypeScript directly:

```bash
npx ts-node src/server.ts
```

Or, to compile and run:

```bash
npx tsc
node dist/server.js
```

✅ Output:

```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

---

# 🧠 8️⃣ How the Typing Helps You

Example — IntelliSense in action 👇

```ts
const note = await Note.findById(id);
console.log(note?.title);     // ✅ TypeScript knows "title" exists
console.log(note?.randomKey); // ❌ Error: Property "randomKey" does not exist
```

✅ Prevents typos and invalid fields
✅ Reduces runtime bugs
✅ Makes refactoring safer and easier

---

# 🧩 9️⃣ Optional — Add Separate Types Folder

If your app grows, organize types cleanly:

```
src/
├── types/
│   └── note.d.ts
```

`note.d.ts`

```ts
export interface INote {
  title: string;
  content: string;
  isPinned?: boolean;
  createdAt: Date;
}
```

Then import it into your schema file:

```ts
import { INote } from "../types/note";
```

---

# 🧠 10️⃣ Summary — TypeScript + Mongoose Integration

| Step | What You Did               | File                                      |
| ---- | -------------------------- | ----------------------------------------- |
| 1️⃣  | Installed TS + Mongoose    | `npm install mongoose typescript ts-node` |
| 2️⃣  | Created config file        | `tsconfig.json`                           |
| 3️⃣  | Connected to MongoDB       | `src/config/db.ts`                        |
| 4️⃣  | Defined Interface + Schema | `src/models/Note.ts`                      |
| 5️⃣  | Used type-safe CRUD ops    | `src/server.ts`                           |

---

✅ **In short:**

> TypeScript + Mongoose gives you a **type-safe, structured, and maintainable** backend — combining MongoDB’s flexibility with TypeScript’s strictness.

