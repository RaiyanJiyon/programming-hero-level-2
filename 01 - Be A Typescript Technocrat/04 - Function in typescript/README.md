## 🔷 Functions in TypeScript

In TypeScript, functions work similarly to JavaScript but with added **type safety**. You can specify **parameter types**, **return types**, and use features like **optional**, **default**, and **rest parameters**.

---

### ✅ 1. Basic Function Syntax

```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

* `a: number`, `b: number` → parameter types
* `: number` after `)` → return type

---

### ✅ 2. Function with Optional Parameters

Use `?` to make a parameter optional.

```typescript
function greet(name: string, title?: string): string {
  return title ? `Hello, ${title} ${name}` : `Hello, ${name}`;
}
```

* `title` is optional.
* Must be placed **after** required parameters.

---

### ✅ 3. Function with Default Parameters

Provide a default value if the argument is not passed.

```typescript
function multiply(a: number, b: number = 2): number {
  return a * b;
}

multiply(5); // 10
```

---

### ✅ 4. Function with Rest Parameters

Accepts **multiple arguments** as an array.

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3); // 6
```

---

### ✅ 5. Anonymous Function / Function Expression

```typescript
const divide = function (x: number, y: number): number {
  return x / y;
};
```

---

### ✅ 6. Arrow Function

A shorter syntax for function expressions.

```typescript
const subtract = (a: number, b: number): number => {
  return a - b;
};
```

---

### ✅ 7. Function Type Annotations

You can define the **type signature** of a function.

```typescript
let operation: (x: number, y: number) => number;

operation = function (a, b) {
  return a + b;
};
```

---

### ✅ 8. Return Type: `void` and `never`

#### 🔹 `void` – Function returns nothing

```typescript
function logMessage(message: string): void {
  console.log(message);
}
```

#### 🔹 `never` – Function never returns (e.g., throws an error or runs forever)

```typescript
function throwError(msg: string): never {
  throw new Error(msg);
}
```

---

### ✅ 9. Function with Object as Parameter

```typescript
function printUser(user: { name: string; age: number }): void {
  console.log(`${user.name} is ${user.age} years old.`);
}
```

---

### ✅ 10. Function Overloading

Same function name, different parameter types or numbers.

```typescript
function display(value: string): void;
function display(value: number): void;
function display(value: any): void {
  console.log("Value:", value);
}

display("Hello");
display(123);
```

---

## 🧠 Summary Table

| Feature           | Syntax Example                                   | Purpose                   |
| ----------------- | ------------------------------------------------ | ------------------------- |
| Basic Function    | `function add(a: number, b: number): number`     | Define input/output types |
| Optional Param    | `title?: string`                                 | Optional argument         |
| Default Param     | `b: number = 2`                                  | Default value             |
| Rest Param        | `...nums: number[]`                              | Multiple arguments        |
| Arrow Function    | `(a, b): number => a + b`                        | Shorter syntax            |
| Void Return       | `(): void => {}`                                 | No return value           |
| Never Return      | `(): never => { throw ... }`                     | Never completes           |
| Function Overload | `function fn(x: string); function fn(x: number)` | Multiple versions         |

---

## 📌 Conclusion

Functions in TypeScript are more powerful and safer than in plain JavaScript, thanks to type annotations, overloads, and strict checking. This helps catch bugs **early during development**, improves **code readability**, and supports **scalability** in large applications.