
class TapEvent {
    static #touchMap = new Map();
    static #eventMap = new Map();

    static add(element, listener) {
        const handleTouchStart = e => {
            for (const touch of e.changedTouches) {
                this.#touchMap.set(touch.identifier, {x: touch.clientX, y: touch.clientY});
            }
        };
        const handleTouchEnd = e => {
            for (const touch of e.changedTouches) {
                const prevTouch = this.#touchMap.get(touch.identifier);
                if (prevTouch === undefined) {
                    continue;
                }
                this.#touchMap.delete(touch.identifier);
                if (prevTouch.x === touch.clientX && prevTouch.y === touch.clientY) {
                    // todo Tap Event
                }
            }
        };
        const handleTouchCancel = e => {
            for (const touch of e.changedTouches) {
                this.#touchMap.delete(touch.identifier);
            }
        };

        this.#eventMap.set(element, {
            handleTouchStart, handleTouchEnd, handleTouchCancel
        });

        element.addEventListener("touchstart", handleTouchStart);
        element.addEventListener("touchend", handleTouchEnd);
        element.addEventListener("touchcancel", handleTouchCancel);
    }

    static remove(element, listener) {
        // todo
    }
};
