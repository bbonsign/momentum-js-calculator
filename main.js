
// create main html elements

let buttons = document.querySelectorAll(".button");

for (let button of buttons) {
    button.addEventListener("click", buttonListerner)
}

let disp = document.querySelector(".display");

function buttonListerner (event){
    let whichButton = event.target;
    disp.innerText += whichButton.innerText
    // console.log(whichButton.innerText);
}