## 🔷 Union and Intersection Types in TypeScript

TypeScript provides powerful tools to handle complex types using:

* **Union Types** (`|`) → *either-or*
* **Intersection Types** (`&`) → *combined*

They help define variables that can accept **multiple types** or a **merged structure**.

---

## 🔹 1. Union Types (`|`)

### ✅ Definition:

A **union type** allows a variable to hold **one of several types**.

### 🔸 Syntax:

```typescript
type Result = string | number;
let output: Result;

output = "Passed";  // ✅
output = 90;        // ✅
output = true;      // ❌ Error
```

---

### 🔸 Example with Functions:

```typescript
function printId(id: string | number) {
  console.log("ID:", id);
}
```

### 🔸 With Literal Types:

```typescript
type Direction = "up" | "down" | "left" | "right";
let move: Direction = "left"; // ✅
```

### 🔸 Narrowing a Union:

Use `typeof` or `in` to safely handle each type:

```typescript
function format(input: string | number) {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else {
    return input.toFixed(2);
  }
}
```

---

## 🔹 2. Intersection Types (`&`)

### ✅ Definition:

An **intersection type** combines **multiple types into one**. The resulting type has **all properties** of the combined types.

### 🔸 Syntax:

```typescript
type Name = { name: string };
type Age = { age: number };

type Person = Name & Age;

const employee: Person = {
  name: "Alice",
  age: 30
};
```

### 🔸 Example with Object Types:

```typescript
type Contact = { email: string };
type Address = { city: string };

type ContactDetails = Contact & Address;

let user: ContactDetails = {
  email: "hello@example.com",
  city: "Dhaka"
};
```

---

## 🔄 Comparison Table

\| Feature            | Union Type (`|`)                     | Intersection Type (`&`)             |
\|--------------------|--------------------------------------|-------------------------------------|
\| Combines           | One type OR another                  | All types TOGETHER                  |
\| Use Case           | Multiple possible types              | Merging multiple object types       |
\| Returns            | The common/shared structure          | A new type with all properties      |
\| Example            | `string | number`                    | `{ name: string } & { age: number }` |
\| Common Use         | Function params, flexible variables  | Composing complex objects           |

---

## 🧠 Bonus: Union + Literal + Function

```typescript
type ResponseStatus = "success" | "error";

function handleResponse(status: ResponseStatus) {
  if (status === "success") {
    console.log("Operation successful!");
  } else {
    console.log("Something went wrong.");
  }
}
```

---

## 📌 Summary

\| Concept      | Union (`|`)                             | Intersection (`&`)                          |
\|--------------|------------------------------------------|---------------------------------------------|
\| Means        | One of the types                         | All types merged                            |
\| Used for     | Variability/flexibility                  | Combining multiple data structures          |
\| Keywords     | `string | number`                        | `{ name: string } & { age: number }`        |
\| Real Use     | Status flags, form inputs                | Composing full user/profile/contact types   |

---

## ✅ Conclusion

* **Use Union types** when you want **either one** type or another.
* **Use Intersection types** when you want to **merge multiple types** into one.
* TypeScript's support for these enhances flexibility and code safety in complex applications.
