## 🔷 Static Members in Object-Oriented Programming (OOP)

### ✅ What are Static Members?

In OOP, a **static member** (property or method) belongs to the **class itself**, **not to instances** of the class.

> You can access static members **without creating an object** of the class.

---

### 🔹 Why Use Static?

* Store **common data or logic** shared across all objects
* Create **utility functions** (like `Math.random()`)
* Access or manage **class-level constants** or counters

---

## 🔸 Syntax in TypeScript

```typescript
class ClassName {
  static propertyName: type;
  static methodName(): returnType { ... }
}
```

Accessing static members:

```typescript
ClassName.propertyName;
ClassName.methodName();
```

---

## 🔸 Example: Static Property and Method

```typescript
class Counter {
  static count: number = 0;

  static increment(): void {
    this.count++;
  }

  static getCount(): number {
    return this.count;
  }
}

Counter.increment();
Counter.increment();
console.log(Counter.getCount()); // Output: 2
```

✅ No object creation needed!

---

## 🔹 Static vs Instance Members

| Feature        | Static                            | Instance                          |
| -------------- | --------------------------------- | --------------------------------- |
| Belongs To     | Class                             | Object (created with `new`)       |
| Accessed Using | `ClassName.member`                | `object.member`                   |
| Shared?        | Yes (one copy across all objects) | No (each object has its own copy) |
| Use Case       | Constants, counters, utilities    | Object-specific data and behavior |

---

## 🔸 Static with Constructors

You **cannot** access instance members inside static methods **directly**.

```typescript
class Person {
  name: string;
  static species = "Homo sapiens";

  constructor(name: string) {
    this.name = name;
  }

  static describeSpecies(): void {
    // console.log(this.name); ❌ Not allowed
    console.log(`All humans are ${this.species}`);
  }
}

Person.describeSpecies(); // ✅
```

---

## 🔸 Example: Static Utility Class

```typescript
class MathUtil {
  static square(n: number): number {
    return n * n;
  }
}

console.log(MathUtil.square(5)); // Output: 25
```

---

## 📌 Summary

| Concept          | Description                                     |
| ---------------- | ----------------------------------------------- |
| `static` keyword | Defines class-level members                     |
| Access           | Via class name, not instances                   |
| Shared           | One copy per class, shared across all instances |
| Use Cases        | Constants, counters, utilities, metadata        |

---

## ✅ Conclusion

**Static members** in OOP provide a powerful way to define **class-level functionality** that doesn’t depend on individual objects. They are perfect for **global data**, **utility functions**, and **shared logic**, making your code more efficient and organized.
