const findingCourse = () => {
    return fetch("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
};

let dataCourse;
findingCourse()
    .then(response => {
        response.json().then((data) => {
            dataCourse = data
        });
    });


let buttons = document.getElementsByClassName('currency__keys');
let fromInput = document.getElementById('fromCurrency');
let toInput = document.getElementById('toCurrency');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', (event) => {
        if (event.target.innerHTML !== 'convert' && event.target.innerHTML !== 'D') {
            fromInput.value += event.target.innerHTML
        }
    }, false);
}

document.getElementsByClassName('currency__key--convert')[0].addEventListener('click', () => {
    let select = document.getElementsByTagName('select');
    if (select[2].value === 'Buy') {
        if (select[0].value === 'UAN') {
            toInput.value = fromInput.value / dataCourse[0].buy;
            select[1].value = 'USD'

        } else if (select[0].value === 'USD') {
            toInput.value = fromInput.value * dataCourse[0].buy;
            select[1].value = 'UAN'
        }
    } else if (select[2].value === 'Sale') {
        if (select[0].value === 'UAN') {
            toInput.value = fromInput.value / dataCourse[0].sale;
            select[1].value = 'USD'

        } else if (select[0].value === 'USD') {
            toInput.value = fromInput.value * dataCourse[0].sale;
            select[1].value = 'UAN'
        }
    }
});

let currencyClear = document.getElementsByClassName('currency__clear');
for (let i = 0; i < currencyClear.length; i++) {
    currencyClear[i].addEventListener('click', () => {
        if (currencyClear[i].value === 'C') {
            document.getElementById('fromCurrency').value = '';
        } else if (currencyClear[i].value === 'D') {
            document.getElementById('fromCurrency').value = document.getElementById('fromCurrency').value.slice(0, -1);
        }
    })
}