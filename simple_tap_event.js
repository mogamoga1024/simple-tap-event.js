
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
                        element.dispatchEvent(new CustomEvent("tap", {
                            detail: {
                                clientX: touch.clientX,
                                clientY: touch.clientY
                            }
                        }));
                    }
                }
            };
            const handleTouchCancel = e => {
                for (const touch of e.changedTouches) {
                    touchMap.delete(touch.identifier);
                }
            };
            const handleTap = e => {
                listener.call(element, e.detail);
            };

            const context = {
                handleTouchStart, handleTouchEnd, handleTouchCancel, handleTap
            };
            setContext(element, listener, context);

            element.addEventListener("touchstart", handleTouchStart);
            element.addEventListener("touchend", handleTouchEnd);
            element.addEventListener("touchcancel", handleTouchCancel);
            element.addEventListener("tap", handleTap);
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

            const {handleTouchStart, handleTouchEnd, handleTouchCancel, handleTap} = listenerContextMap.get(listener);
            element.removeEventListener("touchstart", handleTouchStart);
            element.removeEventListener("touchend", handleTouchEnd);
            element.removeEventListener("touchcancel", handleTouchCancel);
            element.removeEventListener("tap", handleTap);

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
