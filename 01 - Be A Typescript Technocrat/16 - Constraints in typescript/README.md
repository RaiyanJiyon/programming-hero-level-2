## 🔷 Constraints in TypeScript Generics

### ✅ What Are Generic Constraints?

**Generic constraints** allow you to **restrict** the types that can be used as generic parameters. You use the `extends` keyword to specify that a type must satisfy a certain structure or interface.

> Think of constraints as **rules** that generic types must follow.

---

### 🔹 Why Use Constraints?

By default, generic types accept **any type**, which can lead to runtime errors:

```typescript
function printLength<T>(item: T): number {
  // ❌ Error: Property 'length' does not exist on type 'T'
  return item.length;
}
```

To fix this, use a constraint:

```typescript
function printLength<T extends { length: number }>(item: T): number {
  return item.length;
}
```

✅ Now, only types that have a `length` property can be passed.

---

## 🔸 Syntax of Generic Constraints

```typescript
function functionName<T extends ConstraintType>(param: T): void {
  // ...
}
```

* `T` must match the **shape** of `ConstraintType`.

---

## 🔹 Example: Constraint with Object Structure

```typescript
function getFullName<T extends { firstName: string; lastName: string }>(person: T): string {
  return `${person.firstName} ${person.lastName}`;
}

getFullName({ firstName: "John", lastName: "Doe" });  // ✅
getFullName({ name: "Jane" });                        // ❌ Error
```

---

## 🔹 Example: Constraint with Interface

```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(item: T): void {
  console.log(item.length);
}

logLength("Hello");        // ✅
logLength([1, 2, 3]);       // ✅
logLength({ length: 10 });  // ✅
logLength(100);             // ❌ Error
```

---

## 🔹 Constraint with Class

```typescript
class Animal {
  name: string = "";
}

class Dog extends Animal {
  breed: string = "";
}

function showName<T extends Animal>(animal: T): void {
  console.log(animal.name);
}

showName(new Dog());  // ✅
showName({});          // ❌ Error: missing 'name'
```

---

## 🔹 Multiple Constraints Using Intersections

```typescript
function display<T extends { id: number } & { name: string }>(item: T): void {
  console.log(`ID: ${item.id}, Name: ${item.name}`);
}

display({ id: 1, name: "Alice" });  // ✅
display({ id: 2 });                 // ❌ Error
```

* You can combine multiple type requirements using `&` (intersection).

---

## 🔹 Constraints with `keyof` Operator

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "Bob" };
getProperty(user, "name"); // ✅ returns "Bob"
getProperty(user, "email"); // ❌ Error: 'email' is not a key of 'user'
```

* Ensures `key` is a valid property of object `T`.

---

## 📌 Summary

| Feature                       | Description                                      |
| ----------------------------- | ------------------------------------------------ |
| `T extends Type`              | Constrains generic to specific type or structure |
| Interface Constraint          | Only types matching the interface can be passed  |
| Structural Constraint         | Directly specify expected properties             |
| Class Constraint              | Allow only instances of certain classes          |
| Intersection (`&`) Constraint | Combine multiple constraints                     |
| `keyof` Constraint            | Restrict key to valid keys of the object         |
| Error Prevention              | Helps catch invalid types at compile-time        |

---

## ✅ Conclusion

Constraints in TypeScript generics are essential for creating **robust**, **safe**, and **controlled** generic code. By enforcing rules on the types, you prevent misuse and ensure that your code behaves as expected — especially in large applications or libraries.
