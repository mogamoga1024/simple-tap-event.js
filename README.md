# 📚 TapEvent API Reference

A lightweight utility to detect tap gestures on touch devices.  
It simulates a "tap" by checking whether a finger touches down and lifts up without moving.

> [!WARNING]
> Only works on **touch-enabled** devices.  
> Will not trigger on mouse click or pointer events.

---

## 🔹 `TapEvent.on(element, listener)`

Registers a tap event listener on a given DOM element.

### Parameters

- `element` (`HTMLElement`)  
  The target element to observe taps on.

- `listener(points, helpers)` (`function`)  
  A callback function invoked when a valid tap occurs.  
  - `points`: An array of tap points:
    ```js
    [
      { clientX: Number, clientY: Number },
      ...
    ]
    ```
  - `helpers`: Utility functions:
    ```js
    {
      preventDefault: Function,
      stopPropagation: Function
    }
    ```

### Example

```js
TapEvent.on(button, (points, { preventDefault, stopPropagation }) => {
  preventDefault();
  console.log("Tapped at", points);
});
```

---

## 🔹 `TapEvent.off(element[, listener])`

Removes previously registered tap listeners from the element.

### Parameters

- `element` (`HTMLElement`)  
  The target element to remove listeners from.

- `listener` (`function`, optional)  
  If provided, removes that specific listener only.  
  If omitted, **removes all listeners** registered on the element.

---

## 🔹 `TapEvent.destroy()`

Unbinds **all tap listeners** from all registered elements.  
Use this to clean up globally.

---

## 🧠 Internals

- Touch coordinates are tracked with `touchstart` and compared at `touchend`.
- Only exact position matches are considered valid taps (no movement).
- Listeners are stored in a `WeakMap`, so memory is managed efficiently.

---

## ✅ Good to Know

- You can call `preventDefault()` and `stopPropagation()` from inside the listener using provided helpers.
- The `this` context inside the listener refers to the tapped element.

---
