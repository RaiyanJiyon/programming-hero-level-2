## ⚙️ What’s the Core Difference?

| Type                    | Holds State?                                              | React Behavior                                |
| ----------------------- | --------------------------------------------------------- | --------------------------------------------- |
| **Stateless Component** | ❌ No internal state                                       | Re-renders **only** when its *props* change   |
| **Stateful Component**  | ✅ Has internal state (via `useState`, `useReducer`, etc.) | Re-renders when its *state* or *props* change |

---

## 🎯 The Concept in One Line

> 🧠 **Stateful components own data**;
> **Stateless components display data.**

---

## 🧩 Example: Stateless vs Stateful

### 🟢 1. Stateless Component

```jsx
function Greeting({ name }) {
  console.log("Rendering Greeting");
  return <h1>Hello, {name}!</h1>;
}
```

* `Greeting` only depends on its **props**.
* It doesn’t call `useState` or manage internal data.
* React will re-render it **only if `name` changes.**

✅ **Pure function** — same input → same output.

---

### 🔵 2. Stateful Component

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  console.log("Rendering Counter");

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

* `Counter` owns **internal state (`count`)**.
* Every time you call `setCount`, React re-renders `Counter`.
* The **render depends on both state and props.**

✅ **Dynamic** — the UI changes when internal data changes.

---

## 🔄 How Re-Renders Differ

| Trigger                      | Stateless Component | Stateful Component    |
| ---------------------------- | ------------------- | --------------------- |
| Parent prop changes          | ✅ Yes               | ✅ Yes                 |
| Internal state changes       | ❌ No                | ✅ Yes                 |
| Context changes              | ✅ Yes               | ✅ Yes (if subscribed) |
| Force re-render (via parent) | ✅ Yes               | ✅ Yes                 |

---

## ⚙️ Visualization

```
          ┌─────────────────────────┐
          │       Stateful          │
          │  useState / useReducer  │
          ├─────────────────────────┤
 State →  │ Component Re-Renders    │
          │ Virtual DOM Updated     │
          └─────────────────────────┘
                      │
                      ▼
          ┌─────────────────────────┐
          │      Stateless           │
          │ Receives Updated Props   │
          │ (Renders if changed)     │
          └─────────────────────────┘
```

---

## 🧠 A Deeper Insight: Composition

Stateful and stateless components often work **together**.

### Example:

```jsx
function App() {
  const [user, setUser] = useState("Raiyan");
  return <Greeting name={user} />; // Greeting is stateless
}
```

* `App` → stateful (manages `user`)
* `Greeting` → stateless (renders UI)
* If `App` changes `user`, `Greeting` re-renders because **props** changed.

✅ This separation makes UI predictable and modular.

---

## 🧩 Why This Matters for Performance

* **Stateless components** are faster (no internal state tracking).
* **Stateful components** are necessary for interactivity.
* Good practice:
  → Keep **state high up** and pass data down as **props** to stateless children.

This is called **“lifting state up”** in React — helps avoid unnecessary re-renders.

---

## ⚡ Quick Summary

| Concept                            | Stateless  | Stateful          |
| ---------------------------------- | ---------- | ----------------- |
| Uses `useState` / `useReducer`     | ❌          | ✅                 |
| Can hold internal data             | ❌          | ✅                 |
| Depends on props                   | ✅          | ✅                 |
| Triggers re-render on prop change  | ✅          | ✅                 |
| Triggers re-render on state change | ❌          | ✅                 |
| Typical Use                        | UI display | Interactive logic |

---

## 💬 Real-World Analogy

* **Stateless** → A mirror. It reflects whatever is shown to it (props).
* **Stateful** → A notebook. It can *remember* things and change based on user input.
