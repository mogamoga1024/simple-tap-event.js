
const a = document.querySelector("#a");
const b = document.querySelector("#b");

const la = (points, event) => {
    alert("A");
};
const lb = (points, event) => {
    event.stopPropagation();
    alert("B");
};

TapEvent.on(a, la);
TapEvent.on(b, lb);

// ---

const link = document.querySelector("#link");
TapEvent.on(link, (points, event) => {
    event.preventDefault();
    console.log("hogehoge");
});
