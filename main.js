
// ============= Add event listeners =============
let inputButtons = document.querySelectorAll(".button.print");
for (let button of inputButtons) {
    button.addEventListener("click", buttonListerner) //defined
}

let equalButton = document.querySelector(".eval");
equalButton.addEventListener("click", evaluateInput); // **** TODO: partially done

let clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearInput) // defined

let answerButton = document.querySelector(".ans");
answerButton.addEventListener("click", appendPreviousAnswer)

let calcContainer = document.querySelector("body");
calcContainer.addEventListener("keypress", keyboardInteraction);
calcContainer.addEventListener("keydown", allowBackspace);


// Set up variables to control the display
let display = document.querySelector(".display");
let history = []; // will be an array or array pairs: [ [ "input sting", "result"], ...]

let inputArea = document.querySelector(".input");
let inputString = "";

function updateInputArea() {
    inputArea.innerText = inputString;
}

function trimHistory() {
    if (history.length > 3) {
        history.pop();
    }
}

function addToHistory(input, result) {
    if (result != undefined) {
        history.unshift([input, result]);
        trimHistory();
    }
}

function clearDisplayHistory() {
    let displayHistoryElements = document.querySelectorAll(".history");
    // if (displayHistoryElements.length > 0) {
    for (let i = 0; i < displayHistoryElements.length; i++) {
        displayHistoryElements[i].remove();
    }
    // }
}

function createHistoryDisplay() {
    clearDisplayHistory();
    // display.innerHTML = `<p class="input"></p>`;

    let c = 1;
    let historyReversed = history.slice().reverse();
    for (let pair of historyReversed) {
        let oldInput = pair[0];
        let oldAnswer = pair[1];

        let pInput = document.createElement("p");
        let pAnswer = document.createElement("p");
        pInput.innerText = oldInput;
        pAnswer.innerText = oldAnswer + " ⇐"

        pInput.classList.add("history");
        pAnswer.classList.add("history");

        if (c % 2 == 0) {
            pInput.classList.add("even");
            pAnswer.classList.add("even");
        }
        else {
            pInput.classList.add("odd");
            pAnswer.classList.add("odd");
        }

        display.insertBefore(pInput, inputArea);
        display.insertBefore(pAnswer, inputArea);

        c++
    }
}

// ===== Callback functions for eventlisteners ======
function buttonListerner(event) {
    let whichButton = event.target;
    inputString += whichButton.dataset.txt;
    updateInputArea();
}

function clearInput() {
    inputString = "";
    updateInputArea();
}

function evaluateInput(event) {
    let answer = math.evaluate(inputString);
    addToHistory(inputString, answer);

    createHistoryDisplay()
    clearInput();
}

function appendPreviousAnswer() {
    if (history.length == 0) {
        inputString += "";
    }
    inputString += history[0][1];
    updateInputArea();
}

function keyboardInteraction(event) {
    let key = event.key;
    let inputs = ".0123456789/*-+%^)(";

    if (inputs.includes(key)) {
        inputString += key;
        updateInputArea();
    }
    else if (key == "Enter" || key == "=") {
        evaluateInput();
    }
    else if (key == "c") {
        clearInput();
    }
}

function allowBackspace(event) {
    let key = event.key;
    console.log(key);
    if (key == "Backspace" && inputString.length > 0) {
        inputString = inputString.slice(0,inputString.length-1);
        updateInputArea();
    }
}