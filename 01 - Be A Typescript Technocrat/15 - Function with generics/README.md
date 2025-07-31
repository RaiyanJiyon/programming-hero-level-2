## 🔷 Functions with Generics in TypeScript

### ✅ What Are Generic Functions?

**Generic functions** are functions that work with **any data type**, while still maintaining **type safety**. Instead of writing separate functions for each type, generics allow you to write a **single reusable function** that works with multiple types.

> Think of a generic function as a **blueprint** where the actual types are filled in **when the function is called**.

---

### 🔹 Why Use Generic Functions?

Without generics, you would duplicate code for different types:

```typescript
function identityString(arg: string): string {
  return arg;
}

function identityNumber(arg: number): number {
  return arg;
}
```

With generics, you can do this in **one line**:

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

* `T` is a **type variable** — you specify the type when calling the function.

---

### 🔸 Basic Syntax

```typescript
function functionName<T>(param: T): T {
  return param;
}
```

* `<T>` is the **generic type parameter**.
* You can use any name: `T`, `U`, `K`, `V`, etc.

---

### 🔸 Example Usage

```typescript
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello");  // ✅ returns "hello"
identity<number>(123);      // ✅ returns 123
```

Or let TypeScript **infer** the type:

```typescript
identity("world");  // inferred as string
```

---

## 🔹 Generic Function with Arrays

```typescript
function getFirstElement<T>(items: T[]): T {
  return items[0];
}

const first = getFirstElement<number>([10, 20, 30]); // ✅ 10
```

---

## 🔹 Generic Function with Multiple Types

```typescript
function merge<T, U>(a: T, b: U): T & U {
  return { ...a, ...b };
}

const result = merge({ name: "Alice" }, { age: 30 });
// result: { name: string; age: number }
```

* You can use **multiple type variables** separated by commas.

---

## 🔹 Generic Function with Constraints

Use `extends` to **restrict** the allowed types:

```typescript
function logLength<T extends { length: number }>(item: T): void {
  console.log(item.length);
}

logLength("Hello");      // ✅ OK
logLength([1, 2, 3]);     // ✅ OK
logLength(100);           // ❌ Error: number has no length
```

---

## 🔹 Default Type in Generic Function

```typescript
function wrapValue<T = string>(value: T): T[] {
  return [value];
}

wrapValue();       // inferred as string[]
wrapValue(99);     // number[]
```

---

## 🔹 Arrow Function with Generics

```typescript
const identity = <T>(arg: T): T => {
  return arg;
};

identity<boolean>(true); // ✅ true
```

> You can also define generic functions using arrow syntax.

---

## 📌 Summary

| Feature                 | Description                                        |
| ----------------------- | -------------------------------------------------- |
| `function<T>(param: T)` | Generic function syntax                            |
| Type Variable `T`       | Placeholder for the type                           |
| Type Inference          | TypeScript guesses the type if not specified       |
| `T[]`                   | Generic array parameter                            |
| `<T, U>`                | Multiple type parameters                           |
| `T extends Type`        | Constraints to restrict the allowed types          |
| Default Types           | Use `T = DefaultType` for optional type parameters |

---

## ✅ Conclusion

Generic functions in TypeScript offer a powerful way to write **flexible**, **reusable**, and **type-safe** code. Whether you're building utility functions, working with APIs, or creating reusable libraries, generics help ensure **type correctness** without duplicating code for each type.