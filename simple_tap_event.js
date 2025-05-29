
class TapEvent {
    static #contextMap = new Map();

    static on(element, listener) {
        const touchMap = new Map();
        const eventMap = new Map();

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
                    // todo Tap Event
                    alert("aaa")
                }
            }
        };
        const handleTouchCancel = e => {
            for (const touch of e.changedTouches) {
                touchMap.delete(touch.identifier);
            }
        };

        eventMap.set(element, {
            handleTouchStart, handleTouchEnd, handleTouchCancel
        });

        const context = {
            touchMap: new Map(),
            eventMap: new Map()
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
