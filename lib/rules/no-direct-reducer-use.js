/**
 * @fileoverview Prohibits direct use of feature reducers
 * @author meetromb
 */
'use strict'

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	meta: {
		docs: {
			description: 'Prohibits direct use of feature reducers',
			category: 'Errors',
			recommended: true,
		},
		fixable: 'code',
		schema: [],
	},

	create: function(context) {
		let usedParams = []

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

        const findVariableDeclarationsFromParentNode = () => {
            return context.getScope().block.body.filter((node) => {
                return node.type === 'VariableDeclaration'
            })
        }

		const proccessParams = paramsArray => {
			return (
				paramsArray.forEach(param => {
                    if (param.type === 'Identifier') {
                        if (!param.name) return;

                        usedParams.push(param.name);
                    } else if (param.type === 'ObjectPattern') {
                        const { properties } = param;

                        properties.forEach((property) => {
                            if (property.key) {
                                usedParams.push(property.key.name);
                            }
                        })
                    }
				})
			)
        }
        
        const proccessVariableDeclarator = (variableDeclarator, node) => {
            proccessParams(variableDeclarator.init.params)

            if (
                variableDeclarator.init.type.includes('FunctionExpression') &&
                variableDeclarator.init.body.type === 'ObjectExpression' &&
                checkIfBodyPropertiesDeprecated(variableDeclarator.init.body.properties)
            ) {
                context.report(node, 'You can`t get reducer from state. Use public api of entity.')
            }
        }

		const checkIfBodyPropertiesDeprecated = propertiesArray => {
			return (
				propertiesArray.filter(property => {
					const { value } = property
					if (!value.type.includes('FunctionExpression')) return false

					const { body } = value
					const { callee } = body
					if (!callee.object) return false

					const calleeName = callee.object.name
					if (!calleeName) {
                        const nestedCalleeName = callee.object.object.name
                        if (!nestedCalleeName) return false;
                        if (usedParams.includes(nestedCalleeName)) return true;
                    }

                    if (usedParams.includes(calleeName)) return true;
				}).length > 0
			)
		}

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		return {
            'CallExpression': node => {
                const { callee, arguments: args } = node;

                if (args && callee && callee.name === 'connect') {
                    args.forEach(({ type, name }, i) => {
                        if (type === 'Identifier' && i === args.length - 1) {
                            findVariableDeclarationsFromParentNode().forEach(node => {
                                node.declarations.forEach(variableDeclarator => {
                                    if (variableDeclarator.id.name === name) {
                                        proccessVariableDeclarator(variableDeclarator, node)
                                    }
                                })
                            })
                        }
                    })
                }
            },
		}
	},
}
