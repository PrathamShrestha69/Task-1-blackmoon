# React Hooks & Redux Documentation

## Table of Contents

1. [React Hooks](#react-hooks)
   - [useState](#usestate)
   - [useEffect](#useeffect)
   - [useMemo](#usememo)
   - [useCallback](#usecallback)
2. [Redux State Management](#redux-state-management)
   - [Redux Basics](#redux-basics)
   - [Redux Provider](#redux-provider)
   - [Cart Slice](#cart-slice)
   - [Redux Hooks](#redux-hooks)
   - [Redux Store](#redux-store)

---

## React Hooks

### useState

**What it does:** Adds state to functional components. When state changes, the component re-renders.

**Syntax:**

```typescript
const [state, setState] = useState(initialValue);
```

**Parameters:**

- `initialValue`: The starting value of the state
- Returns: `[currentState, updateFunction]`

**Example:**

```typescript
const [count, setCount] = useState(0)

const increment = () => setCount(count + 1)
const decrement = () => setCount(count - 1)

return (
  <>
    <p>Count: {count}</p>
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
  </>
)
```

**Key Points:**

- Each call to setState triggers a re-render
- State updates are asynchronous
- Multiple useState calls can be used in one component
- State value is preserved between renders

---

### useEffect

**What it does:** Performs side effects (API calls, subscriptions, DOM updates) after the component renders.

**Syntax:**

```typescript
useEffect(() => {
  // Side effect code
  return () => {
    // Cleanup (optional)
  };
}, [dependencies]);
```

**Parameters:**

- First argument: Function containing the side effect
- Second argument: Dependency array (optional)

**Dependency Array Cases:**

1. **No dependencies** - runs after every render:

```typescript
useEffect(() => {
  console.log("Runs after every render");
});
```

2. **Empty dependencies** - runs only once (on mount):

```typescript
useEffect(() => {
  console.log("Runs only once when component mounts");
}, []);
```

3. **With dependencies** - runs when dependencies change:

```typescript
useEffect(() => {
  console.log("Runs when `count` or `name` changes");
}, [count, name]);
```

**Example with API call:**

```typescript
const [products, setProducts] = useState([]);

useEffect(() => {
  fetch("https://api.example.com/products")
    .then((res) => res.json())
    .then((data) => setProducts(data));
}, []);
```

**Cleanup Function:**

```typescript
useEffect(() => {
  const subscription = onEvent((data) => {
    console.log(data);
  });

  return () => {
    subscription.unsubscribe(); // Cleanup
  };
}, []);
```

**Key Points:**

- Cleanup function runs when component unmounts or before effect runs again
- Always include dependencies to avoid infinite loops
- Side effects should not block rendering (use useEffect instead of putting them in component body)

---

### useMemo

**What it does:** Memoizes (caches) a computed value and only recalculates it when dependencies change. Prevents expensive re-calculations.

**Syntax:**

```typescript
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);
```

**Parameters:**

- First argument: Function that returns the value to memoize
- Second argument: Dependency array

**Example from ShopPage.tsx (filtering products):**

```typescript
const searchQuery = "laptop";
const filteredProducts = useMemo(() => {
  return products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
}, [products, searchQuery]);
```

**Without useMemo:**

```typescript
// This recalculates on every render, even if products/searchQuery haven't changed
const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(searchQuery.toLowerCase()),
);
```

**When to use:**

- Expensive calculations (complex filtering, sorting large arrays)
- Creating objects/arrays that are passed to child components
- Preventing unnecessary prop changes that trigger child re-renders

**Key Points:**

- Don't overuse - adds complexity
- Only optimize if you've identified a performance problem
- Dependency array must include all values used in the calculation

---

### useCallback

**What it does:** Memoizes a function definition. Returns the same function reference across renders unless dependencies change. Prevents unnecessary re-renders of child components.

**Syntax:**

```typescript
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

**Parameters:**

- First argument: Function to memoize
- Second argument: Dependency array

**Example:**

```typescript
const [searchQuery, setSearchQuery] = useState("");

// Without useCallback: new function created on every render
const handleSearch = (query) => {
  setSearchQuery(query);
};

// With useCallback: same function reference unless searchQuery changes
const handleSearch = useCallback((query) => {
  setSearchQuery(query);
}, []);
```

**Why it matters for child components:**

```typescript
// Parent
const handleAddToCart = useCallback(() => {
  dispatch(addToCart(product))
}, [product])

// Child receives same function reference, won't re-render unnecessarily
<ShopCard onAddToCart={handleAddToCart} />
```

**Key Points:**

- Dependency array determines when a new function is created
- Include all external values used inside the function
- Most useful when passing callbacks to memoized child components
- Don't use for every function - only optimize where needed

---

## Redux State Management

### Redux Basics

**What is Redux?** A predictable state container for JavaScript applications. Provides a single source of truth for app state and makes state changes traceable and debuggable.

**Core Problem it solves:**

- In large apps, state gets passed through many components (prop drilling)
- Hard to track where state changes happen
- Redux provides a centralized state store

**Core Concepts:**

1. **Store**: Single object containing entire app state

   ```typescript
   { cart: { items: [...], totalPrice: 0 } }
   ```

2. **Action**: Plain object describing what happened

   ```typescript
   { type: 'addToCart', payload: { id: 1, title: '...', price: 109.95 } }
   ```

3. **Reducer**: Pure function taking current state + action, returning new state

   ```typescript
   (state, action) => newState;
   ```

4. **Dispatch**: Function that sends actions to the store
   ```typescript
   dispatch(addToCart({ id: 1, title: "...", price: 109.95 }));
   ```

**State Flow:**

```
Component dispatches action
         ↓
Redux calls reducer with action
         ↓
Reducer returns new state
         ↓
Store updates and notifies subscribers
         ↓
Components using useSelector re-render with new state
```

---

### Redux Provider

**Location:** `src/store/ReduxProvider.tsx`

**What it does:** Wraps the entire app with Redux Provider, making the Redux store accessible to all components.

**Code:**

```typescript
'use client'

import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { ReactNode } from 'react'

export function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}
```

**Usage in layout.tsx:**

```typescript
import { ReduxProvider } from "@/store/ReduxProvider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
```

**Why it's needed:**

- Makes Redux store available to all child components via Context API
- All Redux hooks (useSelector, useDispatch) depend on this Provider
- Should wrap the entire app at the root level

---

### Cart Slice

**Location:** `src/store/cartSlice.ts`

**What it does:** Defines the cart state shape, initial state, and all reducers (actions) for cart operations.

**Redux Toolkit `createSlice`:**

```typescript
createSlice({
  name: "cart", // Namespace for actions
  initialState, // Starting state
  reducers: {
    actionName: (state, action) => {
      // Update state immutably (Immer handles it)
    },
  },
});
```

**Cart State Structure:**

```typescript
type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  totalPrice: number;
};
```

**Cart Actions (Reducers):**

1. **addToCart**: Adds product to cart or increases quantity if already exists

```typescript
dispatch(
  addToCart({
    id: 1,
    title: "Backpack",
    price: 109.95,
    image: "https://...",
  }),
);
```

2. **removeFromCart**: Removes item by id

```typescript
dispatch(removeFromCart(1));
```

3. **updateQuantity**: Changes quantity of an item

```typescript
dispatch(updateQuantity({ id: 1, quantity: 3 }));
```

4. **clearCart**: Empties entire cart

```typescript
dispatch(clearCart());
```

**Special Feature - localStorage Persistence:**

```typescript
// When an action runs, it saves state to localStorage
localStorage.setItem("cart", JSON.stringify(state));

// On initial load, it restores from localStorage
const getInitialState = (): CartState => {
  if (typeof window !== "undefined") {
    try {
      const savedState = localStorage.getItem("cart");
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }
  return initialState;
};
```

**Why localStorage?** Persists cart state across browser refreshes and page navigations.

---

### Redux Hooks

**Location:** `src/store/hooks.ts`

**What they do:** Typed versions of Redux hooks for better TypeScript support.

**Code:**

```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

**useAppDispatch:**
Dispatch actions to the store.

```typescript
const dispatch = useAppDispatch();

dispatch(
  addToCart({
    id: 1,
    title: "Backpack",
    price: 109.95,
    image: "...",
  }),
);
```

**useAppSelector:**
Read state from the store. Subscribes to state changes and re-renders when selected state changes.

```typescript
const cartItems = useAppSelector((state) => state.cart.items);
const totalPrice = useAppSelector((state) => state.cart.totalPrice);
```

**TypeScript Benefits:**

- `useAppDispatch` knows all available actions
- `useAppSelector` knows the entire state shape
- IDE autocomplete for state paths
- Type safety - catches errors at compile time

**Example in ShopCard.tsx:**

```typescript
import { useAppDispatch } from '@/store/hooks'
import { addToCart } from '@/store/cartSlice'

export default function ShopCard({ id, title, price, image }) {
  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, image }))
  }

  return <button onClick={handleAddToCart}>Add to Cart</button>
}
```

**Example in cart/page.tsx:**

```typescript
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { removeFromCart, updateQuantity } from '@/store/cartSlice'

export default function CartPage() {
  const dispatch = useAppDispatch()
  const cartItems = useAppSelector((state) => state.cart.items)
  const totalPrice = useAppSelector((state) => state.cart.totalPrice)

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id))
  }

  const handleIncreaseQuantity = (id: number, currentQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }))
  }

  return (
    <>
      <h1>Shopping Cart</h1>
      {cartItems.map(item => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleIncreaseQuantity(item.id, item.quantity)}>+</button>
          <button onClick={() => handleRemove(item.id)}>Remove</button>
        </div>
      ))}
      <h2>Total: ${totalPrice}</h2>
    </>
  )
}
```

---

### Redux Store

**Location:** `src/store/store.ts`

**What it does:** Configures and creates the Redux store with all reducers.

**Code:**

```typescript
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**configureStore (Redux Toolkit):**

- Automatically sets up middleware (thunk, logger, etc.)
- Uses Immer for immutable state updates
- Normalizes action/reducer setup
- Enables Redux DevTools for debugging

**Exported Types:**

1. **RootState**: TypeScript type for entire state

```typescript
type RootState = {
  cart: {
    items: CartItem[];
    totalPrice: number;
  };
};
```

2. **AppDispatch**: TypeScript type for dispatch function

```typescript
type AppDispatch = typeof store.dispatch;
```

**Adding new features:** To add more state slices (e.g., products, auth):

```typescript
import productReducer from "./productSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    auth: authReducer,
  },
});
```

---

## Complete Flow Example

### Adding Item to Cart

**1. User clicks "Add to Cart" in ShopCard component:**

```typescript
const handleAddToCart = () => {
  dispatch(
    addToCart({
      id: 1,
      title: "Fjallraven Backpack",
      price: 109.95,
      image: "https://...",
    }),
  );
};
```

**2. Redux calls the addToCart reducer:**

```typescript
addToCart: (state, action) => {
  const existingItem = state.items.find(
    (item) => item.id === action.payload.id,
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.items.push({ ...action.payload, quantity: 1 });
  }

  state.totalPrice = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // Save to localStorage
  localStorage.setItem("cart", JSON.stringify(state));
};
```

**3. Store updates, notifies all subscribers**

**4. Cart page component re-renders with new state:**

```typescript
const cartItems = useAppSelector((state) => state.cart.items);
// Now includes the newly added item
```

**5. User navigates away, closes tab, browser refreshes:**

- State persists in localStorage
- When Redux initializes again, it loads from localStorage
- Cart items are still there!

---

## Best Practices

### React Hooks

- ✅ Keep hooks at the top level of components
- ✅ Use dependency arrays correctly in useEffect/useMemo/useCallback
- ✅ Only use useMemo/useCallback when you've identified performance issues
- ❌ Don't call hooks inside loops, conditions, or nested functions

### Redux

- ✅ Keep reducers pure (no side effects, same input = same output)
- ✅ Use Redux Toolkit's createSlice for cleaner code
- ✅ Use TypeScript types from store (RootState, AppDispatch)
- ✅ Keep state flat and normalized when possible
- ❌ Don't mutate state directly (Redux Toolkit/Immer handles this)
- ❌ Don't put API calls directly in reducers (use middleware like thunk)

### Cart Persistence

- ✅ localStorage for client-side persistence
- ✅ Check for `typeof window !== 'undefined'` before accessing browser APIs
- ✅ Handle localStorage errors gracefully
- ❌ Don't use localStorage for sensitive data (use secure cookies)

---

## Debugging Tips

**React DevTools:**

- Install React DevTools browser extension
- Inspect component state with hooks
- See which components re-render

**Redux DevTools:**

- Install Redux DevTools extension
- See every action dispatched
- Time-travel through state changes
- Replay actions

**Console Logging:**

```typescript
// In reducer
console.log("Reducer called with:", action.payload);
console.log("New state:", state);

// In component
console.log("Selected state:", cartItems);
```

**localStorage Debugging:**

```typescript
// In browser console
localStorage.getItem("cart"); // View cart state
localStorage.removeItem("cart"); // Clear cart
JSON.parse(localStorage.getItem("cart")); // Parse and view nicely
```

---

## Resources

- [React Hooks Documentation](https://react.dev/reference/react)
- [Redux Official Docs](https://redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React-Redux](https://react-redux.js.org/)
