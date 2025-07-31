## 🔷 Type Alias in TypeScript

### ✅ What is a Type Alias?

A **type alias** is a way to **give a custom name to a type** (including primitive, union, object, function, etc.). It simplifies code, improves readability, and helps avoid duplication.

---

### 🔹 Syntax:

```typescript
type AliasName = TypeDefinition;
```

---

## 🧱 Examples by Use Case

---

### 1. 🔤 **Primitive Type Alias**

```typescript
type Age = number;
let myAge: Age = 30;
```

Useful for improving code meaning and clarity.

---

### 2. 🧩 **Object Type Alias**

```typescript
type Person = {
  name: string;
  age: number;
};

let user: Person = {
  name: "Alice",
  age: 28
};
```

> ✅ Reuse the `Person` type anywhere in the code.

---

### 3. 🔁 **Union Type Alias**

```typescript
type Status = "success" | "error" | "loading";

let responseStatus: Status = "success";
```

> ✅ Useful for restricting values to specific literals.

---

### 4. 🧮 **Function Type Alias**

```typescript
type AddFn = (a: number, b: number) => number;

const add: AddFn = (x, y) => x + y;
```

> ✅ Makes complex function types easier to reuse and understand.

---

### 5. 📚 **Nested and Reusable Type Alias**

```typescript
type Address = {
  city: string;
  country: string;
};

type Customer = {
  name: string;
  age: number;
  address: Address;
};
```

> ✅ Helps in structuring large and complex data types.

---

### 6. ❓ **Optional and Readonly Properties**

```typescript
type User = {
  readonly id: number;
  username: string;
  email?: string; // optional
};
```

* `readonly`: Prevents modification.
* `?`: Optional property.

---

## ⚠️ Type Alias vs Interface

| Feature           | `type` Alias                  | `interface`                     |
| ----------------- | ----------------------------- | ------------------------------- |
| Syntax simplicity | ✅ Simpler for complex types   | ➖ More verbose for unions       |
| Extending         | ✅ With intersections (`&`)    | ✅ With `extends` keyword        |
| Preferred for     | Primitives, unions, functions | Object shapes, class structures |

---

### ✨ Example: Extending with Intersection (`&`)

```typescript
type Animal = { name: string };
type Dog = Animal & { breed: string };

const myDog: Dog = { name: "Buddy", breed: "Beagle" };
```

---

## 📌 Summary

| Feature     | Description                                        |
| ----------- | -------------------------------------------------- |
| Custom Name | Assign a name to a type for reuse                  |
| Use Cases   | Objects, primitives, unions, functions             |
| Syntax      | `type AliasName = Definition;`                     |
| Benefits    | Clean code, better maintainability, reusable types |

---

## ✅ Conclusion

Type aliases are a powerful tool in TypeScript that help define **clear**, **reusable**, and **readable types** for your variables, functions, and data structures. They are especially useful when working on large-scale projects or APIs with complex type requirements.