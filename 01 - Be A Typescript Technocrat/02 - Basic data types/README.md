## 🔷 Basic Data Types in TypeScript

In TypeScript, data types help developers define **what kind of data** a variable can hold. This allows TypeScript to perform **type checking** at compile time, reducing bugs and improving code clarity.

---

### 📘 1. `number`

Represents both **integers** and **floating-point numbers**.

```typescript
let age: number = 25;
let price: number = 99.99;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

---

### 📘 2. `string`

Used for **textual data** (characters, words, sentences).

```typescript
let name: string = "Alice";
let greeting: string = `Hello, ${name}!`; // template string
```

---

### 📘 3. `boolean`

Represents **true/false** values.

```typescript
let isLoggedIn: boolean = true;
let hasAccess: boolean = false;
```

---

### 📘 4. `null` and `undefined`

Used for variables that are **intentionally empty or not assigned**.

```typescript
let data: null = null;
let value: undefined = undefined;
```

* By default, `null` and `undefined` are **subtypes** of all other types.
* With `strictNullChecks` enabled, they must be explicitly included in types:

```typescript
let maybeNumber: number | null = null;
```

---

### 📘 5. `any`

Used when the type is **not known or can be anything**. It bypasses type checking.

```typescript
let randomValue: any = 10;
randomValue = "Hello";
randomValue = true;
```

> ⚠️ Avoid overusing `any` as it defeats TypeScript’s purpose.

---

### 📘 6. `unknown`

A safer version of `any`. The value must be **checked** before usage.

```typescript
let input: unknown = "Hello";

if (typeof input === "string") {
  console.log(input.toUpperCase());
}
```

---

### 📘 7. `void`

Used when a function **does not return** any value.

```typescript
function logMessage(): void {
  console.log("This returns nothing.");
}
```

---

### 📘 8. `never`

Represents a value that **never occurs**, such as functions that always throw errors or never finish.

```typescript
function throwError(message: string): never {
  throw new Error(message);
}
```

---

### 📘 9. `array`

Represents a list of values of the same type.

```typescript
let numbers: number[] = [1, 2, 3];
let fruits: Array<string> = ["apple", "banana"];
```

---

### 📘 10. `tuple`

Allows a **fixed-length array** with **specific types** in each position.

```typescript
let person: [string, number] = ["Alice", 25];
```

---

### 📘 11. `enum`

Used to define a set of **named constants**.

```typescript
enum Color {
  Red,
  Green,
  Blue
}

let favoriteColor: Color = Color.Green;
```

You can also assign custom values:

```typescript
enum StatusCode {
  OK = 200,
  NotFound = 404,
  ServerError = 500
}
```

---

### 🧩 Example Summary Table

| Data Type   | Example                              | Description                |
| ----------- | ------------------------------------ | -------------------------- |
| `number`    | `let x: number = 5;`                 | Numeric values             |
| `string`    | `let name: string = "John";`         | Text                       |
| `boolean`   | `let isDone: boolean = false;`       | True/False                 |
| `any`       | `let data: any = 10;`                | Any type (no checks)       |
| `unknown`   | `let result: unknown = "abc";`       | Any type (requires checks) |
| `void`      | `function test(): void {}`           | No return value            |
| `never`     | `function err(): never { throw ...}` | Never returns              |
| `null`      | `let val: null = null;`              | Explicit null              |
| `undefined` | `let val: undefined = undefined;`    | Undefined value            |
| `array`     | `let items: number[] = [1, 2];`      | List of items              |
| `tuple`     | `let t: [string, number] = ["a", 1]` | Fixed mixed type elements  |
| `enum`      | `enum Day { Mon, Tue }`              | Named constants            |

---

### ✅ Conclusion

TypeScript's basic data types are foundational to building type-safe applications. By defining what types variables and functions should accept or return, developers can write **more reliable, maintainable, and scalable code**.