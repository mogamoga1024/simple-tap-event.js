# simple-tap-event.js

タッチデバイスでのタップイベントを簡単に扱うための、軽量かつシンプルな JavaScript ライブラリです。

---

## インストール

### npm

```bash
npm install simple-tap-event.js
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@mogamoga1024/simple-tap-event@latest/simple_tap_event.min.js"></script>
```

---

## 使い方

### 基本的な使い方（グローバル距離設定）

```html
<button id="my-button">Tap me</button>

<script type="module">
  import TapEvent from "simple-tap-event.js";

  TapEvent.maxDistance = 10; // ピクセル距離（オプション）

  const btn = document.getElementById("my-button");

  TapEvent.on(btn, (points, e) => {
    console.log("タップされた！", points);
    e.preventDefault();
  });
</script>
```

### 個別に距離を設定する

```js
TapEvent.on(btn, (points) => {
  console.log("個別距離設定でのタップ", points);
}, 5); // このリスナーだけ maxDistance = 5 にする
```

---

## サンプルデモ

[サンプル](https://mogamoga1024.github.io/simple-tap-event.js/sample/sample.html)

---

## API

### TapEvent.on(element, listener, maxDistance?)

指定した要素にタップイベントを追加します。

- `element`: 対象の DOM 要素  
- `listener`: タップ時に呼び出される関数  
  引数として以下の 2 つが渡されます：

  ```js
  (points, eventUtils) => { ... }
  ```

  - `points`: タップされた位置情報の配列（複数指対応）  
    例：
    ```js
    [
      { clientX: 120, clientY: 300 },
      { clientX: 130, clientY: 310 }
    ]
    ```

  - `eventUtils`: タッチイベントの制御用オブジェクト  
    ```js
    {
      preventDefault: Function,     // e.preventDefault() 相当
      stopPropagation: Function     // e.stopPropagation() 相当
    }
    ```

- `maxDistance` (optional): 許容される移動距離（px）。省略時は `TapEvent.maxDistance` の値を使用

### `TapEvent.off(element, listener?)`

イベントを解除します。

- `listener` を省略すると、対象要素に登録されたすべてのリスナーが削除されます。

### `TapEvent.destroy()`

すべてのイベントを解除します。

### `TapEvent.maxDistance`

グローバルな最大距離（ピクセル）を設定できます。

```js
TapEvent.maxDistance = 15;
```

---

## 📄 ライセンス

MIT or WTFLP
