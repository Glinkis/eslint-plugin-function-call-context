const path = require("path")
const { RuleTester } = require("eslint")

const parser = path.join(__dirname, "node_modules", "babel-eslint")

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: "module",
  ecmaFeatures: {
    modules: true
  }
}

const ruleTester = new RuleTester({ parserOptions })
const rules = require("./").rules

ruleTester.run("call-in-function", rules["call-in-function"], {
  valid: [
    {
      code: `
        function callback() {
          called()
        }
      `,
      parser,
      options: [{ functions: ["called"] }]
    },
    {
      code: `
        function callback() {
          [].concat([])
        }
      `,
      parser,
      options: [{ methods: ["concat"] }]
    }
  ],
  invalid: [
    {
      code: "called()",
      parser,
      options: [{ functions: ["called"] }],
      errors: 1
    },
    {
      code: "[].concat([])",
      parser,
      options: [{ methods: ["concat"] }],
      errors: 1
    }
  ]
})
