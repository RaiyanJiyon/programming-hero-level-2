## 🔷 Destructuring in TypeScript

**Destructuring** is a convenient way to **extract values** from arrays or properties from objects and assign them to variables. It improves code readability and reduces repetition.

---

## 🔹 1. **Array Destructuring**

### ✅ Basic Syntax

```typescript
let numbers: number[] = [10, 20, 30];
let [a, b, c] = numbers;

console.log(a); // 10
console.log(b); // 20
```

### ✅ Skipping Elements

```typescript
let [first, , third] = [1, 2, 3];
console.log(first); // 1
console.log(third); // 3
```

### ✅ Using Rest with Destructuring

```typescript
let [x, ...rest] = [5, 10, 15, 20];
console.log(x);     // 5
console.log(rest);  // [10, 15, 20]
```

---

## 🔹 2. **Object Destructuring**

### ✅ Basic Syntax

```typescript
let person = { name: "Alice", age: 30 };
let { name, age } = person;

console.log(name); // Alice
console.log(age);  // 30
```

### ✅ Renaming Variables

```typescript
let { name: fullName, age: years } = person;

console.log(fullName); // Alice
console.log(years);    // 30
```

### ✅ Default Values

```typescript
let { role = "User" } = { name: "Bob" };
console.log(role); // User
```

---

## 🔹 3. **Type Annotations in Destructuring**

### ✅ With Objects

```typescript
let user: { name: string; age: number } = { name: "Sara", age: 25 };
let { name, age }: { name: string; age: number } = user;
```

### ✅ With Function Parameters (Object Destructuring)

```typescript
function showProfile({ name, age }: { name: string; age: number }) {
  console.log(`${name} is ${age} years old`);
}

showProfile({ name: "John", age: 28 });
```

---

## 🔹 4. **Nested Destructuring**

### ✅ With Objects

```typescript
let employee = {
  id: 1,
  details: {
    name: "Zara",
    department: "Sales"
  }
};

let {
  details: { name, department }
} = employee;

console.log(name);       // Zara
console.log(department); // Sales
```

### ✅ With Arrays

```typescript
let nested = [1, [2, 3]];
let [one, [two, three]] = nested;
console.log(two); // 2
```

---

## 🔹 5. **Destructuring in Function Parameters**

### ✅ Array Example

```typescript
function logCoordinates([x, y]: [number, number]) {
  console.log(`X: ${x}, Y: ${y}`);
}

logCoordinates([10, 20]);
```

---

## ✅ Summary Table

| Feature              | Example                                | Purpose                         |
| -------------------- | -------------------------------------- | ------------------------------- |
| Array Destructuring  | `[a, b] = [1, 2]`                      | Extract elements from arrays    |
| Object Destructuring | `{name, age} = user`                   | Extract properties from objects |
| Renaming             | `{name: fullName}`                     | Use a different variable name   |
| Default Values       | `{role = "User"}`                      | Assign default values           |
| Nested Destructuring | `{ details: { name } } = obj`          | Access nested data              |
| Function Parameters  | `function({ name }: { name: string })` | Destructure in function args    |

---

## 📌 Conclusion

Destructuring in TypeScript is a powerful feature that allows you to write **cleaner, more readable code** by directly extracting data from arrays and objects. It also supports type safety when used with proper type annotations.
