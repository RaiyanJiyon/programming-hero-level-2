## 🔷 Encapsulation in Object-Oriented Programming (OOP)

### ✅ What is Encapsulation?

**Encapsulation** is the OOP principle of **wrapping data (properties) and methods** that operate on the data into a single unit — the **class** — and **restricting direct access** to some of the object’s components.

> It **hides the internal state** of an object and only exposes a controlled interface.

---

### 🔹 Why Use Encapsulation?

* Protects object integrity by **preventing external code from directly modifying internal data**
* Helps **maintain control** over how data is accessed or changed
* Supports **modularity** and **maintainability**
* Enables **validation** and **security** on data changes

---

## 🔸 How to Implement Encapsulation in TypeScript

### Using Access Modifiers (`private`, `protected`, `public`)

```typescript
class Employee {
  private salary: number;

  constructor(salary: number) {
    this.salary = salary;
  }

  public getSalary(): number {
    return this.salary;
  }

  public setSalary(amount: number): void {
    if (amount < 0) {
      throw new Error("Salary cannot be negative");
    }
    this.salary = amount;
  }
}

const emp = new Employee(50000);
console.log(emp.getSalary());  // 50000
emp.setSalary(55000);           // Salary updated
// emp.salary = 60000;          // ❌ Error: Property 'salary' is private
```

---

### 🔹 Encapsulation with Getters and Setters

```typescript
class Account {
  private _balance: number = 0;

  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    if (value < 0) {
      throw new Error("Balance cannot be negative");
    }
    this._balance = value;
  }
}

const acc = new Account();
acc.balance = 1000;          // setter called
console.log(acc.balance);    // getter called → 1000
```

---

### 🔹 Benefits of Encapsulation

| Benefit              | Explanation                                  |
| -------------------- | -------------------------------------------- |
| Data Protection      | Prevents invalid or unauthorized changes     |
| Controlled Access    | Only allows access via methods or properties |
| Improved Maintenance | Changes inside class do not affect others    |
| Abstraction Support  | Hides implementation details from users      |

---

## 📌 Summary

| Concept          | Description                                         |
| ---------------- | --------------------------------------------------- |
| Encapsulation    | Bundling data & methods; controlling access         |
| Access Modifiers | `private`, `protected`, `public` manage visibility  |
| Getters/Setters  | Controlled access with validation or transformation |
| Purpose          | Protect data, increase security & maintainability   |

---

## ✅ Conclusion

**Encapsulation** is fundamental for building **robust, secure, and maintainable** software. By controlling how data is accessed and modified, it prevents misuse, promotes modular design, and helps enforce business rules seamlessly.
