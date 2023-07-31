let displayValue = "0";
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

const display = document.getElementById("display");

function updateDisplay() {
  display.textContent = displayValue;
}

updateDisplay();

function clear() {
  displayValue = "0";
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
}

function inputDigit(digit) {
  if (waitingForSecondOperand) {
    displayValue = digit;
    waitingForSecondOperand = false;
  } else {
    displayValue = displayValue === "0" ? digit : displayValue + digit;
  }
}

function inputDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(displayValue);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    return;
  }

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = operate(operator, firstOperand, inputValue);
    displayValue = roundToMaxDecimals(result).toString();
    firstOperand = result;
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        alert("Error: Cannot divide by zero!");
        return null;
      }
      return a / b;
    default:
      return b;
  }
}

function roundToMaxDecimals(number) {
  const maxDecimals = 12;
  return Number(parseFloat(number).toFixed(maxDecimals));
}

function handleEquals() {
  if (!operator || waitingForSecondOperand) {
    return;
  }

  const inputValue = parseFloat(displayValue);
  const result = operate(operator, firstOperand, inputValue);
  displayValue = roundToMaxDecimals(result).toString();
  firstOperand = result;
  operator = null;
  waitingForSecondOperand = false;
}

function handleBackspace() {
  if (displayValue.length === 1) {
    displayValue = "0";
  } else {
    displayValue = displayValue.slice(0, -1);
  }
}

document.getElementById("clear").addEventListener("click", () => {
  clear();
  updateDisplay();
});

document.querySelectorAll(".number").forEach((button) => {
  button.addEventListener("click", () => {
    inputDigit(button.textContent);
    updateDisplay();
  });
});

document.getElementById("decimal").addEventListener("click", () => {
  inputDecimal();
  updateDisplay();
});

document.querySelectorAll(".operator").forEach((button) => {
  button.addEventListener("click", () => {
    handleOperator(button.textContent);
    updateDisplay();
  });
});

document.getElementById("equals").addEventListener("click", () => {
  handleEquals();
  updateDisplay();
});

document.getElementById("backspace").addEventListener("click", () => {
  handleBackspace();
  updateDisplay();
});

