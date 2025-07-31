Here's a detailed explanation of **Type Guards using `typeof` and `in` in TypeScript**, formatted exactly how you like:

---

## 🔷 Type Guards Using `typeof` and `in` in TypeScript

### ✅ What is a Type Guard?

A **Type Guard** is a technique in TypeScript to **narrow down a variable's type** within a conditional block. This allows TypeScript to **infer more specific types**, enabling safer and more precise code.

> Think of type guards as **runtime checks** that help the compiler understand which type you’re dealing with.

---

## 🔹 Type Guard using `typeof`

The `typeof` operator checks **primitive types** like:
`"string"`, `"number"`, `"boolean"`, `"symbol"`, `"undefined"`, `"function"`, and `"bigint"`.

---

### 🔸 Syntax:

```typescript
if (typeof variable === "type") {
  // narrowed type block
}
```

---

### 🔸 Example:

```typescript
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log("Text ID:", id.toUpperCase());
  } else {
    console.log("Numeric ID:", id.toFixed(2));
  }
}
```

✅ Output will differ based on the runtime type of `id`.

> `typeof` only works reliably for **primitive types**, not objects or arrays.

---

## 🔹 Type Guard using `in`

The `in` operator checks whether a **property exists** in an object. It's ideal for **union types of objects**.

---

### 🔸 Syntax:

```typescript
if ("propertyName" in variable) {
  // narrowed type block
}
```

---

### 🔸 Example:

```typescript
type Dog = { bark: () => void };
type Cat = { meow: () => void };

function makeSound(animal: Dog | Cat) {
  if ("bark" in animal) {
    animal.bark(); // treated as Dog
  } else {
    animal.meow(); // treated as Cat
  }
}
```

✅ TypeScript narrows the type based on the property check.

---

## 📌 Summary

| Type Guard     | Use Case                    | Works With                      |
| -------------- | --------------------------- | ------------------------------- |
| `typeof`       | Check primitive types       | string, number, boolean, etc.   |
| `in`           | Check existence of property | Objects (union types)           |
| Type Narrowing | Helps TS infer precise type | Enhances safety and readability |

---

## ✅ Conclusion

Using `typeof` and `in` as **type guards** in TypeScript helps you **safely write code that deals with multiple types**. They let you build functions and components that are **flexible yet type-safe**, reducing errors and improving maintainability — especially in complex applications.
