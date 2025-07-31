## 🔷 Access Modifiers in TypeScript

### ✅ What are Access Modifiers?

**Access modifiers** control the **visibility** (accessibility) of class members (properties and methods) in TypeScript.

> They help **encapsulate** internal logic and **protect data** by controlling who can access or modify it.

---

### 🔹 Types of Access Modifiers

| Modifier    | Access Level                                       |
| ----------- | -------------------------------------------------- |
| `public`    | Accessible from **anywhere**                       |
| `private`   | Accessible **only within the same class**          |
| `protected` | Accessible within the class **and its subclasses** |

---

## 🔸 1. `public` Modifier

This is the **default** in TypeScript. No keyword needed, but you can write it for clarity.

```typescript
class Person {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public greet() {
    console.log(`Hello, I’m ${this.name}`);
  }
}

const p = new Person("Alice");
console.log(p.name); // ✅ Accessible
p.greet();           // ✅ Accessible
```

---

## 🔸 2. `private` Modifier

`private` members are only accessible **inside the class**.

```typescript
class BankAccount {
  private balance: number = 1000;

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount();
console.log(account.getBalance()); // ✅ Works
// console.log(account.balance);   // ❌ Error: Property 'balance' is private
```

---

## 🔸 3. `protected` Modifier

`protected` members are accessible **within the class and its subclasses**, but **not from outside**.

```typescript
class Animal {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Dog extends Animal {
  bark() {
    console.log(`${this.name} barks`);
  }
}

const dog = new Dog("Rex");
dog.bark();           // ✅ Accessible through method
// console.log(dog.name); // ❌ Error: 'name' is protected
```

---

## 🔹 Access Modifiers in Constructor Parameters

TypeScript allows you to declare and assign access modifiers directly in constructor parameters:

```typescript
class User {
  constructor(private id: number, public username: string) {}

  getId(): number {
    return this.id;
  }
}

const user = new User(1, "john");
console.log(user.username); // ✅ public
// console.log(user.id);    // ❌ private
```

---

## 📌 Summary

| Modifier    | Accessible From            | Example Use Case              |
| ----------- | -------------------------- | ----------------------------- |
| `public`    | Anywhere (default)         | Properties you want to expose |
| `private`   | Only within the same class | Sensitive data like passwords |
| `protected` | Class and subclasses only  | Shared logic in inheritance   |

---

## ✅ Conclusion

**Access modifiers** help enforce **data encapsulation and security** in your TypeScript classes. By using `public`, `private`, and `protected`, you ensure that your class internals are only accessed where appropriate — leading to **cleaner, safer, and more maintainable code**.
