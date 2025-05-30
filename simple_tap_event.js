
(function() {
    class TapEvent {
        static on(element, listener) {
            if (typeof listener !== "function") {
                return;
            }
            if (hasContext(element, listener)) {
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
                        listener.call(element, data);
                    }
                }
            };
            const handleTouchCancel = e => {
                for (const touch of e.changedTouches) {
                    touchMap.delete(touch.identifier);
                }
            };

            const context = {
                handleTouchStart, handleTouchEnd, handleTouchCancel
            };
            setContext(element, listener, context);

            element.addEventListener("touchstart", handleTouchStart);
            element.addEventListener("touchend", handleTouchEnd);
            element.addEventListener("touchcancel", handleTouchCancel);
        }

        static off(element, listener) {
            if (listener === undefined) {
                if (!contextMap.has(element)) {
                    return;
                }
                for (const listener of contextMap.get(element).keys()) {
                    TapEvent.off(element, listener);
                }
                return;
            }

            if (!hasContext(element, listener)) {
                return;
            }

            const listenerContextMap = contextMap.get(element);

            const {handleTouchStart, handleTouchEnd, handleTouchCancel} = listenerContextMap.get(listener);
            element.removeEventListener("touchstart", handleTouchStart);
            element.removeEventListener("touchend", handleTouchEnd);
            element.removeEventListener("touchcancel", handleTouchCancel);

            listenerContextMap.delete(listener);
            if (listenerContextMap.size === 0) {
                contextMap.delete(element);
            }
        }

        static destroy() {
            for (const element of contextMap.keys()) {
                TapEvent.off(element);
            }
        }
    }

    const contextMap = new WeakMap();
    function setContext(element, listener, context) {
        if (!contextMap.has(element)) {
            contextMap.set(element, new Map());
        }
        contextMap.get(element).set(listener, context);
    }
    function getContext(element, listener) {
        return contextMap.get(element)?.get(listener);
    }
    function hasContext(element, listener) {
        return contextMap.has(element) && contextMap.get(element).has(listener);
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = TapEvent;
    }
    else if (typeof window !== 'undefined') {
        window.TapEvent = TapEvent;
    }
})();
