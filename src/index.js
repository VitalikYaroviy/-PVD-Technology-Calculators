import '../style.css';

let input = document.getElementById('input'),
    number = document.querySelectorAll('.calculator__keys'),
    operator = document.getElementsByClassName('operators'),
    result = document.getElementById('result'),
    clear = document.getElementById('clear'),
    lastValue = document.getElementById('lastValue'),
    resultDisplayed = false;

for (let i = 0; i < number.length; i++) {
    number[i].addEventListener("click", (e) => {
        let currentString = input.innerHTML;
        let lastChar = currentString[currentString.length - 1];

        if (resultDisplayed === false) {
            input.innerHTML += e.target.innerHTML;
        } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        } else {
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }
    });
}
for (let i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", (e) => {
        let currentString = input.innerHTML;
        let lastChar = currentString[currentString.length - 1];
        if (lastChar === "+" ||
            lastChar === "-" ||
            lastChar === "×" ||
            lastChar === "÷" ||
            lastChar === "." ||
            lastChar === "=") {
            let newString = currentString.slice(0, -1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length === 0) {
            alert("enter a number first");
        } else {
            input.innerHTML += e.target.innerHTML;
        }
    });
}

result.addEventListener("click", () => {
    let inputString = input.innerHTML;
    let numbers = inputString.split(/[+\-×÷]/g);
    let operators = inputString.replace(/[0-9]|\./g, "").split("");

    let divide = operators.indexOf("÷");
    while (divide !== -1) {
        numbers.splice(divide, 2, parseFloat(numbers[divide]) / parseFloat(numbers[divide + 1]));
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    let multiply = operators.indexOf("×");
    while (multiply !== -1) {
        numbers.splice(multiply, 2, parseFloat(numbers[multiply]) * parseFloat(numbers[multiply + 1]));
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    let subtract = operators.indexOf("-");
    while (subtract !== -1) {
        numbers.splice(subtract, 2, parseFloat(numbers[subtract]) - parseFloat(numbers[subtract + 1]));
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    let add = operators.indexOf("+");
    while (add !== -1) {
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }
    input.innerHTML = numbers[0];
    resultDisplayed = true;

    let listAction = localStorage.listAction ? JSON.parse(localStorage.listAction) : [];
    let listAnswer = localStorage.listAnswer ? JSON.parse(localStorage.listAnswer) : [];
    let action = inputString.slice(0, -1);
    let expression = [action];
    let digitResult = [numbers[0]];
    console.log(111, digitResult)
    if (inputString !== '' && typeof digitResult[0] !== "string") {
        listAction.push(expression);
        listAnswer.push(digitResult);
    }
    localStorage.listAction = JSON.stringify(listAction);
    localStorage.listAnswer = JSON.stringify(listAnswer);
});

clear.addEventListener("click", () => {
    input.innerHTML = "";
});

lastValue.addEventListener('click', () => {
    input.innerHTML = input.innerHTML.slice(0, -1);
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
            storyText.innerHTML = dataExpression[i] + '=' + dataAnswer[i]
        }
    } else {
        alert('Sorry, but the story is empty')
    }
});