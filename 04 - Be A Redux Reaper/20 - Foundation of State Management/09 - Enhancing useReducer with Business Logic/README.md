# ⚙️ Enhancing `useReducer` with Business Logic

---

## 🧩 1. The Core Principle: “Reducers Should Stay Pure”

A **reducer** is meant to be **pure** — no side effects, no async calls, no random logic that changes behavior unpredictably.

```jsx
function reducer(state, action) {
  // ❌ Avoid: async, fetch, localStorage, etc.
  // ✅ Do: compute new state deterministically
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}
```

But…
real-world business logic *isn’t always that simple*.
We often need validation, derived data, and controlled workflows.

So how do we handle that while keeping reducers predictable?

---

## 🧠 2. Strategy 1 — Keep Reducer Pure, Add Logic *Around* It

Let’s say you’re building a **shopping cart**.

### 🎯 Goal

* Validate items before adding
* Update total price
* Prevent negative quantities

---

### 🧾 Reducer (pure logic)

```jsx
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const existing = state.items.find(i => i.id === action.item.id);
      const updatedItems = existing
        ? state.items.map(i =>
            i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
          )
        : [...state.items, { ...action.item, qty: 1 }];

      const total = updatedItems.reduce(
        (sum, i) => sum + i.price * i.qty,
        0
      );

      return { ...state, items: updatedItems, total };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.id),
      };

    default:
      return state;
  }
}
```

✅ Still pure — all logic depends only on `state` and `action`.

---

### 🧠 Business Logic Wrapper

Keep real-world rules **outside** and dispatch valid actions:

```jsx
function Cart() {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addItem = (item) => {
    if (item.stock <= 0) {
      alert("Out of stock");
      return;
    }
    dispatch({ type: "ADD_ITEM", item });
  };

  return (
    <div>
      <h2>Total: ${state.total}</h2>
      <button onClick={() => addItem({ id: 1, name: "Laptop", price: 1000, stock: 5 })}>
        Add Laptop
      </button>
    </div>
  );
}
```

✅ The reducer focuses on *state transitions*
✅ The component handles *business rules* (validation, notifications, async logic)

---

## ⚙️ 3. Strategy 2 — Use Action Creators for Business Logic

When business logic grows complex, move it into **action creators** — reusable functions that wrap `dispatch`.

### Example:

```jsx
function addItem(dispatch, item) {
  if (!item || item.stock <= 0) return alert("Out of stock");
  dispatch({ type: "ADD_ITEM", item });
}

function removeItem(dispatch, id) {
  dispatch({ type: "REMOVE_ITEM", id });
}
```

Usage:

```jsx
addItem(dispatch, { id: 2, name: "Mouse", price: 20, stock: 10 });
```

✅ Keeps UI clean
✅ Keeps reducer pure
✅ Business rules live in reusable “middleware-like” functions

---

## 🧬 4. Strategy 3 — Derived State Inside Reducer (Computed Fields)

Sometimes business logic *belongs* inside the reducer,
especially when it’s deterministic — i.e. no side effects.

### Example: Auto-calculate totals

```jsx
case "UPDATE_QUANTITY": {
  const updatedItems = state.items.map(i =>
    i.id === action.id ? { ...i, qty: action.qty } : i
  );
  const total = updatedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  return { ...state, items: updatedItems, total };
}
```

✅ Derived state like totals, averages, or progress belongs in the reducer.
❌ Don’t fetch data or trigger notifications there.

---

## 🧠 5. Strategy 4 — Async Logic: Side Effects in Dispatchers

Reducers must stay pure, so async behavior goes **outside**.
You can create async dispatchers (often called *thunks*).

### Example: Handling API in `useReducer`

```jsx
function dataReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.data };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

function useFetchData(url) {
  const [state, dispatch] = useReducer(dataReducer, {
    loading: false,
    data: null,
    error: null,
  });

  async function fetchData() {
    dispatch({ type: "FETCH_START" });
    try {
      const res = await fetch(url);
      const data = await res.json();
      dispatch({ type: "FETCH_SUCCESS", data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", error: err.message });
    }
  }

  return [state, fetchData];
}
```

✅ Reducer = pure
✅ Business logic (API + error handling) = handled outside

Usage:

```jsx
const [state, fetchData] = useFetchData("/api/users");
```

---

## 🧩 6. Strategy 5 — Encapsulate Logic in Custom Hooks

You can combine reducers, business logic, and side effects into a reusable custom hook.

```jsx
function useCart() {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addItem = (item) => {
    if (item.stock <= 0) return alert("Out of stock");
    dispatch({ type: "ADD_ITEM", item });
  };

  const checkout = async () => {
    try {
      await fetch("/api/checkout", { method: "POST", body: JSON.stringify(state.items) });
      alert("Checkout successful");
      dispatch({ type: "CLEAR_CART" });
    } catch {
      alert("Checkout failed");
    }
  };

  return { ...state, addItem, checkout };
}
```

Usage:

```jsx
const { items, total, addItem, checkout } = useCart();
```

✅ Combines reducer + business logic
✅ Clean, reusable, and testable

---

## ⚙️ 7. Strategy 6 — Middleware-Like Reducer Enhancers

For complex systems (e.g. logging, analytics, error tracking),
you can wrap `dispatch` itself to intercept actions.

```jsx
function useEnhancedReducer(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = (action) => {
    console.log("Dispatching:", action);
    dispatch(action);
  };

  return [state, enhancedDispatch];
}
```

Now every action goes through your “middleware” first.
✅ Great for debugging and enforcing business rules globally.

---

## 🧠 8. Where Business Logic *Belongs*

| Type of Logic                     | Where It Should Live            |
| --------------------------------- | ------------------------------- |
| Pure state transitions            | Reducer                         |
| Validation                        | Component or action creator     |
| Async data fetching               | Custom hook or dispatcher       |
| Derived/computed values           | Reducer                         |
| Global rules (logging, analytics) | Enhanced dispatch or middleware |

---

## 🧭 9. Analogy

Think of `useReducer` like a **state machine**:

* The **reducer** defines *what happens when an event occurs*.
* The **business logic layer** decides *when to fire which event*.

> “Reducers are the *engine*, business logic is the *driver*.”

---

## ⚡ TL;DR

| Concept            | Good Practice                           |
| ------------------ | --------------------------------------- |
| Reducer purity     | No async, no side effects               |
| Derived state      | Compute inside reducer                  |
| Async & validation | Keep outside reducer                    |
| Shared logic       | Move to custom hooks or action creators |
| Complex systems    | Add middleware / enhanced dispatch      |
