/**
 * @fileoverview Prohibits direct use of rematch state
 * @author meetromb
 */
'use strict'

module.exports = {
	meta: {
		docs: {
			description: 'Prohibits direct use of rematch state',
			category: 'Errors',
			recommended: true,
		},
		fixable: 'code',
		schema: [],
	},

	create: function(context) {
        const CONNECT = 'connect';

		//----------------------------------------------------------------------
		// Helpers
		//----------------------------------------------------------------------

        const findVariableDeclarationsFromParentNode = () => {
            return context.getScope().block.body.filter((node) => {
                return node.type === 'VariableDeclaration'
            })
        }

        const getParamsFromFunctionExpression = (params) => {
            const findedParams = []

            params.forEach(({ type, name, properties }) => {
                if (name && type === 'Identifier') findedParams.push(name);
                else if (type === 'ObjectPattern') {
                    properties.forEach(({ key }) => {
                        if (key && key.name) findedParams.push(key.name);
                    })
                }
            })

            return findedParams;
        }

        const proccessVariableDeclarator = ({ init }, node) => {
            const params = getParamsFromFunctionExpression(init.params)

            if (init.type.includes('FunctionExpression') &&
                init.body.type === 'ObjectExpression' &&
                checkIfParamsUsedDirectly(params, init.body.properties)
            ) {
                context.report(node, 'You can`t get reducer from state. Use public api of entity.')
            }
        }

		const checkIfParamsUsedDirectly = (params, properties) => {
			return (
				properties.filter(({ value }) => {
					if (value.type.includes('FunctionExpression')) {
                        return checkParamsForFunctionExpression(params, value);
                    } else if (value.type === 'Identifier') {
                        return checkParamsForIdentifier(params, value);
                    } else if (value.type === 'MemberExpression') {
                        return checkParamsForMemberExpression(params, value);
                    }
					
				}).length > 0
			)
        }

        const checkParamsForFunctionExpression = (params, value) => {
            const { callee } = value.body
            if (!callee.object) return false

            const calleeName = callee.object.name
            if (!calleeName) {
                const nestedCalleeName = callee.object.object.name
                if (!nestedCalleeName) return false;
                if (params.includes(nestedCalleeName)) return true;
            }

            if (params.includes(calleeName)) return true;
        }

        const checkParamsForIdentifier = (params, value) => {
            return params.includes(value.name)
        }

        const checkParamsForMemberExpression = (params, value) => {
            if (!value.object) return false

            const objectName = value.object.name
            if (!objectName) {
                const nestedObjectName = value.object.object.name
                if (!nestedObjectName) return false;
                if (params.includes(nestedObjectName)) return true;
            }

            if (params.includes(objectName)) return true;
        }
        
        const findIdentifierInConnect = (args, identifierPosition) => {
            if (args[identifierPosition]) {
                const { type, name } = args[identifierPosition];
                if (type === 'Identifier') return { type, name }
            }

            return null;
        }

		//----------------------------------------------------------------------
		// Public
		//----------------------------------------------------------------------

		return {
            'CallExpression': node => {
                const { callee, arguments: args } = node;

                if (args && callee && callee.name === CONNECT) {
                    const connectIdentifiers = [
                        findIdentifierInConnect(args, 0),
                        findIdentifierInConnect(args, 1)
                    ]
                    
                    findVariableDeclarationsFromParentNode().forEach(node => {
                        node.declarations.forEach(declarator => {
                            connectIdentifiers.forEach(identifier => {
                                if (identifier && declarator.id.name === identifier.name) {
                                    proccessVariableDeclarator(declarator, node)
                                }
                            })
                        })
                    })
                }
            },
		}
	},
}
