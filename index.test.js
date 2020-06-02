const path = require("path")
const { RuleTester } = require("eslint")

const parser = path.join(__dirname, "node_modules", "babel-eslint")

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: "module",
  ecmaFeatures: {
    modules: true,
  },
}

const ruleTester = new RuleTester({ parserOptions })
const rule = require("./lib/rules/call-in-function")

ruleTester.run("call-in-function", rule, {
  valid: [
    {
      code: `
        function callback() {
          called()
        }
      `,
      parser,
      options: ["called"],
    },
    {
      code: `
        function callback() {
          [].concat([])
        }
      `,
      parser,
      options: ["Array.prototype.concat"],
    },
  ],
  invalid: [
    {
      code: "called()",
      parser,
      options: ["called"],
      errors: 1,
    },
    {
      code: "[].concat([])",
      parser,
      options: ["Array.prototype.concat"],
      errors: 0,
    },
  ],
})
