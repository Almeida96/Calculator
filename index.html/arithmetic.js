(function (root) {
  'use strict';
  function evaluate(expression) {
    if (typeof expression !== 'string' || expression.length > 500) throw new Error('Use at most 500 characters.');
    const tokens = expression.match(/(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?|[()+*/-]|\S/g) || [];
    let cursor = 0;
    function primary(depth) {
      if (depth > 32) throw new Error('Too many nested operations.');
      const token = tokens[cursor++];
      if (token === '+' || token === '-') return (token === '-' ? -1 : 1) * primary(depth + 1);
      if (token === '(') {
        const value = sum(depth + 1);
        if (tokens[cursor++] !== ')') throw new Error('Missing closing parenthesis.');
        return value;
      }
      if (!token || !/^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(token)) throw new Error('Enter a number or parenthesized expression.');
      const value = Number(token);
      if (!Number.isFinite(value)) throw new Error('Number is too large.');
      return value;
    }
    function product(depth) {
      let value = primary(depth);
      while (tokens[cursor] === '*' || tokens[cursor] === '/') {
        const op = tokens[cursor++], right = primary(depth);
        if (op === '/' && right === 0) throw new Error('Cannot divide by zero.');
        value = op === '*' ? value * right : value / right;
      }
      return value;
    }
    function sum(depth) {
      let value = product(depth);
      while (tokens[cursor] === '+' || tokens[cursor] === '-') {
        const op = tokens[cursor++], right = product(depth);
        value = op === '+' ? value + right : value - right;
      }
      return value;
    }
    const result = sum(0);
    if (cursor !== tokens.length) throw new Error('Unexpected input. Use +, -, *, / and parentheses.');
    if (!Number.isFinite(result)) throw new Error('Result is too large.');
    return Object.is(result, -0) ? 0 : result;
  }
  if (typeof module !== 'undefined') module.exports = { evaluate };
  else root.arithmetic = { evaluate };
})(typeof globalThis !== 'undefined' ? globalThis : this);
