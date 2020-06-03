# eslint-plugin-function-call-context

ESLint plugin to verify that some functions are called in the correct context.

## Configuration

```json
"rules": {
  "function-call-context/call-in-function": ["error", {
    "functions": ["functionA", "functionB"],
    "methods": ["methodA", "methodB"]
  }],
}
```

## Rules

### `call-in-function`

This rule checks that certain functions are called inside of another function.

This can be useful if you don't want to run these functions right when the script is loaded.

#### **Invalid**

```js
const myVar = myFunction()
```

#### **Valid**

```js
function outerFunction() {
  const myVar = myFunction()
}
```

#### Options

```json
"function-call-context/call-in-function": [<enabled>, {
  "functions": [<string>],
  "methods": [<string>]
}]
```
