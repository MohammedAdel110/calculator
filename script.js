let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    // Prevent multiple leading zeros
    if (expression === '0' && num === '0') {
        return;
    }
    // Replace leading zero with new number
    if (expression === '0') {
        expression = num;
    } else {
        expression += num;
    }
    updateDisplay();
}

function appendOperator(operator) {
    // Prevent operator at the beginning
    if (expression === '') {
        if (operator === '.') {
            expression = '0.';
        }
        return;
    }

    // Prevent multiple operators in a row
    const lastChar = expression.slice(-1);
    if (['+', '-', '*', '/', '%'].includes(lastChar)) {
        // Replace the last operator
        expression = expression.slice(0, -1) + operator;
    } else {
        expression += operator;
    }
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function clearDisplay() {
    expression = '';
    updateDisplay();
}

function updateDisplay() {
    display.value = expression || '0';
}

function calculate() {
    if (expression === '') {
        return;
    }

    try {
        // Replace display symbols with actual operators
        let calculation = expression
            .replace(/÷/g, '/')
            .replace(/×/g, '*')
            .replace(/−/g, '-');

        // Prevent division by zero
        if (calculation.includes('/0')) {
            display.value = 'Error';
            expression = '';
            return;
        }

        // Evaluate the expression
        let result = eval(calculation);

        // Handle floating point precision
        result = Math.round(result * 100000000) / 100000000;

        expression = String(result);
        updateDisplay();
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (/[0-9.]/.test(key)) {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === '%') {
        appendOperator('%');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape') {
        event.preventDefault();
        clearDisplay();
    }
});

// Initialize display
updateDisplay();