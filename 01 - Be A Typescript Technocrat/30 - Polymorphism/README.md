## 🔷 Polymorphism in Object-Oriented Programming (OOP)

### ✅ What is Polymorphism?

**Polymorphism** means **“many forms”** — it allows **a single interface or method** to work in **different ways** depending on the object or data type.

> In OOP, polymorphism enables us to **call the same method** on different objects, and each object can **respond differently**.

---

### 🔹 Why Use Polymorphism?

* Simplifies code by using **common interfaces**
* Promotes **code reusability** and **extensibility**
* Helps implement **dynamic behavior** in a clean way

---

## 🔸 Types of Polymorphism

| Type             | Description                        |
| ---------------- | ---------------------------------- |
| **Compile-Time** | Also called **method overloading** |
| **Run-Time**     | Also called **method overriding**  |

---

### 🔸 1. **Runtime Polymorphism (Method Overriding)**

Occurs when **child class provides a specific implementation** of a method defined in the parent class.

```typescript
class Animal {
  speak(): void {
    console.log("Animal makes a sound");
  }
}

class Dog extends Animal {
  speak(): void {
    console.log("Dog barks");
  }
}

class Cat extends Animal {
  speak(): void {
    console.log("Cat meows");
  }
}

const animals: Animal[] = [new Dog(), new Cat(), new Animal()];

animals.forEach((a) => a.speak());
// Output:
// Dog barks
// Cat meows
// Animal makes a sound
```

✅ Same method `speak()` behaves differently depending on the object’s class.

---

### 🔸 2. **Compile-Time Polymorphism (Method Overloading)**

TypeScript doesn’t support true method overloading like Java/C++, but you can achieve it using **function declarations with multiple signatures**:

```typescript
function greet(name: string): void;
function greet(age: number): void;
function greet(value: string | number): void {
  if (typeof value === "string") {
    console.log(`Hello, ${value}`);
  } else {
    console.log(`You are ${value} years old`);
  }
}

greet("Alice"); // Hello, Alice
greet(25);      // You are 25 years old
```

---

## 🔹 Real-World Analogy

Imagine a `print()` function:

* For a document: prints text
* For an image: prints pixels
* For a QR code: prints matrix

Different **objects** respond **differently** to the **same method** — that’s **polymorphism**.

---

## 📌 Summary

| Concept            | Description                                        |
| ------------------ | -------------------------------------------------- |
| Polymorphism       | One interface, many implementations                |
| Method Overriding  | Subclass modifies parent’s method (runtime)        |
| Method Overloading | Same method name with different signatures         |
| Benefit            | Clean, reusable, extensible, and maintainable code |

---

## ✅ Conclusion

**Polymorphism** in OOP allows your code to be **flexible, dynamic, and scalable**. Whether you're overriding methods in child classes or handling multiple types with a single interface, polymorphism is key to building **smart, reusable, and powerful object-oriented systems**.