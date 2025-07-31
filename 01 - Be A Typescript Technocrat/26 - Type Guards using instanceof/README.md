## 🔷 Type Guards Using `instanceof` in TypeScript

### ✅ What is `instanceof`?

The `instanceof` operator checks whether an object is an **instance of a particular class** (or its subclass).

> It's used as a **type guard** to **narrow types** to specific classes at runtime.

---

### 🔹 Syntax:

```typescript
if (object instanceof ClassName) {
  // object is now treated as ClassName
}
```

---

## 🔸 Example: Using `instanceof` with Classes

```typescript
class Car {
  drive() {
    console.log("Driving a car");
  }
}

class Bike {
  ride() {
    console.log("Riding a bike");
  }
}

function move(vehicle: Car | Bike) {
  if (vehicle instanceof Car) {
    vehicle.drive(); // Narrowed to Car
  } else {
    vehicle.ride(); // Narrowed to Bike
  }
}
```

✅ `instanceof` helps the TypeScript compiler understand which class the object belongs to.

---

## 🔹 Works Only with Classes (Not Interfaces)

⚠️ You **cannot** use `instanceof` with **interfaces** because interfaces do **not exist at runtime**.

```typescript
interface Animal {
  name: string;
}

const dog: Animal = { name: "Buddy" };

// ❌ Error: Cannot use 'instanceof' with interfaces
// if (dog instanceof Animal) { ... }
```

---

## 🔸 Real-World Example: Handling Errors

```typescript
class NotFoundError extends Error {}
class ValidationError extends Error {}

function handleError(error: Error) {
  if (error instanceof NotFoundError) {
    console.log("Resource not found");
  } else if (error instanceof ValidationError) {
    console.log("Validation failed");
  } else {
    console.log("Unknown error");
  }
}
```

✅ `instanceof` lets you distinguish between **error types**.

---

## 🔹 Inheritance Works with `instanceof`

```typescript
class Animal {}
class Dog extends Animal {}

const d = new Dog();

console.log(d instanceof Dog);    // true
console.log(d instanceof Animal); // true
```

✅ `instanceof` works with **subclass relationships**.

---

## 📌 Summary

| Type Guard       | Use Case                                 | Works With                     |
| ---------------- | ---------------------------------------- | ------------------------------ |
| `instanceof`     | Checks if object is an instance of class | Classes only                   |
| Type Narrowing   | Narrows union types to specific class    | Enables method/property access |
| Runtime Behavior | Evaluates based on prototype chain       | true if class exists in chain  |

---

## ✅ Conclusion

Using `instanceof` in TypeScript allows you to write **class-aware, type-safe logic** when dealing with **objects and inheritance**. It’s perfect for identifying class-based types at runtime, improving both safety and clarity in your code.
