## 🔷 Getters and Setters in TypeScript

### ✅ What are Getters and Setters?

**Getters (`get`)** and **Setters (`set`)** are **special methods** that allow you to **access or update private/protected properties** of a class in a controlled way.

> Think of them as **smart access points** for reading or writing property values with logic behind them.

---

### 🔹 Why Use Getters and Setters?

* Encapsulate and protect internal data
* Add logic when getting or setting values
* Validate or transform data automatically
* Control read/write access

---

## 🔸 Getter Syntax

```typescript
get propertyName(): type {
  // return value
}
```

## 🔸 Setter Syntax

```typescript
set propertyName(value: type) {
  // assign or validate value
}
```

> Note: Setter **must accept exactly one parameter**.

---

### 🔸 Example: Basic Usage

```typescript
class Person {
  private _name: string = "";

  get name(): string {
    return this._name.toUpperCase();
  }

  set name(value: string) {
    if (value.length < 2) {
      throw new Error("Name is too short");
    }
    this._name = value;
  }
}

const p = new Person();
p.name = "Alice";            // ✅ Calls setter
console.log(p.name);         // ✅ Calls getter → Output: "ALICE"
```

---

### 🔹 Use Case: Auto Format or Validate

```typescript
class Product {
  private _price: number = 0;

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    if (value < 0) {
      throw new Error("Price cannot be negative");
    }
    this._price = value;
  }
}

const item = new Product();
item.price = 150;
console.log(item.price); // Output: 150

item.price = -50; // ❌ Error: Price cannot be negative
```

---

### 🔹 Getters/Setters with Computed Properties

```typescript
class Rectangle {
  constructor(private width: number, private height: number) {}

  get area(): number {
    return this.width * this.height;
  }
}

const rect = new Rectangle(5, 10);
console.log(rect.area); // Output: 50
```

> The `area` is computed using a **getter**, no need to store it.

---

### 🔹 TypeScript Behavior

* You can use getters and setters like **normal properties**, not like functions.
* They provide a **clean syntax** with internal logic.

---

## 📌 Summary

| Keyword  | Purpose                         | Acts Like | Allows Logic? |
| -------- | ------------------------------- | --------- | ------------- |
| `get`    | Retrieve private/protected data | Property  | ✅ Yes         |
| `set`    | Set/update internal values      | Property  | ✅ Yes         |
| Use Case | Data validation, formatting     | Property  | ✅             |

---

## ✅ Conclusion

**Getters and setters** in TypeScript give you a way to **control property access**, apply **validation**, and **encapsulate logic** behind simple property syntax. They make your classes safer, cleaner, and more powerful — especially in large-scale applications.
