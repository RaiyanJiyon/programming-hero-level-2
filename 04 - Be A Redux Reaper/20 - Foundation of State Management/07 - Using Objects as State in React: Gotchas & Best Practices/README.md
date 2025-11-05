## 🧩 1. The Basics — State Can Be an Object

React state isn’t limited to primitives — you can absolutely store **objects** or **arrays**:

```jsx
const [user, setUser] = useState({ name: "Raiyan", age: 20 });
```

✅ Works fine.
But the **moment you start updating parts** of that object… things get tricky.

---

## ⚠️ 2. The First Gotcha — State Is *Immutable*

React’s state updates rely on **object identity** (reference comparison).

If you mutate the existing object, React **won’t detect** that the state has changed —
because the reference (memory address) stays the same.

### ❌ Wrong (mutation)

```jsx
user.age = 21;
setUser(user); // ❌ React may not re-render
```

Here, the reference of `user` hasn’t changed — React thinks nothing changed.

### ✅ Right (immutable update)

```jsx
setUser({ ...user, age: 21 }); // ✅ New object → new reference → triggers re-render
```

**Rule:**

> Always create a **new object** instead of modifying the existing one.

---

## 🧠 3. Why This Matters: Shallow Comparison

React uses **shallow comparison** to decide if a component should re-render.

```js
prevState === nextState // used internally
```

If the two objects are the *same reference*, React assumes nothing changed.
That’s why immutability is crucial.

---

## 🧩 4. The Second Gotcha — Partial Updates Don’t Merge Automatically

If you’re coming from React class components (`this.setState()`), note this difference:

| Type                   | Behavior                        |
| ---------------------- | ------------------------------- |
| **Class `setState()`** | Merges objects (partial update) |
| **Hooks `useState()`** | Replaces entire state object    |

### Example:

```jsx
const [user, setUser] = useState({ name: "Raiyan", age: 20 });

// ❌ This replaces the whole object
setUser({ age: 21 }); 
// Now `user.name` is undefined
```

### ✅ Correct way:

```jsx
setUser(prev => ({ ...prev, age: 21 }));
```

So:

> **`useState` replaces, not merges.**
> You must spread (`...`) previous values manually.

---

## 🧬 5. Best Practice: Functional Updates for Safety

When your next state depends on the **previous** one,
always use the *functional update form* to avoid stale closures:

```jsx
setUser(prev => ({
  ...prev,
  age: prev.age + 1
}));
```

This ensures you’re always working with the **latest** state, even inside async handlers.

---

## ⚙️ 6. Nested Objects: The Deep Update Trap

If your state is nested, you need to copy each affected level immutably.

### ❌ Mutating nested data:

```jsx
setUser({
  ...user,
  address: {
    city: "Dhaka" // ❌ missing previous fields, overwrites whole address
  }
});
```

### ✅ Correct nested update:

```jsx
setUser({
  ...user,
  address: {
    ...user.address,
    city: "Dhaka"
  }
});
```

This ensures all other `address` fields are preserved.

> For deeply nested updates, consider libraries like **Immer** or **useReducer**.

---

## 🧩 7. Practical Example

```jsx
function Profile() {
  const [user, setUser] = useState({
    name: "Raiyan",
    age: 20,
    address: { city: "Dhaka", country: "BD" },
  });

  const handleCityChange = () => {
    setUser(prev => ({
      ...prev,
      address: {
        ...prev.address,
        city: "Chittagong",
      },
    }));
  };

  return (
    <div>
      <p>{user.name} from {user.address.city}</p>
      <button onClick={handleCityChange}>Move</button>
    </div>
  );
}
```

✅ React re-renders correctly because:

* We used functional updates.
* We kept immutability (spread syntax).
* We updated nested objects properly.

---

## 🧩 8. When to Use `useReducer` Instead

When your object state grows complex (nested updates, multiple fields),
it’s usually cleaner to switch to a **reducer** pattern:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "setCity":
      return { ...state, address: { ...state.address, city: action.payload } };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, initialUser);
```

✅ This centralizes updates and avoids inline spread chaos.

---

## 🧠 9. Common Gotchas Summary

| Gotcha                  | Problem                    | Fix                               |
| ----------------------- | -------------------------- | --------------------------------- |
| Mutating state directly | React won’t detect change  | Always return a new object        |
| Forgetting to merge     | Old properties disappear   | Spread (`...prev`) previous state |
| Updating nested objects | Overwrites inner fields    | Copy each level immutably         |
| Stale closures          | Using outdated state value | Use functional updates            |
| Too complex updates     | Spaghetti spread syntax    | Use `useReducer` or Immer         |

---

## 🧭 10. Bonus: Using Immer (Optional Helper)

```bash
npm install immer
```

```jsx
import { produce } from "immer";

setUser(produce(draft => {
  draft.address.city = "Dhaka";
}));
```

✅ Immer handles immutability internally —
you write *mutable-style code*, but it produces an immutable result.

---

## ⚡ TL;DR

| Concept                | Best Practice                                  |
| ---------------------- | ---------------------------------------------- |
| State immutability     | Always return new objects                      |
| Updating nested fields | Spread at each level or use Immer              |
| Functional updates     | Use `(prev) => ...` form                       |
| Multiple keys          | Merge manually — `useState` doesn’t auto-merge |
| Complex logic          | Prefer `useReducer`                            |

---

### 💬 Quick Analogy

Think of React state as a **photo**, not a **live object**.
If you want to change something, you don’t edit the same photo —
you take a *new one with the updates.*

