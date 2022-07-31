/*--------------------------------------*/
// DISPLAY/BUTTON FUNCTIONS
/*--------------------------------------*/

//Event delegator(so that I don't have to add separate event listener to each button of same type).
function addGlobalEventListener(type, selector, callback){
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e)
    })
}


const display = document.querySelector('.display');
const ceBtn = document.querySelector('.ce');
const acBtn = document.querySelector('.ac');
const equalsBtn = document.querySelector('.equals');
let input = display.textContent;
 
display.textContent = 0;

//All clear button
acBtn.addEventListener('click', () => {
    display.textContent = 0;
    input = "";
    calculatedTotal = 0;
});

// Clear entry button. Removes last character put in by user.
ceBtn.addEventListener('click', () => {
    if (display.textContent.length <= 1) {
        return display.textContent = 0; //To add 0 when there is nothing.
        
    }
    if(/[−+÷×%√]/.test(display.textContent[display.textContent.length - 2]) == true){ // to remove methods with their spaces.
        display.textContent = display.textContent.slice(0, -2)
    }
    
    display.textContent = display.textContent.slice(0, -1); // if both statements are false then we just remove the last character.
});


// Displaying all numbers that user enters to display.
addGlobalEventListener('click', '.number', e => {
    if(display.textContent == 0) display.textContent = '';
    display.textContent += e.target.textContent;
})

//Displaying methods to display only if the last character in the display is not a method and there is at least one number on the display. Here we use displayContent.length - 2 because method character has space in front of it.
addGlobalEventListener('click', '.method', (e) => {
    //To avoid adding a method in front of 0 
    if(display.textContent == 0) display.textContent = ''; 

    // Changing method if user presses methods twice 
    if(/[−+÷×%√]/.test(display.textContent[display.textContent.length - 2]) == true){
        display.textContent = display.textContent.slice(0 , -2);
        display.textContent += ` ${e.target.textContent} `
         return;
    }
    // Making sure user only adds one method after one number
    if(/[−+÷×%√]/.test(display.textContent[display.textContent.length - 2]) == false && /[0-9]+/g.test(display.textContent) == true){
        display.textContent += ` ${e.target.textContent} `}
});





//Decimal
addGlobalEventListener('click', '.dot', e => {
    if (/[.]/g.test(display.textContent) == true) return;
    if (/[−+÷×%√]/.test(display.textContent[display.textContent.length - 2])) return;
    display.textContent += '.';
})

//Getting user input to run methods
equalsBtn.addEventListener('click', () => {
    if (/[−+÷×%√]/.test(display.textContent[display.textContent.length - 2]) == true) return; // To cover cases where user presses = after putting a method and before putting a number 
    input = display.textContent.split(" ");
    //removing empty array elements.
    input = input.filter(n => n);
    console.log(input);
    calc(input);
})

/*---------------------------------*/
// KEYBOARD INPUT EVENT LISTENERS
/*---------------------------------*/

// For Numbers

document.addEventListener('keydown', (e) => {
    if(display.textContent == 0) display.textContent = '';
    if(/[0-9]/g.test(e.key)) display.textContent += e.key; 
})

// For Methods

//Addition
document.addEventListener('keydown', (e) =>{
    if(display.textContent == 0) display.textContent = '';
    //Changing methods if user presses a different method
    if(e.key == '+' && /[−+÷×%√]/.test(display.textContent[display.textContent.length - 2]) == true){
        display.textContent = display.textContent.slice(0 , -2);
        display.textContent += ` + `
         return;
      }
    if (e.key == '+' && /[−+÷×%√]/.test(display.textContent[display.textContent.length - 2]) == false){
        display.textContent += ' + ';
    }
})

//Subtraction
document.addEventListener('keydown', (e) =>{
    if(display.textContent == 0) display.textContent = '';
    if(e.key == '-' && /[−+÷×%√]/.test(display.textContent[display.textContent.length - 2]) == true){
        display.textContent = display.textContent.slice(0 , -2);
        display.textContent += ` − `
         return;
      }
    if (e.key == '-' && /[−+÷×%√]/.test(display.textContent[display.textContent.length - 2]) == false){
        display.textContent += ' − ';
    }
})

