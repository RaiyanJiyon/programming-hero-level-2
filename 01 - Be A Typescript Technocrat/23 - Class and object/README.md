## 🔷 Class and Object in Object-Oriented Programming (OOP)

### ✅ What is a Class?

A **class** is a **blueprint** or **template** for creating objects. It defines **properties (fields)** and **methods (functions)** that the objects created from it will have.

> Think of a class as a **recipe** and objects as the **dishes** made using that recipe.

---

### 🔹 Syntax of a Class (TypeScript Example)

```typescript
class Car {
  brand: string;
  speed: number;

  constructor(brand: string, speed: number) {
    this.brand = brand;
    this.speed = speed;
  }

  drive(): void {
    console.log(`${this.brand} is driving at ${this.speed} km/h.`);
  }
}
```

---

### ✅ What is an Object?

An **object** is an **instance of a class**. It contains **real values** for the properties and can **call methods** defined in the class.

```typescript
const myCar = new Car("Toyota", 120);
myCar.drive(); // Output: Toyota is driving at 120 km/h.
```

> Each object has its own **unique state**, even though it's created from the same class.

---

## 🔹 Real-World Analogy

* **Class**: `MobilePhone` → defines what a phone is (screen, battery, call())
* **Object**: `myPhone = new MobilePhone()` → a real phone you can use

---

## 🔸 Key Characteristics

| Term   | Description                                      |
| ------ | ------------------------------------------------ |
| Class  | Defines **structure and behavior** of objects    |
| Object | **Instance** of a class with real values         |
| `new`  | Keyword used to create a new object from a class |
| `this` | Refers to the current object inside a class      |

---

### 🔹 Multiple Objects from Same Class

```typescript
const car1 = new Car("Honda", 100);
const car2 = new Car("BMW", 150);

car1.drive(); // Honda is driving at 100 km/h
car2.drive(); // BMW is driving at 150 km/h
```

Each object has its **own data** and can behave **independently**.

---

### 🔹 Class with Default Values & Methods

```typescript
class Person {
  name: string = "Unknown";

  greet(): void {
    console.log(`Hello, I’m ${this.name}`);
  }
}

const p = new Person();
p.greet(); // Hello, I’m Unknown
```

---

## 📌 Summary

| Concept     | Description                                      |
| ----------- | ------------------------------------------------ |
| **Class**   | A template that defines properties and behaviors |
| **Object**  | A real instance created from a class             |
| `new`       | Used to create an object from a class            |
| `this`      | Refers to the object calling the method          |
| Flexibility | Multiple objects can be made from the same class |

---

## ✅ Conclusion

In Object-Oriented Programming, **classes define what objects are**, and **objects bring them to life**. Understanding how to structure and instantiate classes is essential for building **modular**, **reusable**, and **scalable** applications in languages like TypeScript, Java, Python, and C++.

