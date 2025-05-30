
class TapEvent {
    static #contextMap = new Map();

    static on(element, listener) {
        if (typeof listener !== "function") {
            return;
        }
        if (this.#contextMap.has(listener)) {
            return;
        }

        const touchMap = new Map();

        const handleTouchStart = e => {
            for (const touch of e.changedTouches) {
                touchMap.set(touch.identifier, {x: touch.clientX, y: touch.clientY});
            }
        };
        const handleTouchEnd = e => {
            for (const touch of e.changedTouches) {
                const prevTouch = touchMap.get(touch.identifier);
                if (prevTouch === undefined) {
                    continue;
                }
                touchMap.delete(touch.identifier);
                if (prevTouch.x === touch.clientX && prevTouch.y === touch.clientY) {
                    const data = {
                        clientX: touch.clientX,
                        clientY: touch.clientY
                    };
                    listener(data);
                }
            }
        };
        const handleTouchCancel = e => {
            for (const touch of e.changedTouches) {
                touchMap.delete(touch.identifier);
            }
        };

        const context = {
            touchMap: new Map(),
            handleTouchStart, handleTouchEnd, handleTouchCancel
        };
        this.#contextMap.set(listener, context);

        element.addEventListener("touchstart", handleTouchStart);
        element.addEventListener("touchend", handleTouchEnd);
        element.addEventListener("touchcancel", handleTouchCancel);
    }

    static off(element, listener) {
        // todo
    }
};
