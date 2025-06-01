
const elA = document.querySelector("#a");
const elB = document.querySelector("#b");
const elLink = document.querySelector("#link");

const elClientX = document.querySelector("#client-x");
const elClientY = document.querySelector("#client-y");
function drawPoint(points) {
    elClientX.innerText = points[0].clientX;
    elClientY.innerText = points[0].clientY;
}

const lisA = (points, event) => {
    drawPoint(points);
    alert("A");
};
const lisB = (points, event) => {
    event.stopPropagation();
    drawPoint(points);
    alert("B");
};
const lisLink = (points, event) => {
    event.preventDefault();
    drawPoint(points);
    alert("Link");
};

TapEvent.on(elA, lisA);
TapEvent.on(elB, lisB);
TapEvent.on(elLink, lisLink);