//Division
document.addEventListener('keydown', (e) =>{
    if(display.textContent == 0) display.textContent = '';
    if(e.key == '/' && /[−+÷×%√]/.test(display.textContent[display.textContent.length - 2]) == true){
        display.textContent = display.textContent.slice(0 , -2);
        display.textContent += ` ÷ `
         return;
      }
    if (e.key == '/' && /[−+÷×%√]/.test(display.textContent[display.textContent.length - 2]) == false){
        display.textContent += ' ÷ ';
    }
})

//Multiplication
document.addEventListener('keydown', (e) =>{
    if(display.textContent == 0) display.textContent = '';
    if(e.key == '*' && /[−+÷×%√]/.test(display.textContent[display.textContent.length - 2]) == true){
        display.textContent = display.textContent.slice(0 , -2);
        display.textContent += ` × `
         return;
      }
    if (e.key == '*' && /[−+÷×%√]/.test(display.textContent[display.textContent.length - 2]) == false){
        display.textContent += ' × ';
    }
})

//Percentage
document.addEventListener('keydown', (e) =>{
    if(display.textContent == 0) display.textContent = '';
    if(e.key == '%' && /[−+÷×%√]/.test(display.textContent[display.textContent.length - 2]) == true){
        display.textContent = display.textContent.slice(0 , -2);
        display.textContent += ` % `
         return;
      }
    if (e.key == '%' && /[−+÷×%√]/.test(display.textContent[display.textContent.length - 2]) == false){
        display.textContent += ' % ';
    }
})

// For equals button on keyboard.
document.addEventListener('keydown', (e) => {
    if (e.key == '=' || e.key == 'Enter'){
    if (/[−+÷×%√]/.test(display.textContent[display.textContent.length - 2]) == true) return;
    input = display.textContent.split(" ");
    input = input.filter(n => n);
    calc(input);
    }
})

//For backspace (clear entry function)
document.addEventListener('keydown', (e) => {
if (e.key == 'Backspace'){
    if (display.textContent.length <= 1) {
        return display.textContent = 0;
    }

    if(/[−+÷×%√]/.test(display.textContent[display.textContent.length - 2]) == true){ 
        display.textContent = display.textContent.slice(0, -2)
    }
    
    display.textContent = display.textContent.slice(0, -1); 

}
} )

// For escape (all clear function)
document.addEventListener('keydown', (e) => {
    if (e.key == 'Escape'){
        display.textContent = 0;
        input = "";
        calculatedTotal = 0;
    }
})

// For dot/decimal
document.addEventListener('keydown', (e) => {
    if (e.key == '.'){
        if (/[.]/g.test(display.textContent) == true) return;
        if (/[−+÷×%√]/.test(display.textContent[display.textContent.length - 2])) return;
        display.textContent += '.';
    }
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

    for(let i = 0; i < input.length; i++){
        switch(true){
            //resetting i so we loop the array from beginning after one method is complete in order to avoid missing some method.
            case input[i] == '+':       add(input[i - 1], input [i + 1], i); i = 0; break;
            case input[i] == '−':       sub(input[i - 1], input [i + 1], i); i = 0; break;
            case input[i] == '÷':       divide(input[i - 1], input [i + 1], i); i = 0; break;
            case input[i] == '×':       multiply(input[i - 1], input [i + 1], i); i = 0; break; 
            case input[i] == '%':       percentage(input[i - 1], input [i + 1], i); i = 0; break; 
            case input[i] == '√':   square(input [i + 1], i);
        }
    }
    display.textContent = calculatedTotal;
}

function add(a, b, i){
    calculatedTotal = a + b;
    input.splice(i - 1, i + 2, calculatedTotal) // removing calculated numbers && methods && adding their result for further calculation.
}

function sub(a, b, i){
    calculatedTotal = a - b;
    input.splice(i - 1, i + 2, calculatedTotal)
}

function divide(a, b, i){
     calculatedTotal = a / b;
     input.splice(i - 1, i + 2,calculatedTotal);
}

function multiply(a, b, i) {
    calculatedTotal = a * b;
    input.splice(i - 1, i + 2, calculatedTotal);
}

function percentage(a, b, i){
     calculatedTotal = b * (a / 100);
     input.splice(i - 1, i + 2, calculatedTotal); 
}

function square(a, i){
    calculatedTotal = Math.sqrt(a);
    input.splice(i, i + 2, calculatedTotal)
}
  
