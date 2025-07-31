## 🔷 Spread and Rest Operators in TypeScript

TypeScript (and JavaScript) uses **three dots (`...`)** for both the **Spread** and **Rest** operators — their meaning depends on the **context**:

---

## 🔹 1. Spread Operator (`...`)

### ✅ Purpose:

**Expands** elements of an array or properties of an object into **individual elements** or **properties**.

---

### 🔸 A. Spread with Arrays

```typescript
const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4, 5];
console.log(moreNumbers); // [1, 2, 3, 4, 5]
```

> ✅ `...numbers` "spreads" the elements of `numbers` into a new array.

---

### 🔸 B. Spread with Objects

```typescript
const person = { name: "Alice", age: 30 };
const employee = { ...person, position: "Manager" };

console.log(employee); 
// { name: "Alice", age: 30, position: "Manager" }
```

> ✅ Combines or clones objects by spreading properties.

---

### 🔸 C. Use Case: Cloning

```typescript
const original = { x: 10, y: 20 };
const copy = { ...original }; // Shallow copy
```

---

## 🔹 2. Rest Operator (`...`)

### ✅ Purpose:

**Collects multiple elements** into an array or object. It’s the **reverse of spread**.

---

### 🔸 A. Rest in Function Parameters

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3); // 6
```

> ✅ All arguments are **collected** into the `numbers` array.

---

### 🔸 B. Rest with Arrays (Destructuring)

```typescript
const [first, ...rest] = [10, 20, 30, 40];
console.log(first); // 10
console.log(rest);  // [20, 30, 40]
```

---

### 🔸 C. Rest with Objects (Destructuring)

```typescript
const { name, ...others } = { name: "Alice", age: 25, role: "Developer" };
console.log(name);   // Alice
console.log(others); // { age: 25, role: "Developer" }
```

---

## 🔄 Spread vs. Rest – Comparison

| Feature     | Spread Operator                 | Rest Operator                      |
| ----------- | ------------------------------- | ---------------------------------- |
| **Symbol**  | `...`                           | `...`                              |
| **Usage**   | Expands elements                | Gathers elements                   |
| **Used in** | Arrays, objects, function calls | Function parameters, destructuring |
| **Example** | `let newArr = [...oldArr]`      | `function(...args: number[])`      |

---

## ✅ Summary

* **Spread**: Breaks down arrays/objects into **individual parts**.
* **Rest**: Groups multiple inputs into a **single array/object**.
* They **look the same (`...`)**, but their purpose depends on where and how you use them.