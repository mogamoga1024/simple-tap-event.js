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

## Sample Demo

[Sample](https://mogamoga1024.github.io/simple-tap-event.js/sample/sample.html)

---

## API

### TapEvent.on(element, listener, maxDistance?)

Adds a tap event to the specified element.

- `element`: Target DOM element  
- `listener`: Function called on tap  
  Receives the following two arguments:

  ```js
  (points, eventUtils) => { ... }
  ```

  - `points`: Array of tap position data (supports multi-touch)  
    Example:
    ```js
    [
      { clientX: 120, clientY: 300 },
      { clientX: 130, clientY: 310 }
    ]
    ```

  - `eventUtils`: Utility object for controlling the touch event  
    ```js
    {
      preventDefault: Function,     // Equivalent to Event.preventDefault()
      stopPropagation: Function     // Equivalent to Event.stopPropagation()
    }
    ```

- `maxDistance` (optional): Allowed movement distance in pixels.  
  If omitted, the value of `TapEvent.maxDistance` is used.

### `TapEvent.off(element, listener?)`

Removes tap event(s).

- If `listener` is omitted, all listeners registered to the target element are removed.

### `TapEvent.destroy()`

Removes all tap events.

### `TapEvent.maxDistance`

Sets the global maximum movement distance in pixels.

```js
TapEvent.maxDistance = 15;
```

---

## License

MIT or WTFPL
