/**
 * @fileoverview Prohibits direct use of rematch state
 * @author meetromb
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-direct-use-rematch-state")
const RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module"
    }
});


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();

ruleTester.run("no-direct-use-rematch-state", rule, {

    valid: [
        `const mapDispatch = (state) => ({
            someAction: () => makeSomeAction(state)
        })
        
        connect(null, mapDispatch)`,
        `let randomName = (state) => ({
            someAction: () => makeSomeAction(state)
        })
        
        connect(null, randomName)`,
        `const mapState = (state) => ({
            someStateField: selector(state)
        })
        
        const mapDispatch = (state) => ({
            someAction: () => makeSomeAction(state)
        })
        
        connect(mapState, mapDispatch)`,
        `const mapState = (state) => ({
            someStateField: selector(state)
        })
        
        const mapDispatch = (state) => ({
            someAction: () => makeSomeAction(state)
        })
        
        connect(mapState, null)`,
    ],

    invalid: [
        {
            code: `const mapDispatch = (state) => ({
                someAction: () => state.feature.makeSomeAction()
            })
            
            connect(null, mapDispatch)`,
            errors: [{
                message: "You can`t get reducer from state. Use public api of entity.",
                type: "VariableDeclaration"
            }]
        },
        {
            code: `const mapDispatch = (state) => ({
                someAction: () => state.makeSomeAction()
            })
            
            connect(null, mapDispatch)`,
            errors: [{
                message: "You can`t get reducer from state. Use public api of entity.",
                type: "VariableDeclaration"
            }]
        },
        {
            code: `let mapDispatch = (state) => ({
                someAction: () => state.makeSomeAction()
            })
            
            connect(null, mapDispatch)`,
            errors: [{
                message: "You can`t get reducer from state. Use public api of entity.",
                type: "VariableDeclaration"
            }]
        },
        {
            code: `const mapDispatch = ({ featureB }) => ({
                someAction: () => featureB.makeSomeAction()
            })
            
            const enhance = connect(null, mapDispatch)`,
            errors: [{
                message: "You can`t get reducer from state. Use public api of entity.",
                type: "VariableDeclaration"
            }]
        },
        {
            code: `const randomName = ({ featureB }) => ({
                someAction: () => featureB.makeSomeAction()
            })
            
            connect(null, randomName)`,
            errors: [{
                message: "You can`t get reducer from state. Use public api of entity.",
                type: "VariableDeclaration"
            }]
        },
        {
            code: `const mapDispatch = ({ featureA, featureB }) => ({
                someAction: () => featureA.makeSomeAction(),
                anotherAction: () => featureB.makeAnotherAction()
            })
            
            connect(null, mapDispatch)`,
            errors: [{
                message: "You can`t get reducer from state. Use public api of entity.",
                type: "VariableDeclaration"
            }]
        },
        {
            code: `const mapState = (state) => ({
                fromState: state.some.param
            })
            
            const mapDispatch = ({ featureA, featureB }) => ({
                someAction: () => featureA.makeSomeAction(),
                anotherAction: () => featureB.makeAnotherAction()
            })
            
            connect(mapState, mapDispatch)`,
            errors: [{
                message: "You can`t get reducer from state. Use public api of entity.",
                type: "VariableDeclaration"
            },
            {
                message: "You can`t get reducer from state. Use public api of entity.",
                type: "VariableDeclaration"
            }]
        },
        {
            code: `const mapState = ({ featureState }) => ({
                fromState: featureState
            })
            
            const mapDispatch = ({ featureA, featureB }) => ({
                someAction: () => featureA.makeSomeAction(),
                anotherAction: () => featureB.makeAnotherAction()
            })
            
            connect(mapState, mapDispatch)`,
            errors: [{
                message: "You can`t get reducer from state. Use public api of entity.",
                type: "VariableDeclaration"
            },
            {
                message: "You can`t get reducer from state. Use public api of entity.",
                type: "VariableDeclaration"
            }]
        },
        {
            code: `const mapState = ({ featureState }) => ({
                fromState: featureState
            })
            
            connect(mapState, null)`,
            errors: [{
                message: "You can`t get reducer from state. Use public api of entity.",
                type: "VariableDeclaration"
            }]
        }
    ]
});
