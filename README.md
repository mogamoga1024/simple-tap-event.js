# simple-tap-event.js
wip

## 📚 TapEvent API Reference

### `TapEvent.on(element, listener)`

Registers a **tap event** on the specified element.

#### Parameters

- `element` (`HTMLElement`)  
  The element to listen for tap events on.

- `listener` (`function`)  
  A callback function that will be triggered on tap.  
  It receives an object with the following structure:

  ```js
  {
    clientX: Number,
    clientY: Number
  }
  ```

---

### `TapEvent.off(element[, listener])`

Removes a previously registered tap event listener from the specified element.

#### Parameters

- `element` (`HTMLElement`)  
  The element to remove the listener from.

- `listener` (`function`, *optional*)  
  The listener function to remove.  
  If omitted, **all listeners registered on the element will be removed**.

---

### `TapEvent.destroy()`

Removes all tap event listeners from all elements.

