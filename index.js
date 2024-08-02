function calculate(obj){
    switch (obj.operator) {
        case '+':
          obj.result = Number.isInteger(parseFloat(obj.firstOperand) + parseFloat(obj.secondOperand)) ? parseFloat(obj.firstOperand) + parseFloat(obj.secondOperand) : (parseFloat(obj.firstOperand) + parseFloat(obj.secondOperand)).toFixed(3);
          break;
        case '-':
            obj.result = Number.isInteger(parseFloat(obj.firstOperand) - parseFloat(obj.secondOperand)) ? parseFloat(obj.firstOperand) - parseFloat(obj.secondOperand) : (parseFloat(obj.firstOperand) - parseFloat(obj.secondOperand)).toFixed(3);
            break;
        case '×':
            obj.result = Number.isInteger(parseFloat(obj.firstOperand) * parseFloat(obj.secondOperand)) ? parseFloat(obj.firstOperand) * parseFloat(obj.secondOperand) : (parseFloat(obj.firstOperand) * parseFloat(obj.secondOperand)).toFixed(3);
            break;
        case '/':
            obj.result = Number.isInteger(parseFloat(obj.firstOperand) / parseFloat(obj.secondOperand)) ? parseFloat(obj.firstOperand) / parseFloat(obj.secondOperand) : (parseFloat(obj.firstOperand) / parseFloat(obj.secondOperand)).toFixed(3);
            break;
      }
}

function displayOperation(obj){
     topScreen.textContent = `${obj.firstOperand} ${obj.operator} ${obj.secondOperand}`
}

function playSound() {
    keypressSound.currentTime = 0;
    keypressSound.play();
  }


let topScreen = document.querySelector('.top');
let bottomScreen = document.querySelector('.bottom');
let clearButton = document.querySelector('#clear')
let equalButton = document.querySelector('#equal')
const keypressSound = new Audio("sounds/keystroke.wav");
let buttons = document.querySelectorAll('.number , .operator');
buttons = Array.from(buttons);

let operationElements = {
    firstOperand : '',
    operator : '',
    secondOperand : '',
    result : ''
}

buttons.forEach((btn) => {
    btn.addEventListener('click' , (e) => {
        playSound()
        let value = e.target.innerText;

        //writing the first operand
        if(e.target.matches('.number') && operationElements.secondOperand === '' && operationElements.operator === ''){
            operationElements.firstOperand = operationElements.firstOperand.concat(value);

            //using the cumma only once
            if(value === '.'){
                e.target.disabled = true;
            }
        }
        
        //write the operator
        if(e.target.matches('.operator') && operationElements.secondOperand === '' && operationElements.operator === '' && operationElements.firstOperand !== ''){
            operationElements.operator = value;
        }

        //write the second operand
        if (e.target.matches('.number') && operationElements.firstOperand !== '' && operationElements.operator !== ''){
            document.getElementById('comma').disabled = false;
            operationElements.secondOperand = operationElements.secondOperand.concat(value);

            //using the cumma only once
            if(value === '.'){
                e.target.disabled = true;
            }
        }

        //in case we have more then three operands
        if(e.target.matches('.operator') && operationElements.secondOperand !== '' && operationElements.operator !== '' && operationElements.firstOperand !== ''){
            calculate(operationElements)    
            let resultOperation = operationElements.result;

            // when the user divide by 0
            if(operationElements.result == 'Infinity'){
                operationElements.firstOperand = '';
                operationElements.secondOperand = '';
                operationElements.operator = '';
                operationElements.result = 'Infinity';                
            }else{
                bottomScreen.textContent = resultOperation;
                operationElements.firstOperand = operationElements.result;
                operationElements.secondOperand = '';
                operationElements.operator = value;
                operationElements.result = '';
            }
        }

        // when the user divide by 0
        if(operationElements.result == 'Infinity'){
            topScreen.textContent = 'Infinity';
            operationElements.result = '';
        }else{
            displayOperation(operationElements)
        }

    })
})

clearButton.addEventListener('click' , () => {
    playSound()
    operationElements.firstOperand = '';
    operationElements.operator = '';
    operationElements.secondOperand = '';
    operationElements.result= '';
    displayOperation(operationElements);
    bottomScreen.textContent = '';
})

equalButton.addEventListener('click' , () => {
    playSound()
    if(operationElements.firstOperand !== '' && operationElements.secondOperand !== ''){
        calculate(operationElements);
        displayOperation(operationElements);
        bottomScreen.textContent = operationElements.result;
    }
})







