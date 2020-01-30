
// ============= Add event listeners =============
let inputButtons = document.querySelectorAll(".button.print");
for (let button of inputButtons) {
    button.addEventListener("click", buttonListerner) //defined
}

let equalButton = document.querySelector(".eval");
equalButton.addEventListener("click", evaluateInput); // **** TODO

let clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearInput) // defined


// Set up variables to control the display
let display = document.querySelector(".display");
let displayHistory = [];

let inputArea = document.querySelector(".input");
let inputString = "";

function trimHistory() {
    if (displayLines.length > 3) {
        displayLines.shift();
    }
}

function pushToHistory(string) {
    displayLines.push(string);
    trimHistory();
}

// ===== Callback functions for eventlisteners ======
function buttonListerner(event) {
    let whichButton = event.target;
    inputString += whichButton.dataset.txt;
    inputArea.innerText = inputString;
    // console.log(whichButton.innerText);
}

function clearInput() {
    inputString = "";
    inputArea.innerText = inputString;
}

function evaluateInput(event) {
    console.log(math.evaluate(inputString));
}