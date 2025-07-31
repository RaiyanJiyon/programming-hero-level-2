## 🔷 1. Object Types

### ✅ What is an Object Type?

In TypeScript, **object types** define the shape (structure) of an object: the properties it must have, along with their **names and types**.

### 🔹 Syntax:

```typescript
let person: { name: string; age: number } = {
  name: "Alice",
  age: 30
};
```

### 🔹 Explanation:

* The object must have two properties: `name` of type `string` and `age` of type `number`.
* TypeScript ensures you don’t miss or misuse any property.

### 🔹 Example with Function:

```typescript
function greet(user: { firstName: string; lastName: string }) {
  return `Hello, ${user.firstName} ${user.lastName}`;
}

greet({ firstName: "John", lastName: "Doe" });
```

---

## 🔷 2. Optional Properties (`?`)

### ✅ What is an Optional Type?

Sometimes, an object property may or may not be present. In TypeScript, you can mark such properties as **optional** using a `?`.

### 🔹 Syntax:

```typescript
let employee: { name: string; department?: string } = {
  name: "Bob"
};
```

### 🔹 Explanation:

* `department` is **optional**. It may or may not be provided.
* TypeScript won’t throw an error if it's missing.

### 🔹 Practical Use:

```typescript
function printEmployee(emp: { name: string; department?: string }) {
  if (emp.department) {
    console.log(`${emp.name} works in ${emp.department}`);
  } else {
    console.log(`${emp.name}'s department is unknown.`);
  }
}
```

---

## 🔷 3. Literal Types

### ✅ What is a Literal Type?

Literal types restrict a variable to **exact values** (like a constant) rather than general types such as `string` or `number`.

### 🔹 String Literal:

```typescript
let direction: "left" | "right" | "up" | "down";
direction = "left";   // ✅
direction = "top";    // ❌ Error
```

### 🔹 Numeric Literal:

```typescript
function rollDice(dice: 1 | 2 | 3 | 4 | 5 | 6) {
  return `You rolled a ${dice}`;
}

rollDice(4);   // ✅
rollDice(7);   // ❌ Error
```

### 🔹 Boolean Literal:

```typescript
let isOnline: true | false;
isOnline = true; // ✅
```

### 🔹 Use in Type Narrowing:

```typescript
function process(command: "start" | "stop") {
  if (command === "start") {
    console.log("Machine started.");
  } else {
    console.log("Machine stopped.");
  }
}
```

---

## 🔄 Combining Them: Object + Optional + Literal Types

```typescript
type Notification = {
  title: string;
  type?: "success" | "error" | "warning"; // Optional literal type
};

let msg: Notification = {
  title: "Data saved",
  type: "success"
};

let msg2: Notification = {
  title: "Something went wrong"
};
```

---

## ✅ Summary Table

| Type          | Use                        | Example                         | Notes                  |                      |
| ------------- | -------------------------- | ------------------------------- | ---------------------- | -------------------- |
| Object Type   | Describes object structure | `{ name: string; age: number }` | Strongly typed objects |                      |
| Optional Type | Optional properties        | `name?: string`                 | May or may not exist   |                      |
| Literal Type  | Specific fixed values      | \`"start"                       | "stop"\`               | Acts like a constant |

---

## 📌 Conclusion

These types are essential for building **structured**, **safe**, and **predictable** applications in TypeScript:

* **Object types** describe the shape of data.
* **Optional types** provide flexibility.
* **Literal types** restrict values to exact, meaningful options.
