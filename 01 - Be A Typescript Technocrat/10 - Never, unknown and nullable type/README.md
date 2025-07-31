## 🔷 1. `never` Type

### ✅ What is `never`?

The `never` type represents values that **never occur**. It is used when a function **never returns** or a variable **cannot possibly have a value**.

---

### 🔹 Use Cases:

#### A. Function that throws an error:

```typescript
function throwError(message: string): never {
  throw new Error(message);
}
```

#### B. Function that never ends (infinite loop):

```typescript
function loopForever(): never {
  while (true) {}
}
```

#### C. Exhaustive type checks:

```typescript
type Shape = "circle" | "square";

function getArea(shape: Shape) {
  switch (shape) {
    case "circle":
      return Math.PI;
    case "square":
      return 4;
    default:
      const _exhaustiveCheck: never = shape; // Type error if a case is missing
      return _exhaustiveCheck;
  }
}
```

---

## 🔷 2. `unknown` Type

### ✅ What is `unknown`?

`unknown` is a **safe counterpart to `any`**. It means "this value could be anything," but unlike `any`, you **must narrow it down** before using it.

---

### 🔹 Syntax:

```typescript
let value: unknown;

value = "Hello";
value = 42;
value = true;
```

### 🔹 You can't use it directly:

```typescript
function handle(data: unknown) {
  // console.log(data.toUpperCase()); ❌ Error

  if (typeof data === "string") {
    console.log(data.toUpperCase()); ✅
  }
}
```

> ✅ Use **type narrowing** (`typeof`, `instanceof`, etc.) to safely handle `unknown`.

---

### 🔸 `any` vs `unknown`

| Feature       | `any`                  | `unknown`                 |
| ------------- | ---------------------- | ------------------------- |
| Type Safety   | ❌ No safety            | ✅ Safer, must narrow type |
| Usage         | Direct usage allowed   | Must check before using   |
| Best Practice | Avoid unless necessary | Prefer `unknown`          |

---

## 🔷 3. Nullable Types (`null` and `undefined`)

### ✅ What are nullable types?

In TypeScript, a value can be `null` or `undefined`. To explicitly allow these, use **union types**:

---

### 🔹 Syntax:

```typescript
let name: string | null = null;
let age: number | undefined = undefined;
```

### 🔹 Example with function:

```typescript
function greet(name: string | null) {
  if (name) {
    console.log(`Hello, ${name}`);
  } else {
    console.log("Hello, Guest");
  }
}
```

### 🔹 Enable `strictNullChecks` (recommended):

With `strictNullChecks` enabled in `tsconfig.json`, TypeScript **does not** allow `null` or `undefined` unless specified.

```json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

---

## 🔄 Summary Table

| Type        | Description                                 | Use Case                             |
| ----------- | ------------------------------------------- | ------------------------------------ |
| `never`     | Represents impossible values                | Functions that throw or never return |
| `unknown`   | A safer version of `any`, requires checking | When type is unknown at compile time |
| `null`      | Explicitly no value                         | Optional values                      |
| `undefined` | Value not assigned                          | Default for uninitialized variables  |

---

## 📌 Conclusion

* **`never`**: Used for functions that **never return** or to catch **impossible code paths**.
* **`unknown`**: Used when you're unsure of the type — but want to enforce **type safety**.
* **Nullable types (`null` | `undefined`)**: Represent **missing or optional values**, especially useful in function parameters or user input.