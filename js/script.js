//MODEL
/*----- constants -----*/

/*----- app's state (variables) -----*/
let result, //what will be the result of the operation
operated, //boolean: whether or not we have clicked on an operator
clickedInt, //value of the int that has been clicked
clickedOperator, //which operator has been clicked
selected_ints, //array of all the ints that will form our number
currentNum, //the current number we are composing
previousNums, //previous numbers in our operation
previousOperators, //previous operators in our operation
decimal, //boolean: whether or not we've added a decimal to our current number
canAddDecimal, //boolean: whether or not we can still add a decimal to current number (only once)
operation; //string of final operation


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

//  *initializer/ reset function*
function init() {
   result = 0; //reset result to null
   currentNum = 0; // reset the current number being formed to 0;
   previousNums = []; //reset array of previous integers o 0
   previousOperators = []; // reset array of previous operators to 0
   operated = false; // we have not clicked on an operator yet
   decimal = false; // we have not clicked on the decimal yet
   canAddDecimal = true; // therefore, we are still allowed to add a decimal
   selected_ints = []; // we have not clicked on any ints yet
   operation = ''; // without any numbers or operators yet, our operation is an empty string
   clickedInt = null; //we have not clicked on any integers yet
   clickedOperator = null; //we have not clicked on any operators yet
   render();
}

// *handling of clicks function*
function handleClick(e) {
    //get integer equivalent of button clicked
    clickedInt = parseInt(e.target.innerText);
    //if it's not a number, but one of the operators or decimal point
    if (Number.isNaN(clickedInt))  {
        //if it is a decimal
        if (e.target.innerText === '.') {
            //check to see if we can still add a decimal
            if (canAddDecimal === true) {
                //add to array of selected nums
                selected_ints.push(e.target.innerText);
                //signal that we've added a decimal to array
                decimal = true;
                //make sure we won't be able to add a second decimal to number
                canAddDecimal = false;
            }
        }
        //if it's not a decimal (and still not a number)
        else {
            //that means it's an operator
            //get operator sign
            clickedOperator = e.target.innerText;
            //call the operator handler function
            handleOperation();
            //set operator check to true
            operated = true;
        }
    }
    //else if it is a number
    else {
        //reset operator check to false
        operated = false;
        //push all ints into the ints array
        selected_ints.push(clickedInt);
        //form current number by stringing along all previous ints
        currentNum = parseFloat(selected_ints.join(''));
        }
    render();
}

// *handling of any operation function*
function handleOperation() {
    //change our multiplicator sign to a mathematically correct one
    if (clickedOperator === 'x') {
        clickedOperator = '*';
    }
    //change our division sign to a mathematically correct one
    else if (clickedOperator === '÷') {
        clickedOperator = '/';
    }
    //what happens when we click on equal
    else if (clickedOperator === '=') {
      //the getStringOperation() function will form a string of our operation so far
      //then we appennd to that string the latest number
      //finally the result is the math evaluation of that operation string
      result = +math.evaluate(getStringOperation() + currentNum).toFixed(8);

    }

    // --> the following happens to construct our operation string

    //add the operator to array of previous operators
    previousOperators.push(clickedOperator);
    //add current num to array of previous nums
    previousNums.push(currentNum);

    //form a string of our operation so far
    getStringOperation();

    //reset selection of ints for next number in operation
    selected_ints = [];
    //reset current number for next number in operation
    currentNum = 0;
    //since we are making a new number, we should be allowed to make it a decimal again
    canAddDecimal = true;

};

// *get string of operation*
function getStringOperation() {
    
    //if doing an operation right after clicking equal
    if (previousOperators[0] === '=') {
        //the previous part of the operation will be the result we just got
        operation = result;
    }
    else {
        //iterate through array of previous numbers
        for (i=0; i<previousNums.length; i++) {
            //append each number and each operator to operation string
            operation = operation + previousNums[i] + previousOperators[i]
        }
    }

    //reset both arrays 
    previousNums = [];
    previousOperators = [];

    //return value for when it is needed during equal operator
    return operation;
}


// *DOM Render function*
function render() {
    
    //first check if we are clicking Equal yet
    if (clickedOperator === '='){
        //if so, show the result
        displayEl.textContent = result;
    }

    //else, check if we've made an operation yet
    else if (operation.length === 0) {
        //check if there is a decimal already
        if (decimal === false) {
            //if not, only show the current number
            displayEl.textContent = currentNum;
        }
        //if there is, show the number with a decimal point
        else {
            displayEl.textContent = `${currentNum}.`;
        //reset decimal boolean so it will not show again
        decimal = false;
        }
    }

    //else if we have just clicked on an operator
    else if (operated === true) {
        //display the operation string so far
        displayEl.textContent = `${operation}`
    }

    //any other case means we've already entered a number AND an operation
    else {
        //again check for decimal entry
        if (decimal === false) {
            //if not, show the operation with the latest number at the end
            displayEl.textContent = `${operation}${currentNum}`
        }
        //if there is, show operation and latest number with its decimal point
        else {
            displayEl.textContent = `${operation}${currentNum}.`
            ;
        //reset decimal boolean so it will not show again
        decimal = false;
        }
    }
};