
// ============= Add event listeners =============
let inputButtons = document.querySelectorAll(".button.print");
for (let button of buttons) {
    button.addEventListener("click", buttonListerner) //defined
}

let equalButton = document.querySelector(".eval");
equals.addEventListener("click", evaluateInput); // **** TODO

let clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearInput) // defined


// Set up variables to control the display
let display = document.querySelector(".display");
let displayHistory = [];
let inputArea = document.querySelector(".input");
let inputString = inputArea.innerText;

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
    inputString += whichButton.innerText
    // console.log(whichButton.innerText);
}

function clearInput(event) {
    inputString = ""
}

function