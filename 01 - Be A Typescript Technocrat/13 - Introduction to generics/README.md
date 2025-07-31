## 🔷 Introduction to Generics in TypeScript

### ✅ What are Generics?

**Generics** are a feature in TypeScript that allow you to **write reusable and flexible code** by using **type placeholders**. Instead of hardcoding types, you define a **generic type parameter** that is specified when the function or class is used.

> Think of generics as **variables for types**.

---

### 🔹 Why Use Generics?

Without generics, you might write the same function multiple times for different types. Generics solve this by allowing one version that works with **any type** — **while keeping type safety**.

---

### 🔸 Example Without Generics

```typescript
function identityString(arg: string): string {
  return arg;
}

function identityNumber(arg: number): number {
  return arg;
}
```

### 🔸 With Generics:

```typescript
function identity<T>(arg: T): T {
  return arg;
}

identity<string>("hello");  // returns "hello"
identity<number>(42);       // returns 42
```

* `T` is a **type variable**.
* Type is passed when the function is called.

---

## 🔹 Generic Function Syntax

```typescript
function functionName<T>(param: T): T {
  return param;
}
```

* `T` is a convention for "type", but you can use any name like `U`, `K`, `V`, etc.

---

## 🔹 Generic Arrays

```typescript
function firstItem<T>(items: T[]): T {
  return items[0];
}

const result = firstItem<number>([1, 2, 3]); // result: 1
```

---

## 🔹 Generics with Multiple Types

```typescript
function merge<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const merged = merge({ name: "Alice" }, { age: 25 });
// Type: { name: string; age: number }
```

---

## 🔹 Generic Interfaces

```typescript
interface Box<T> {
  content: T;
}

let stringBox: Box<string> = { content: "Books" };
let numberBox: Box<number> = { content: 123 };
```

---

## 🔹 Generic Classes

```typescript
class Container<T> {
  private data: T;

  constructor(value: T) {
    this.data = value;
  }

  getItem(): T {
    return this.data;
  }
}

let stringContainer = new Container<string>("Hello");
```

---

## 🔹 Generic Constraints

Use `extends` to **restrict** the types that can be used.

```typescript
function printLength<T extends { length: number }>(item: T): void {
  console.log(item.length);
}

printLength("hello"); // ✅
printLength([1, 2, 3]); // ✅
printLength(42); // ❌ Error: number has no length
```

---

## 🔹 Default Generic Types

```typescript
function wrapValue<T = string>(value: T): T[] {
  return [value];
}

wrapValue();        // inferred as string[]
wrapValue(100);     // number[]
```

---

## 📌 Summary

| Feature          | Description                                          |
| ---------------- | ---------------------------------------------------- |
| `T`              | Placeholder for a type                               |
| `<T>(arg: T): T` | Generic function                                     |
| `Box<T>`         | Generic interface/class                              |
| `T extends Type` | Constrain generic type to extend a certain structure |
| Reusability      | Write once, use with any type                        |
| Type Safety      | Maintains strict typing even for flexible code       |

---

## ✅ Conclusion

Generics in TypeScript allow you to write **reusable, type-safe, and scalable code** for functions, classes, and data structures. They are essential for working with **collections, APIs, utility functions**, and frameworks like Angular or React.