'use strict';
const output = document.getElementById('result');
const status = document.getElementById('status');
function clearScreen() {
  output.value = '';
  status.textContent = '';
  output.focus();
}
function display(value) {
  if (output.value.length < 500) output.value += value;
  status.textContent = '';
  output.focus();
}
function calculate() {
  try {
    output.value = String(arithmetic.evaluate(output.value));
    status.textContent = 'Result: ' + output.value;
  } catch (error) {
    status.textContent = error.message;
  }
  output.focus();
}
output.addEventListener('keydown', event => {
  if (event.key === 'Enter') { event.preventDefault(); calculate(); }
  if (event.key === 'Escape') { event.preventDefault(); clearScreen(); }
});
