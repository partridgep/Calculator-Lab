//MODEL
/*----- constants -----*/

/*----- app's state (variables) -----*/
let result, operated, clickedNum, clickedOperator, num1, num2, previousOperator; 
let selected_nums = [];

//CONTROLLER
/*----- cached element references -----*/
//data binding
const displayEl = document.getElementById('display');
const calcButtonsEl = document.getElementById('calc-buttons')
const circlesEls = document.getElementsByClassName('circle');
const buttonEl = document.querySelector('button');


/*----- event listeners -----*/
calcButtonsEl.addEventListener('click', handleClick);
buttonEl.addEventListener('click', init)

/*----- functions -----*/
init(); //call function so that immediately on game mode start game then 
//calling render and visualizing data to the dom

function init() {
   result = 0;
   num1 = 0;
   num2 = null;
   operated = false;
   render();
}

function handleClick(e) {
    //get integer equivalent of button clicked
    clickedNum = parseInt(e.target.innerText);
    //if it's not a number, but one of the operators or decimal point
    if (Number.isNaN(clickedNum))  {
        //if it is a decimal
        if (e.target.innerText === '.') {
            console.log('decimal');
            //add to array of selected nums
            selected_nums.push(clickedNum);
        }
        //if it's not a decimal (and still not a number)
        else {
            //get operator sign
            clickedOperator = e.target.innerText;
            console.log(clickedOperator);
            //call the operator function
            handleOperation();
            //set operator check to true
            operated = true;
            selected_nums = [];
            //get text value of button clicked
        }
    }
    //else if it is a number
    else {
        if (operated === false) {
            //push all numbers into the numbers array
            selected_nums.push(clickedNum);
            num1 = parseInt(selected_nums.join(''));
            console.log(num1);
        }
        else {
            //push all numbers into the numbers array
            selected_nums.push(clickedNum);
            num2 = parseInt(selected_nums.join(''));
            console.log(num2);
        }
    }
    render();
}
//when we click on an operater, change operated to true and completed operator function



function handleOperation() {
    if (clickedOperator === '=') {
        if (previousOperator === '+') {
            result = num1 + num2;
            console.log(result);
        }
        else if (previousOperator === '-') {
            result = num1 - num2;
            console.log(result);
        }
        else if (previousOperator === 'x') {
            result = num1 * num2;
            console.log(result);
        }
        else if (previousOperator === '÷') {
            result = num1/num2;
            console.log(result);
        }
    }
    previousOperator = clickedOperator;
    selected_nums = [];
};

function render() {
    if (operated === false) {
        displayEl.textContent = num1;
    }
    else if (!num2) {
        displayEl.textContent = `${num1}${previousOperator}`;
    }
    else if (previousOperator !== '=') {
        displayEl.textContent = `${num1}${previousOperator}${num2}`;
    }
    else {
        displayEl.textContent = result;
    }
}