## 🔷 Advanced TypeScript: Conditional, Mapped & Utility Types

---

## ✅ 1. Conditional Types

### 🔹 What Are Conditional Types?

**Conditional types** allow you to **create types based on a condition** — like an `if` statement in types.

```typescript
T extends U ? X : Y
```

> If type `T` extends `U`, return type `X`; otherwise return type `Y`.

---

### 🔸 Basic Example

```typescript
type IsString<T> = T extends string ? "Yes" : "No";

type A = IsString<string>; // "Yes"
type B = IsString<number>; // "No"
```

---

### 🔸 Use Case: Remove `null` or `undefined`

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type Clean = NonNullable<string | null>;  // string
```

---

### 🔸 Conditional Return Type Example

```typescript
type Response<T> = T extends boolean ? "Yes/No" : "Data";

type R1 = Response<boolean>; // "Yes/No"
type R2 = Response<number>;  // "Data"
```

---

## ✅ 2. Mapped Types

### 🔹 What Are Mapped Types?

Mapped types let you **create new types by transforming existing ones** — like cloning or modifying object types using a loop over keys.

```typescript
type NewType = {
  [Key in keyof OldType]: Type;
};
```

> Think of it like a `for...in` loop **for types**.

---

### 🔸 Basic Example

```typescript
type User = {
  name: string;
  age: number;
};

type ReadOnlyUser = {
  readonly [K in keyof User]: User[K];
};
```

Result:

```typescript
// ReadOnlyUser:
// {
//   readonly name: string;
//   readonly age: number;
// }
```

---

### 🔸 Optional Properties Example

```typescript
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type PartialUser = Optional<User>;
```

---

### 🔸 Remove `readonly`

```typescript
type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};
```

---

## ✅ 3. Utility Types

### 🔹 What Are Utility Types?

**Utility types** are **built-in generic types** that simplify common type transformations — like making all properties optional, readonly, picking specific keys, etc.

---

### 🔸 Common Utility Types

| Utility Type     | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `Partial<T>`     | All properties of `T` are optional                    |
| `Required<T>`    | All properties are required                           |
| `Readonly<T>`    | All properties are `readonly`                         |
| `Pick<T, K>`     | Select a subset of keys from `T`                      |
| `Omit<T, K>`     | Remove a set of keys from `T`                         |
| `Record<K, T>`   | Create an object type with keys `K` and values `T`    |
| `Exclude<T, U>`  | Exclude from `T` the types that are assignable to `U` |
| `Extract<T, U>`  | Extract from `T` the types that are assignable to `U` |
| `NonNullable<T>` | Remove `null` and `undefined` from `T`                |
| `ReturnType<T>`  | Get the return type of a function type                |

---

### 🔸 Examples

#### ✅ Partial

```typescript
interface Person {
  name: string;
  age: number;
}

type PartialPerson = Partial<Person>;
// { name?: string; age?: number }
```

#### ✅ Pick

```typescript
type JustName = Pick<Person, "name">;
// { name: string }
```

#### ✅ Omit

```typescript
type WithoutAge = Omit<Person, "age">;
// { name: string }
```

#### ✅ Record

```typescript
type Scores = Record<string, number>;

const mathScores: Scores = {
  Alice: 90,
  Bob: 85,
};
```

#### ✅ ReturnType

```typescript
function getData() {
  return { id: 1, title: "Post" };
}

type Data = ReturnType<typeof getData>;
// { id: number; title: string }
```

---

## 📌 Summary

| Feature               | Description                                          |
| --------------------- | ---------------------------------------------------- |
| `T extends U ? X : Y` | Conditional type based on relationship between types |
| Mapped Types          | Transform all keys in a type                         |
| Utility Types         | Built-in tools to reshape existing types             |
| `Partial<T>`          | Makes all properties optional                        |
| `Pick<T, K>`          | Select specific keys from a type                     |
| `Omit<T, K>`          | Remove specific keys from a type                     |
| `ReturnType<T>`       | Infer return type of a function                      |

---

## ✅ Conclusion

Advanced types in TypeScript — including **Conditional Types**, **Mapped Types**, and **Utility Types** — let you write highly **flexible**, **powerful**, and **type-safe** code. These tools are essential when building **reusable components**, working with **complex APIs**, or designing **generic libraries**.