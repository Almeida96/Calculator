const { test } = require('node:test');
const assert = require('node:assert/strict');
const { evaluate } = require('../index.html/arithmetic.js');
test('precedence, grouping, unary operators, decimals and exponent notation', () => {
  for (const [input, expected] of [['2+3*4',14], ['(2+3)*4',20], ['-(-3)+.5',3.5], ['3/-2',-1.5], ['1e-7*10',1e-6], ['10-3-2',5], ['16/4/2',2]]) {
    assert.equal(evaluate(input), expected, input);
  }
});
test('invalid syntax and executable input are rejected', () => {
  for (const input of ['', '.', '2(3)', '1 2', '2**3', '1+', '(2', '2)', 'globalThis.process.exit()', 'Math.random()', '0x10']) {
    assert.throws(() => evaluate(input), Error, input);
  }
});
test('bounded input, division by zero and overflow report errors', () => {
  for (const input of ['2/0', '1/(-0)', '1e999', '1e308*10', '('.repeat(40)+'1'+')'.repeat(40), '1'.repeat(501)]) assert.throws(() => evaluate(input));
  assert.equal(evaluate('-0'), 0);
});
