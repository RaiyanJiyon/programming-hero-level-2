## 🔷 1. Ternary Operator (`condition ? expr1 : expr2`)

### ✅ What is it?

A **shorthand** for an `if-else` statement. It evaluates a condition and returns one of two values based on whether the condition is `true` or `false`.

### 🔹 Syntax:

```typescript
condition ? value_if_true : value_if_false;
```

### 🔹 Example:

```typescript
let age: number = 18;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status); // "Adult"
```

### 🔹 Use Case:

```typescript
const isLoggedIn = true;
const message = isLoggedIn ? "Welcome back!" : "Please log in.";
```

---

## 🔷 2. Optional Chaining Operator (`?.`)

### ✅ What is it?

Safely accesses **deeply nested properties** without throwing an error if a property is `null` or `undefined`.

### 🔹 Syntax:

```typescript
object?.property
object?.method?.()
array?.[index]
```

### 🔹 Example:

```typescript
let user = {
  name: "Alice",
  address: {
    city: "Dhaka"
  }
};

console.log(user.address?.city); // "Dhaka"
console.log(user.contact?.email); // undefined (no error!)
```

> ✅ Prevents "Cannot read property of undefined" errors.

---

## 🔷 3. Nullish Coalescing Operator (`??`)

### ✅ What is it?

Returns the **right-hand operand** when the **left-hand operand is `null` or `undefined`**. It's useful for setting **default values**.

### 🔹 Syntax:

```typescript
let result = value ?? defaultValue;
```

### 🔹 Example:

```typescript
let username: string | null = null;
let displayName = username ?? "Guest";

console.log(displayName); // "Guest"
```

### 🔹 Difference from Logical OR (`||`):

```typescript
let input = 0;

let result1 = input || 10;  // 10 (because 0 is falsy)
let result2 = input ?? 10;  // 0  (only checks null or undefined)

console.log(result1); // 10
console.log(result2); // 0 ✅
```

---

## 🔄 Comparison Table

| Feature            | Ternary Operator          | Optional Chaining               | Nullish Coalescing                     |
| ------------------ | ------------------------- | ------------------------------- | -------------------------------------- |
| Symbol             | `? :`                     | `?.`                            | `??`                                   |
| Use                | Conditional expressions   | Safe property/method access     | Set defaults if null/undefined         |
| Fallback Condition | Based on `true`/`false`   | Only if property is `undefined` | Only if value is `null` or `undefined` |
| Example            | `age > 18 ? "Yes" : "No"` | `user?.profile?.email`          | `input ?? "default"`                   |

---

## 📌 Summary

* ✅ **Ternary**: Conditional shorthand
* ✅ **Optional Chaining**: Safe deep access (`?.`)
* ✅ **Nullish Coalescing**: Default for `null` or `undefined` (`??`)

---

## ✅ Conclusion

These three operators help write **cleaner, safer, and more concise** TypeScript code by handling conditions, null checks, and default values efficiently.