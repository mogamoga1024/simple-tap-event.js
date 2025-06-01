
const elA = document.querySelector("#a");
const elB = document.querySelector("#b");
const elLink = document.querySelector("#link");

const elClientX = document.querySelector("#client-x");
const elClientY = document.querySelector("#client-y");
function drawPoint(points) {
    elClientX.innerText = points[0].clientX;
    elClientY.innerText = points[0].clientY;
}

const elStopPropagation = document.querySelector("#stop-propagation");
const elPreventDefault = document.querySelector("#prevent-default");
function controlEvent(event) {
    if (elStopPropagation.checked) {
        event.stopPropagation();
    }
    if (elPreventDefault.checked) {
        event.preventDefault();
    }
}

const lisA = (points, event) => {
    drawPoint(points);
    controlEvent(event)
    alert("A");
};
const lisB = (points, event) => {
    drawPoint(points);
    controlEvent(event)
    alert("B");
};
const lisLink = (points, event) => {
    drawPoint(points);
    controlEvent(event)
    alert("Link");
};

TapEvent.on(elA, lisA);
TapEvent.on(elB, lisB);
TapEvent.on(elLink, lisLink);
