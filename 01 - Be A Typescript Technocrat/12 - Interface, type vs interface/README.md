## 🔷 What is an `interface` in TypeScript?

An **`interface`** is used to define the **structure of an object**. It tells TypeScript what properties and methods an object must have, but not how they are implemented.

---

### ✅ Syntax

```typescript
interface Person {
  name: string;
  age: number;
  greet(): void;
}

const user: Person = {
  name: "Alice",
  age: 30,
  greet() {
    console.log(`Hello, I’m ${this.name}`);
  }
};
```

---

### ✅ Features of `interface`:

* Describes the **shape of objects**
* Supports **optional properties** with `?`
* Supports **readonly properties**
* Can be **extended** using `extends`
* Often used in **OOP-style** class contracts

---

### 🔹 Optional and Readonly Properties

```typescript
interface Product {
  readonly id: number;
  name: string;
  price?: number; // optional
}
```

---

### 🔹 Interface with Function Types

```typescript
interface Add {
  (x: number, y: number): number;
}

const add: Add = (a, b) => a + b;
```

---

### 🔹 Interface with Class

```typescript
interface Animal {
  name: string;
  makeSound(): void;
}

class Dog implements Animal {
  name = "Dog";
  makeSound() {
    console.log("Woof!");
  }
}
```

---

## 🔄 `type` vs `interface`

Both `type` and `interface` can describe the shape of data, but they have **key differences**.

---

### 🔸 Similarities

* Both can describe objects, functions, and arrays.
* Both support extending and composition.

---

### 🔸 Differences Table

| Feature               | `interface`                              | `type`                                 |          |
| --------------------- | ---------------------------------------- | -------------------------------------- | -------- |
| Syntax Simplicity     | ✅ Clean and purpose-built                | ✅ Very flexible                        |          |
| Extending             | `extends` keyword                        | Intersection (`&`)                     |          |
| Unions and Primitives | ❌ Cannot define union or primitive types | ✅ Can define unions: \`type A = string | number\` |
| Declaration Merging   | ✅ Yes (can be declared multiple times)   | ❌ No (single declaration only)         |          |
| Recommended Use       | Object/class structures                  | Complex/union/primitive types          |          |

---

### 🔸 Example: Interface Extension

```typescript
interface Base {
  id: number;
}

interface User extends Base {
  name: string;
}
```

### 🔸 Example: Type Intersection

```typescript
type Base = { id: number };
type User = Base & { name: string };
```

---

### ✅ When to Use

| Use Case                        | Recommended |
| ------------------------------- | ----------- |
| Describing an object or class   | `interface` |
| Creating unions or aliases      | `type`      |
| Extending multiple object types | Both        |
| Function or primitive aliasing  | `type`      |
| Need declaration merging        | `interface` |

---

## 📌 Summary

* Use **`interface`** to define object **structure**, especially with classes and OOP.
* Use **`type`** when defining **unions, primitives, tuples, or complex combinations**.
* **Prefer `interface` for public APIs**, but TypeScript supports both equally well.

---

## ✅ Conclusion

Understanding when to use `type` and `interface` improves code **readability**, **scalability**, and **developer collaboration** in TypeScript projects.