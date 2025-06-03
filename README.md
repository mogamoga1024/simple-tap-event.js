# simple-tap-event.js

A lightweight and simple JavaScript library for easily handling tap events on touch devices.

---

## Installation

### npm

```bash
npm install simple-tap-event.js
```

```js
import TapEvent from "simple-tap-event.js";
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@mogamoga1024/simple-tap-event@latest/simple_tap_event.min.js"></script>
```

---

## Basic Usage

```html
<button id="my-button">Tap me</button>

<script>
  const btn = document.getElementById("my-button");

  TapEvent.on(btn, (points) => {
    console.log("Tapped!", points);
  });
</script>
```

---

## Demo

[Live Demo](https://mogamoga1024.github.io/simple-tap-event.js/sample/sample.html)

---

## API

### TapEvent.on(element, listener, maxDistance?)

Adds a tap event listener to the specified element.

- `element`: The target DOM element  
- `listener`: A function that is called on tap  
  It receives the following two arguments:

  ```js
  (points, eventUtils) => { ... }
  ```

  - `points`: An array of tap position objects (supports multi-touch)  
    Example:
    ```js
    [
      { clientX: 120, clientY: 300 },
      { clientX: 130, clientY: 310 }
    ]
    ```

  - `eventUtils`: An object to control the touch event  
    ```js
    {
      preventDefault: Function,     // Equivalent to Event.preventDefault()
      stopPropagation: Function     // Equivalent to Event.stopPropagation()
    }
    ```

- `maxDistance` (optional): Allowed movement distance (in pixels).  
  If omitted, `TapEvent.maxDistance` is used (default: `0`).

---

### `TapEvent.off(element, listener?)`

Removes tap events.

- If `listener` is omitted, all listeners for the element are removed.

---

### `TapEvent.destroy()`

Removes all registered tap events.

---

### `TapEvent.maxDistance`

Sets a global maximum movement distance (in pixels).  
Used when `maxDistance` is not specified in `TapEvent.on`.  
Default is `0`.

```js
TapEvent.maxDistance = 15;
```

---

## License

MIT or WTFPL
