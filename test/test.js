
const a = document.querySelector("#a");
const b = document.querySelector("#b");

const la = () => {
    alert("A");
};
const lb = () => {
    alert("B");
};

TapEvent.on(a, la);
TapEvent.on(b, lb);

// ---

const link = document.querySelector("#link");
TapEvent.on(link, () => {
    console.log("hogehoge");
});
