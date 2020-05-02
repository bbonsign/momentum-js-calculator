
// ============= Add event listeners =============
const inputButtons = document.querySelectorAll('.button.print')
for (const button of inputButtons) {
  button.addEventListener('click', buttonListerner) // defined
}

const equalButton = document.querySelector('.eval')
equalButton.addEventListener('click', evaluateInput) // **** TODO: partially done

const clearButton = document.querySelector('.clear')
clearButton.addEventListener('click', clearInput) // defined

const answerButton = document.querySelector('.ans')
answerButton.addEventListener('click', appendPreviousAnswer)

const calcContainer = document.querySelector('body')
calcContainer.addEventListener('keypress', keyboardInteraction)
calcContainer.addEventListener('keydown', allowBackspace)

// Set up variables to control the display
const display = document.querySelector('.display')
const history = [] // will be an array or array pairs: [ [ "input sting", "result"], ...]

const inputArea = document.querySelector('.input')
let inputString = ''

function updateInputArea () {
  inputArea.innerText = inputString
}

function trimHistory () {
  if (history.length > 3) {
    history.pop()
  }
}

function addToHistory (input, result) {
  if (result !== undefined) {
    history.unshift([input, result])
    trimHistory()
  }
}

function clearDisplayHistory () {
  const displayHistoryElements = document.querySelectorAll('.history')
  // if (displayHistoryElements.length > 0) {
  for (let i = 0; i < displayHistoryElements.length; i++) {
    displayHistoryElements[i].remove()
  }
  // }
}

function createHistoryDisplay () {
  clearDisplayHistory()
  // display.innerHTML = `<p class="input"></p>`;

  let c = 1
  const historyReversed = history.slice().reverse()
  for (const pair of historyReversed) {
    const oldInput = pair[0]
    const oldAnswer = pair[1]

    const pInput = document.createElement('p')
    const pAnswer = document.createElement('p')
    pInput.innerText = oldInput
    pAnswer.innerText = oldAnswer + ' ⇐'

    pInput.classList.add('history')
    pAnswer.classList.add('history')

    if (c % 2 === 0) {
      pInput.classList.add('even')
      pAnswer.classList.add('even')
    } else {
      pInput.classList.add('odd')
      pAnswer.classList.add('odd')
    }

    display.insertBefore(pInput, inputArea)
    display.insertBefore(pAnswer, inputArea)

    c++
  }
}

// ===== Callback functions for eventlisteners ======
function buttonListerner (event) {
  const whichButton = event.target
  inputString += whichButton.dataset.txt
  updateInputArea()
}

function clearInput () {
  inputString = ''
  updateInputArea()
}

function evaluateInput (event) {
  const answer = math.evaluate(inputString)
  addToHistory(inputString, answer)

  createHistoryDisplay()
  clearInput()
}

function appendPreviousAnswer () {
  if (history.length === 0) {
    inputString += ''
  }
  inputString += history[0][1]
  updateInputArea()
}

function keyboardInteraction (event) {
  const key = event.key
  const inputs = '.0123456789/*-+%^)('

  if (inputs.includes(key)) {
    inputString += key
    updateInputArea()
  } else if (key === 'Enter' || key === '=') {
    evaluateInput()
  } else if (key === 'c') {
    clearInput()
  }
}

function allowBackspace (event) {
  const key = event.key
  if (key === 'Backspace' && inputString.length > 0) {
    inputString = inputString.slice(0, inputString.length - 1)
    updateInputArea()
  }
}
