const { RuleTester } = require("eslint")

const ruleTester = new RuleTester()
const rule = require("./lib/rules/call-in-function")

ruleTester.run("call-in-function", rule, {
  valid: [
    {
      code: `
        function callback() {
          called()
        }
      `,
      options: ["called"],
    },
    {
      code: `
        function callback() {
          [].concat([])
        }
      `,
      options: ["Array.prototype.concat"],
    },
  ],
  invalid: [
    {
      code: "called()",
      options: ["called"],
      errors: 1,
    },
    {
      code: "[].concat([])",
      options: ["Array.prototype.concat"],
      errors: 0,
    },
  ],
})
