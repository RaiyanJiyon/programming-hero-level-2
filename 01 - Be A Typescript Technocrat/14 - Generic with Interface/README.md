## 🔷 Generics with Interface in TypeScript

### ✅ What Are Generic Interfaces?

A **generic interface** in TypeScript is an interface that uses **type parameters** to make it reusable and type-safe for multiple data types.

> Think of it as a **template** for objects, where the type of some property or method can be specified **later** when the interface is implemented.

---

### 🔹 Why Use Generic Interfaces?

Without generics, you would need to create **multiple interfaces** for different types:

```typescript
interface StringBox {
  content: string;
}

interface NumberBox {
  content: number;
}
```

With **generics**, you can combine these into **one reusable interface**:

```typescript
interface Box<T> {
  content: T;
}
```

---

### 🔸 Basic Example

```typescript
interface Box<T> {
  content: T;
}

const stringBox: Box<string> = { content: "Hello" };
const numberBox: Box<number> = { content: 42 };
```

* `T` is a **type parameter** that is replaced with a specific type (`string`, `number`, etc.).
* You get full **type safety** — the compiler will check if the `content` matches the provided type.

---

## 🔹 Generic Interface with Function Property

You can also define a **function inside the interface** that uses generics:

```typescript
interface IdentityFunction<T> {
  (arg: T): T;
}

const identity: IdentityFunction<number> = (x) => x;

console.log(identity(10)); // ✅ 10
```

---

## 🔹 Using Generic Interface with Classes

You can **implement a generic interface in a class**:

```typescript
interface Repository<T> {
  getById(id: number): T;
  save(item: T): void;
}

class UserRepo implements Repository<string> {
  getById(id: number): string {
    return `User${id}`;
  }

  save(user: string): void {
    console.log(`Saving user: ${user}`);
  }
}
```

* This makes the class **flexible** and easy to **adapt to different types** later.

---

## 🔹 Generic Interface with Multiple Types

```typescript
interface Pair<K, V> {
  key: K;
  value: V;
}

const pair1: Pair<string, number> = { key: "age", value: 25 };
const pair2: Pair<number, boolean> = { key: 1, value: true };
```

* You can pass **multiple type parameters** using comma separation (`<K, V>`).

---

## 🔹 Default Generic Types in Interfaces

You can also **set default types**:

```typescript
interface ApiResponse<T = string> {
  data: T;
  status: number;
}

const response1: ApiResponse = { data: "OK", status: 200 }; // data: string
const response2: ApiResponse<number> = { data: 100, status: 200 }; // data: number
```

---

## 📌 Summary

| Feature                  | Description                                     |
| ------------------------ | ----------------------------------------------- |
| `interface Box<T>`       | Defines a generic interface                     |
| `<T>`                    | Type parameter                                  |
| Reusable Types           | One interface can handle different data types   |
| Function Generics        | Interfaces can describe generic function types  |
| Class Implementation     | Classes can implement generic interfaces        |
| Multiple Type Parameters | Use `<T, U>` for handling multiple generics     |
| Default Types            | Use `T = DefaultType` to make generics optional |

---

## ✅ Conclusion

Generic interfaces in TypeScript enable you to create **flexible**, **reusable**, and **type-safe** object structures. They are especially powerful when defining **APIs**, **repositories**, or **utility structures** that need to work with **varying data types** — without sacrificing type safety.
