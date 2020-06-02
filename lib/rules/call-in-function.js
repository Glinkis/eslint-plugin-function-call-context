// @ts-check
/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  create(context) {
    /** @type {string[]} */
    const options = context.options
    /** @type {string[]} */
    const names = []
    /** @type {string[][]} */
    const members = []

    for (const name of options) {
      const [first, ...rest] = name.split(".")
      rest.length ? members.push([first, ...rest]) : names.push(first)
    }

    return {
      CallExpression(node) {
        if (node.type !== "CallExpression") return

        const { callee } = node

        switch (callee.type) {
          case "Identifier": {
            if (!names.includes(callee.name)) return
            break
          }
          default:
            return
        }

        // @ts-ignore
        let parent = node.parent

        // Look for a function declaration anywhere in the tree.
        while (parent.parent) {
          parent = parent.parent
          if (parent.type === "FunctionDeclaration") {
            return
          }
        }

        context.report({
          node,
          message: "Not called in a function!",
        })
      },
    }
  },
}
