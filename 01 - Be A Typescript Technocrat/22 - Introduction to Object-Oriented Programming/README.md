## 🔷 Introduction to Object-Oriented Programming (OOP)

### ✅ What is Object-Oriented Programming?

**Object-Oriented Programming (OOP)** is a **programming paradigm** based on the concept of **"objects"**, which are instances of **classes** that encapsulate **data (properties)** and **behavior (methods)**.

> Think of OOP as a way to model real-world things (like a Car, User, or Animal) using **code objects**.

---

### 🔹 Why Use OOP?

OOP helps you write code that is:

* **Modular** – easy to organize and maintain
* **Reusable** – components can be reused in different parts of the program
* **Scalable** – ideal for large-scale software systems
* **Maintainable** – changes can be made with minimal impact

---

### 🔸 Core Concepts of OOP

#### 1. **Class**

A blueprint for creating objects.

```typescript
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  speak(): void {
    console.log(`${this.name} makes a sound`);
  }
}
```

---

#### 2. **Object**

An instance of a class.

```typescript
const dog = new Animal("Dog");
dog.speak(); // Dog makes a sound
```

---

#### 3. **Encapsulation**

Hiding internal details and exposing only what's necessary.

```typescript
class BankAccount {
  private balance: number = 0;

  deposit(amount: number) {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}
```

---

#### 4. **Inheritance**

Reusing logic from another class using `extends`.

```typescript
class Dog extends Animal {
  speak(): void {
    console.log(`${this.name} barks`);
  }
}

const puppy = new Dog("Puppy");
puppy.speak(); // Puppy barks
```

---

#### 5. **Polymorphism**

Same method name behaves differently based on the object.

```typescript
const animals: Animal[] = [new Dog("Buddy"), new Animal("Fox")];

animals.forEach(animal => animal.speak());
// Buddy barks
// Fox makes a sound
```

---

#### 6. **Abstraction**

Hiding complex details and showing only the essentials.

```typescript
abstract class Shape {
  abstract area(): number;
}

class Circle extends Shape {
  constructor(public radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}
```

---

## 📌 Summary

| OOP Concept       | Description                                          |
| ----------------- | ---------------------------------------------------- |
| **Class**         | Template for creating objects                        |
| **Object**        | Instance of a class                                  |
| **Encapsulation** | Hides internal details with private/protected access |
| **Inheritance**   | Reuses code from parent classes                      |
| **Polymorphism**  | One interface, many implementations                  |
| **Abstraction**   | Simplifies complex systems                           |

---

## ✅ Conclusion

Object-Oriented Programming (OOP) is a powerful way to model real-world entities in code. By using **classes**, **objects**, and OOP principles like **inheritance**, **encapsulation**, **abstraction**, and **polymorphism**, you can build clean, modular, and maintainable software — from simple apps to large enterprise systems.