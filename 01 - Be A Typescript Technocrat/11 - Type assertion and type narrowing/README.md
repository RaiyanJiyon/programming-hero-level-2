## 🔷 Type Assertion vs Type Narrowing

| Feature     | **Type Assertion**                | **Type Narrowing**                      |
| ----------- | --------------------------------- | --------------------------------------- |
| Purpose     | Tell TypeScript "I know the type" | Let TypeScript infer types by checking  |
| Type Safety | Less safe – you manually override | Safer – relies on runtime checks        |
| Syntax      | `as Type` or `<Type>`             | `typeof`, `instanceof`, or conditionals |

---

## 🔹 1. **Type Assertion**

### ✅ What is it?

**Type assertion** tells TypeScript to **treat a value as a specific type**, even if TypeScript can’t infer it directly. You're manually **overriding** the inferred type.

---

### 🔹 Syntax:

```typescript
let value: any = "Hello";

// Method 1: `as` syntax (recommended)
let strLength: number = (value as string).length;

// Method 2: `<Type>` syntax (not for JSX files)
let strLength2: number = (<string>value).length;
```

---

### 🔹 Use Cases:

#### A. DOM Manipulation

```typescript
let input = document.getElementById("username") as HTMLInputElement;
input.value = "admin";
```

#### B. Working with `unknown` or `any`

```typescript
let data: unknown = "OpenAI";

let length = (data as string).length; // asserting it's a string
```

---

## 🔹 2. **Type Narrowing**

### ✅ What is it?

**Type narrowing** happens when TypeScript **infers a more specific type** from a broader one using **runtime checks** like `typeof`, `instanceof`, or control flow.

---

### 🔹 Techniques:

#### A. `typeof` Narrowing

```typescript
function print(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

---

#### B. `instanceof` Narrowing

```typescript
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function speak(pet: Dog | Cat) {
  if (pet instanceof Dog) {
    pet.bark();
  } else {
    pet.meow();
  }
}
```

---

#### C. `in` Operator Narrowing

```typescript
type Admin = { role: "admin"; accessLevel: number };
type User = { name: string };

function check(entity: Admin | User) {
  if ("accessLevel" in entity) {
    console.log("Admin access:", entity.accessLevel);
  } else {
    console.log("User name:", entity.name);
  }
}
```

---

#### D. Discriminated Unions

```typescript
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function area(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  } else {
    return shape.side ** 2;
  }
}
```

---

## 🧠 When to Use What?

| Situation                              | Use Type Assertion | Use Type Narrowing |
| -------------------------------------- | ------------------ | ------------------ |
| You **know** the type, but TS doesn't  | ✅ Yes              | ❌ No               |
| Type **depends on a check or branch**  | ❌ No               | ✅ Yes              |
| Working with `DOM` or external libs    | ✅ Often needed     | ❌ Not possible     |
| Want **type safety and safety checks** | ❌ Less safe        | ✅ Recommended      |

---

## 📌 Summary

* **Type Assertion**: You tell TypeScript what the type is → `value as Type`
* **Type Narrowing**: TypeScript figures it out using runtime checks → `typeof`, `instanceof`, `in`, etc.
* **Best practice**: Prefer **narrowing** when possible for **safer** and more **robust code**.