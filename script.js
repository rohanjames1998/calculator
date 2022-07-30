/*--------------------------------------*/
// DISPLAY/BUTTON FUNCTIONS
/*--------------------------------------*/

//This array contains all user inputs to display

//Event delegator(so that I don't have to add separate event listener to each button of same type).
function addGlobalEventListener(type, selector, callback){
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e)
    })
}


const keyboard = document.querySelector('.keyboard');
const allBtns  = keyboard.querySelectorAll('button');
const numbers = document.querySelector('.numbers').querySelectorAll('button');
const methods = document.querySelector('.methods').querySelectorAll('button');
const display = document.querySelector('.display');
const clearBtn = document.querySelector('.clear');
const equalsBtn = document.querySelector('.equals');
let input = display.textContent;
 

clearBtn.addEventListener('click', () => {
    display.textContent = ""
    input = "";
    calculatedTotal = 0;
});


// Displaying all numbers that user enters to display.
addGlobalEventListener('click', '.number', e => {
    display.textContent += e.target.textContent;
})

//Displaying methods to display only if the last character in the display is not a method and there is atleast one number on the display. Here we use displayContent.length - 2 because method character has space in front of it.
addGlobalEventListener('click', '.method', e => {
    let displayContent = display.textContent;
    if(/[-+/x%]/.test(displayContent[displayContent.length - 2]) == false && /[0-9]+/g.test(displayContent) == true){
    display.textContent += ` ${e.target.textContent} `}
});

//Getting user input to run methods
equalsBtn.addEventListener('click', () => {
    input = display.textContent.split(" ")
    calc(input);
})

/*--------------------------------------*/
// CALCULATION FUNCTIONS
/*--------------------------------------*/
//Our final number.
let calculatedTotal = 0;

function calc (input){
    // converting string to number in input
    for(let j = 0; j < input.length; j++){
        if(/[0-9]+/g.test(input[j]) == true){
            input[j] =  parseInt(input[j]);
        }
    }
    console.log(input)

    for(let i = 0; i < input.length; i++){
        switch(true){
            //resetting i so we loop the array from beginning after one method is complete in order to avoid missing some method.
            case input[i] == '+':       add(input[i - 1], input [i + 1], i); i = 0; break;
            case input[i] == '-':       sub(input[i - 1], input [i + 1], i); i = 0; break;
            case input[i] == '/':       divide(input[i - 1], input [i + 1], i); i = 0; break;
            case input[i] == 'x':       multiply(input[i - 1], input [i + 1], i); i = 0; break; 
            case input[i] == '%':       percentage(input[i - 1], input [i + 1], i); i = 0; break; 
            // case input[i] == 'sq':   square(input[i - 1], input [i + 1]);
        }
    }
    display.textContent = calculatedTotal;
}

function add(a, b, i){
    calculatedTotal = a + b;
    input.splice(i - 1, i + 2, calculatedTotal) 
    console.log(input, calculatedTotal);
}

function sub(a, b, i){
    calculatedTotal = a - b;
    input.splice(i - 1, i + 2, calculatedTotal)
    console.log(input, calculatedTotal);
}

function divide(a, b, i){
     calculatedTotal = a / b;
     input.splice(i - 1, i + 2,calculatedTotal);
    console.log(input, calculatedTotal);

}

function multiply(a, b, i) {
    calculatedTotal = a * b;
    input.splice(i - 1, i + 2, calculatedTotal);
    console.log(input, calculatedTotal);

    // input.push(calculatedTotal);
}

function percentage(a, b, i){
     calculatedTotal = b * (a / 100) 
     input.splice(i - 1, i + 2, calculatedTotal); 
    //  input.push(calculatedTotal);
}

  
