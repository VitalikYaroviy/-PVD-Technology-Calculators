import '../style.css';

let input = document.getElementById('input'),
    number = document.querySelectorAll('.calculator__keys'),
    operator = document.getElementsByClassName('operators'),
    result = document.getElementById('result'),
    clear = document.getElementById('clear'),
    lastValue = document.getElementById('lastValue'),
    resultDisplayed = false;

for (let i = 0; i < number.length; i++) {
    number[i].addEventListener('click', (e) => {
        let currentString = input.value;
        let lastChar = currentString[currentString.length - 1];

        if (resultDisplayed === false) {
            input.value += e.target.innerHTML;
        } else if (resultDisplayed === true && lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
            resultDisplayed = false;
            input.value += e.target.innerHTML;
        } else {
            resultDisplayed = false;
            input.value = "";
            input.value += e.target.innerHTML;
        }
    });
}
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', searchOperators)
}

document.getElementById('input').addEventListener('input', searchOperators);

function searchOperators(e) {
    let lastChar,
    currentString;
    if (e.data === '-' || e.data === '+' || e.data === '*' || e.data === '/') {
        currentString = input.value.slice(0, -1);
        lastChar = currentString[currentString.length - 1];
    } else {
        currentString = input.value;
        lastChar = currentString[currentString.length - 1];
    }
    if (lastChar === '+' ||
        lastChar === '-' ||
        lastChar === '*' ||
        lastChar === '/' ||
        lastChar === '.' ||
        lastChar === '=') {
        let newString = currentString.slice(0, -1) + e.target.innerHTML;
        input.value = newString;
    } else if (currentString.length === 0) {
        alert('Enter a number first');
    } else {
        input.value += e.target.innerHTML;
    }
}

let minus = document.getElementById('minus');
minus.addEventListener('click', () => {
    let dataInput = input.value;
    let numbers = dataInput.split(/[+\-*/]/g);
    let value = Number(numbers[numbers.length - 1]);
    if (value !== 0) {
        let changedValue = value * (-1);
        let operation = '';
        let count = 0;
        for (let i = dataInput.length - 1; i >= 0; i--) {
            if (dataInput[i] !== '+' && dataInput[i] !== '-' && dataInput[i] !== '*' && dataInput[i] !== '/') {
                count--;
                operation = dataInput.slice(0, count);
                if (operation === '') {
                    input.value = operation + changedValue.toString();
                }
            } else {
                operation = dataInput.slice(0, count);
                input.value = operation + changedValue.toString();
                break;
            }
        }
    }
});

result.addEventListener('click', () => {
    let inputString = input.value;
    let numbers = inputString.split(/[+\-*/]/g);
    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] === '') {
            numbers[i + 1] = parseFloat(numbers[i + 1]) * -1;
            numbers.splice(i, 1);
        }
    }
    let operators = [];
    for (let i = 0; i < inputString.length - 1; i++) {
        if ((inputString[i] === '-' || inputString[i] === '+' || inputString[i] === '*' || inputString[i] === '/') &&
            (inputString[i + 1] === '+' || inputString[i + 1] === '-' || inputString[i + 1] === '*' || inputString[i + 1] === '/')) {
            operators.push(inputString[i])
        } else if ((inputString[i] === '-' || inputString[i] === '+' || inputString[i] === '*' || inputString[i] === '/') &&
            (inputString[i - 1] === '+' || inputString[i - 1] === '-' || inputString[i - 1] === '*' || inputString[i - 1] === '/')) {
            i++
        } else if (inputString[i] === '-' && i === 0) {
            i++;
        }
        else if ((inputString[i] === '-' || inputString[i] === '+' || inputString[i] === '*' || inputString[i] === '/') &&
            (inputString[i + 1] !== '+' && inputString[i + 1] !== '-' && inputString[i + 1] !== '*' && inputString[i + 1] !== '/')) {
            operators.push(inputString[i])
        }
    }

    let divide = operators.indexOf('/');
    while (divide !== -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf('/');
    }

    let multiply = operators.indexOf('*');
    while (multiply !== -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf('*');
    }

    let add = operators.indexOf('+');
    while (add !== -1) {
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf('+');
    }

    let subtract = operators.indexOf('-');
    while (subtract !== -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf('-');
    }
    if (isNaN(numbers[0]) === true) {
        input.value = 'Error'
    } else {
        input.value = numbers[0];
    }
    resultDisplayed = true;

    let listAction = localStorage.listAction ? JSON.parse(localStorage.listAction) : [];
    let listAnswer = localStorage.listAnswer ? JSON.parse(localStorage.listAnswer) : [];
    let action = inputString;
    let expression = [action];
    let digitResult = [numbers[0]];
    if (inputString !== '' && typeof digitResult[0] !== 'string') {
        listAction.push(expression);
        listAnswer.push(digitResult);
    }
    localStorage.listAction = JSON.stringify(listAction);
    localStorage.listAnswer = JSON.stringify(listAnswer);
});

clear.addEventListener('click', () => {
    input.value = "";
});

lastValue.addEventListener('click', () => {
    input.value = input.value.slice(0, -1);
});

let story = document.getElementById('storyButton');
story.addEventListener('click', () => {
    let dataExpression = JSON.parse(localStorage.getItem('listAction'));
    let dataAnswer = JSON.parse(localStorage.getItem('listAnswer'));
    if (dataExpression) {
        for (let i = 0; i < dataExpression.length; i++) {
            let storyText = document.createElement('p');
            storyText.className = 'storyText';
            let storyDiv = document.getElementsByClassName('storyDiv');
            storyDiv[0].appendChild(storyText);
            storyText.innerText = dataExpression[i] + '=' + dataAnswer[i]
        }
    } else {
        alert('Sorry, but the story is empty')
    }
});

let valid = document.getElementById('input'),
    regexp = /^\-?[-+*/0-9]*$/;

valid.onkeypress = function (e) {
    let check = valid.value + String.fromCharCode(e.charCode);
    if (!regexp.test(check)) {
        return false;
    }
};