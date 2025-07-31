## 🔷 Constraint Using `keyof` in TypeScript Generics

### ✅ What is `keyof`?

The `keyof` operator in TypeScript returns a **union of string literal types** representing all the **keys of a given type or interface**.

> Think of `keyof` as a way to get **all property names** (keys) of an object type.

---

### 🔹 Why Use `keyof` in Generic Constraints?

When building **generic functions** that access object properties, you want to **ensure** the property exists — and that’s exactly what `keyof` helps with.

It helps TypeScript enforce that a property **must exist** on a given object type, preventing runtime errors.

---

### 🔸 Basic `keyof` Example

```typescript
interface Person {
  name: string;
  age: number;
}

type PersonKeys = keyof Person; // "name" | "age"
```

---

### 🔸 Generic Function Using `keyof`

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

* `T`: The object type.
* `K extends keyof T`: `K` must be a key of `T`.
* Return type: `T[K]` means the **type of the value at key `K` in object `T`**.

---

### 🔹 Usage Example

```typescript
const user = { id: 101, name: "Alice", isAdmin: true };

const id = getProperty(user, "id");       // ✅ Type: number
const name = getProperty(user, "name");   // ✅ Type: string
const admin = getProperty(user, "isAdmin"); // ✅ Type: boolean

getProperty(user, "email"); // ❌ Error: "email" is not a key of user
```

> This guarantees **type safety** by restricting keys to valid ones from the object.

---

## 🔹 Use Case: Dynamic Object Access

Imagine you want to log values from different objects dynamically:

```typescript
function logValue<T, K extends keyof T>(obj: T, key: K): void {
  console.log(`${key}: ${obj[key]}`);
}

logValue({ product: "Book", price: 200 }, "price"); // ✅ price: 200
```

---

## 🔹 Advanced: Using `keyof` with Generics and Constraints

```typescript
function copyProperty<T extends object, K extends keyof T>(from: T, to: T, key: K): void {
  to[key] = from[key];
}

const a = { name: "John", age: 30 };
const b = { name: "Doe", age: 25 };

copyProperty(a, b, "name"); // ✅ b.name = a.name
```

* Ensures the property exists and is assignable.

---

## 🔹 keyof with Index Signature

```typescript
interface Dictionary {
  [key: string]: number;
}

function getDictValue<T extends Dictionary, K extends keyof T>(dict: T, key: K): number {
  return dict[key];
}

getDictValue({ apples: 5, bananas: 10 }, "bananas"); // ✅
```

---

## 📌 Summary

| Concept             | Description                                                    |
| ------------------- | -------------------------------------------------------------- |
| `keyof`             | Gets all keys of a type as a union of strings                  |
| `K extends keyof T` | Ensures the key `K` is a valid property of object type `T`     |
| `T[K]`              | Gets the type of property `K` in object `T`                    |
| Ensures Type Safety | Prevents invalid property access                               |
| Works with Objects  | Ideal for accessing or modifying dynamic properties in objects |

---

## ✅ Conclusion

Using `keyof` with generic constraints allows your TypeScript functions to be **powerful yet type-safe** when interacting with object properties. It protects your code from invalid property access while giving you the flexibility to write reusable, dynamic utilities.