# ⚙️ `useReducer`: When `useState` Isn’t Enough

---

## 🧩 1. The Context — Why `useState` Becomes Limiting

`useState` is perfect for **simple**, isolated pieces of state — like booleans, numbers, or strings:

```jsx
const [count, setCount] = useState(0);
```

✅ Works beautifully.

But as your app grows, you might face **one or more** of these problems:

| Problem                                        | Example                                                 |
| ---------------------------------------------- | ------------------------------------------------------- |
| **Complex state shape**                        | Nested objects or arrays that need fine-grained updates |
| **Multiple related updates**                   | One user action changes several state values            |
| **State transitions**                          | Logic-heavy updates (if/else/switch)                    |
| **Hard to track logic spread across handlers** | Many `setState` calls scattered in the component        |

👉 When any of these appear, `useReducer` shines.

---

## 🧠 2. The Core Idea of `useReducer`

Think of `useReducer` as **a more structured version of `useState`**.

Instead of manually calling `setState` everywhere, you:

1. Define a **reducer function** that describes how state changes.
2. Dispatch **actions** to that reducer.

It’s inspired by **Redux**, but scoped to a single component.

---

### Basic Syntax:

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

* `reducer(state, action)` → returns the new state.
* `dispatch(action)` → tells React *what happened*.

---

## 🧩 3. Example: From `useState` → `useReducer`

### 🐣 Using `useState`

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>−</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

✅ Fine for simple state.

---

### 🦾 Using `useReducer`

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return 0;
    default:
      return state;
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>−</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
```

🎯 Logic is centralized → easier to maintain and scale.

---

## 🧬 4. Why `useReducer` Is Powerful

| Feature                            | `useState`                | `useReducer`                                       |
| ---------------------------------- | ------------------------- | -------------------------------------------------- |
| Simplicity                         | Great for single values   | Better for complex logic                           |
| Multiple fields                    | Multiple `useState` calls | One structured state                               |
| Centralized logic                  | ❌ Scattered               | ✅ In one reducer                                   |
| Predictable transitions            | ❌ Harder                  | ✅ Explicit actions                                 |
| Performance (for frequent updates) | Can cause re-renders      | Can be optimized with `useCallback` or memoization |

---

## 🧠 5. Real-World Example: Form State Management

When managing forms, `useState` can get messy:

### ❌ With `useState`:

```jsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [isLoading, setIsLoading] = useState(false);
```

Multiple setters → scattered logic.

---

### ✅ With `useReducer`:

```jsx
const initialState = {
  name: "",
  email: "",
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SUBMIT_START":
      return { ...state, isLoading: true };
    case "SUBMIT_SUCCESS":
      return { ...state, isLoading: false, name: "", email: "" };
    default:
      return state;
  }
}

function Form() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <form>
      <input
        value={state.name}
        onChange={e => dispatch({ type: "SET_FIELD", field: "name", value: e.target.value })}
      />
      <input
        value={state.email}
        onChange={e => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })}
      />
      <button
        onClick={() => dispatch({ type: "SUBMIT_START" })}
        disabled={state.isLoading}
      >
        Submit
      </button>
    </form>
  );
}
```

✅ All logic lives in one predictable place.
✅ Easier to debug and extend.

---

## 🧩 6. When to Choose `useReducer`

Use `useReducer` when:

* State updates are **complex** or **interdependent**.
* You need **clearer state transition rules**.
* You want to **test or debug** state logic easily.
* You plan to **share** the same logic across components.

Keep `useState` when:

* You have **simple** or **independent** pieces of state.

---

## ⚙️ 7. Bonus: Combining `useReducer` with `useContext`

For **app-wide state** (like Redux but lighter), combine them:

```jsx
const StateContext = createContext();

function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}
```

Now, any component can do:

```jsx
const { state, dispatch } = useContext(StateContext);
```

→ You’ve built a **lightweight global store** with React’s built-ins!

---

## 🧩 8. Common Pitfalls

| Mistake                       | Why It’s Wrong         | Correct Approach                               |
| ----------------------------- | ---------------------- | ---------------------------------------------- |
| Mutating state inside reducer | Breaks immutability    | Always return a new object                     |
| Doing side effects in reducer | Reducers must be pure  | Handle side effects in component or middleware |
| Forgetting default case       | Causes undefined state | Always return `state` by default               |

---

## 🧠 9. Reducer Must Be Pure

> Reducer = pure function
> Same inputs → same outputs, no side effects.

Bad:

```jsx
function reducer(state, action) {
  fetch("/api"); // ❌ Side effect
  return state;
}
```

Good:

```jsx
function reducer(state, action) {
  return { ...state, count: state.count + 1 };
}
```

Side effects (API calls, logging, etc.) should be outside the reducer.

---

## ⚡ 10. TL;DR Summary

| Concept           | `useState`         | `useReducer`              |
| ----------------- | ------------------ | ------------------------- |
| Best for          | Simple local state | Complex, structured logic |
| State updates     | Direct             | Action-based              |
| Code organization | Scattered          | Centralized               |
| Debuggability     | Moderate           | Excellent                 |
| Scalability       | Limited            | Great for growing apps    |

---

### 🧭 Analogy

> `useState` is like manually changing light switches.
>
> `useReducer` is like using a control panel — one central system that handles all the rules.

