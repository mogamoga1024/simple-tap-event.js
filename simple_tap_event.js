
(function() {
    class TapEvent {
        static #maxDistance = 0;
        static set maxDistance(val) {
            this.#maxDistance = Number(val);
        }
        static get maxDistance() {
            return this.#maxDistance;
        }

        static on(element, listener, maxDistance) {
            if (typeof listener !== "function") {
                return;
            }
            if (hasContext(element, listener)) {
                return;
            }

            let getMaxDistance = undefined;
            if (maxDistance === undefined) {
                getMaxDistance = () => this.#maxDistance;
            }
            else {
                const rtnMaxDistance = Number(maxDistance);
                getMaxDistance = () => rtnMaxDistance;
            }

            const touchMap = new Map();

            const handleTouchStart = e => {
                for (const touch of e.changedTouches) {
                    touchMap.set(touch.identifier, {x: touch.clientX, y: touch.clientY});
                }
            };
            const handleTouchEnd = e => {
                const points = [];
                for (const touch of e.changedTouches) {
                    const prevTouch = touchMap.get(touch.identifier);
                    if (prevTouch === undefined) {
                        continue;
                    }
                    touchMap.delete(touch.identifier);
                    const distanceSquared = (prevTouch.x - touch.clientX) ** 2 + (prevTouch.y - touch.clientY) ** 2;
                    if (distanceSquared <= getMaxDistance() ** 2) {
                        points.push({
                            clientX: touch.clientX,
                            clientY: touch.clientY
                        });
                    }
                }
                if (points.length > 0) {
                    listener.call(element, points, {
                        preventDefault: e.preventDefault.bind(e),
                        stopPropagation: e.stopPropagation.bind(e)
                    });
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
                elementSet.delete(element);
            }
        }

        static destroy() {
            for (const element of elementSet) {
                TapEvent.off(element);
            }
            elementSet.clear();
        }
    }

    const contextMap = new WeakMap();
    const elementSet = new Set();
    function setContext(element, listener, context) {
        if (!contextMap.has(element)) {
            contextMap.set(element, new Map());
            elementSet.add(element);
        }
        contextMap.get(element).set(listener, context);
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
