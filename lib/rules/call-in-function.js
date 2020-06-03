// @ts-check
/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  create(context) {
    const [options] = context.options

    /** @type {string[]} */
    const functions = options.functions || []
    /** @type {string[]} */
    const methods = options.methods || []

    return {
      CallExpression(node) {
        if (node.type !== "CallExpression") return

        const { callee } = node

        const descriptor = { node, message: "" }

        switch (callee.type) {
          case "Identifier": {
            if (!functions.includes(callee.name)) return
            descriptor.message = `Function '${callee.name}' is must be called inside a function.`
            break
          }
          case "MemberExpression": {
            const { property } = callee
            if (property.type !== "Identifier") return
            if (!methods.includes(property.name)) return
            descriptor.message = `Method '${property.name}' is must be called inside a function.`
            break
          }
          default:
            return
        }

        // @ts-ignore
        let parent = node.parent

        // Look for a function declaration anywhere in the tree.
        while (parent.parent) {
          if (parent.type.match(/Function/)) {
            return
          }
          parent = parent.parent
        }

        context.report(descriptor)
      }
    }
  }
}
