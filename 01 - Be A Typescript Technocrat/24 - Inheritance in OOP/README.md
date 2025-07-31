## 🔷 Inheritance in Object-Oriented Programming (OOP)

### ✅ What is Inheritance?

**Inheritance** is an OOP concept where a class (**child/subclass**) can **inherit properties and methods** from another class (**parent/superclass**).

> Think of it as a **"child inherits features from parent"** in real life.

This promotes **code reuse**, **hierarchical classification**, and helps in building **scalable and maintainable** software.

---

### 🔹 Why Use Inheritance?

* Avoid code duplication
* Reuse logic across classes
* Represent real-world hierarchies (e.g., `Animal → Dog`)
* Make future updates easier (change in parent affects children)

---

## 🔸 Basic Inheritance Syntax (TypeScript Example)

```typescript
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  move(): void {
    console.log(`${this.name} moves`);
  }
}

class Dog extends Animal {
  bark(): void {
    console.log(`${this.name} barks`);
  }
}
```

* `Dog` **extends** `Animal`, meaning it inherits `name` and `move()`.

---

### 🔹 Creating an Object from Child Class

```typescript
const myDog = new Dog("Rex");

myDog.move(); // Rex moves
myDog.bark(); // Rex barks
```

> The `Dog` class **inherits** `move()` from `Animal` and also defines its own method `bark()`.

---

## 🔹 Super Keyword

The `super` keyword is used to:

* Call the **constructor** of the parent class
* Access parent class methods

```typescript
class Bird extends Animal {
  constructor(name: string) {
    super(name); // Call parent constructor
  }

  fly(): void {
    console.log(`${this.name} flies`);
  }
}
```

---

## 🔹 Method Overriding

Child classes can **override** parent methods with new implementations:

```typescript
class Cat extends Animal {
  move(): void {
    console.log(`${this.name} silently walks`);
  }
}

const kitty = new Cat("Whiskers");
kitty.move(); // Whiskers silently walks
```

---

## 🔹 Types of Inheritance

| Type             | Description                                    | Supported in TypeScript? |
| ---------------- | ---------------------------------------------- | ------------------------ |
| **Single**       | One child inherits from one parent             | ✅ Yes                    |
| **Multilevel**   | Child → Parent → Grandparent                   | ✅ Yes                    |
| **Hierarchical** | Multiple children inherit from the same parent | ✅ Yes                    |
| **Multiple**     | One class inherits from multiple parents       | ❌ No (not directly)      |

---

## 📌 Summary

| Term              | Description                                                        |
| ----------------- | ------------------------------------------------------------------ |
| `extends`         | Used to inherit from another class                                 |
| `super()`         | Calls the parent class constructor                                 |
| Inheritance       | Enables code reuse and hierarchical structure                      |
| Method Overriding | Allows redefining parent methods in child class                    |
| Access Inherited  | Subclass can access all **public/protected** members of superclass |

---

## ✅ Conclusion

**Inheritance** is a core principle of OOP that allows you to **build relationships between classes**, **share functionality**, and reduce code duplication. With inheritance, your code becomes more **logical**, **efficient**, and **scalable** — especially in applications with layered or modular designs.