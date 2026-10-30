# Calculator

A small browser calculator with a standalone arithmetic parser. No dependencies or build step.

## Run

Open [the calculator](index.html/HtmlPage1.html) in a browser, or serve the checkout:

```sh
python -m http.server 8000
```

Visit `http://localhost:8000/index.html/HtmlPage1.html`. The original Visual Studio solution remains available, but is not required.

Type an expression or use the buttons. Enter evaluates it; Escape clears it. Parentheses, unary signs, decimals and scientific notation are supported. For example, `(12 + 3) * -2` gives `-30`.

## Behavior

Expressions use normal multiplication/division precedence and left-to-right evaluation within the same precedence level. Invalid syntax, division by zero and non-finite results produce a visible error while preserving the input. The parser accepts at most 500 characters and 32 nested operations. It never executes JavaScript.

Calculations use JavaScript floating-point numbers, so values such as `0.1 + 0.2` have the usual binary rounding error. This is a general arithmetic exercise, not a financial calculator.

## Development

Node.js 22+ is needed only for tests:

```sh
node --test
```

[Parser](index.html/arithmetic.js) and [browser controls](index.html/script.js) are separate. Tests cover arithmetic, syntax rejection and resource limits. To change the parser, add a regression case and run the suite. For UI changes, also check keyboard operation and a narrow browser viewport.
