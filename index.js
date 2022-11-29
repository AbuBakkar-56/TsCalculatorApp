var calculatorDisplay = document.querySelector('h1');
var inputBtns = document.querySelectorAll('button');
var clearBtn = document.getElementById('clearBtn');
var firstValue = 0;
var operatorValue = '';
var awaitingNextValue = false;
function sendNumberValue(number) {
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    }
    else {
        var displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}
var calculate = {
    '/': function (firstNumber, secondNumber) { return firstNumber / secondNumber; },
    '*': function (firstNumber, secondNumber) { return firstNumber * secondNumber; },
    '+': function (firstNumber, secondNumber) { return firstNumber + secondNumber; },
    '-': function (firstNumber, secondNumber) { return firstNumber - secondNumber; },
    '=': function (firstNumber, secondNumber) { return secondNumber; }
};
function useOperator(operator) {
    var currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    // Assign first value if no value
    if (!firstValue) {
        firstValue = currentValue;
    }
    else {
        var calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // Ready for next value, store the operator
    awaitingNextValue = true;
    operatorValue = operator;
}
function addDecimal() {
    var _a;
    if (awaitingNextValue)
        return;
    if (!((_a = calculatorDisplay.textContent) === null || _a === void 0 ? void 0 : _a.includes('.'))) {
        calculatorDisplay.textContent = "".concat(calculatorDisplay.textContent, ".");
    }
}
inputBtns.forEach(function (inputBtn) {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', function () { return sendNumberValue(inputBtn.value); });
    }
    else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', function () { return useOperator(inputBtn.value); });
    }
    else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', function () { return addDecimal(); });
    }
});
function clearAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}
;
clearBtn.addEventListener('click', clearAll);
