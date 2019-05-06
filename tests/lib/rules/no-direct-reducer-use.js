/**
 * @fileoverview Prohibits direct use of feature reducers
 * @author meetromb
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-direct-reducer-use"),

    RuleTester = require("eslint").RuleTester;

    RuleTester.setDefaultConfig({
        parserOptions: {
          ecmaVersion: 6,
          sourceType: "module"
        }
      });


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();

ruleTester.run("no-direct-reducer-use", rule, {

    valid: [
        `const mapDispatch = (state) => ({
            someAction: () => makeSomeAction(state)
        })
        
        connect(null, mapDispatch)`,
        `const randomName = (state) => ({
            someAction: () => makeSomeAction(state)
        })
        
        connect(null, randomName)`,
        `const mapDispatch = (state) => ({
            someAction: () => makeSomeAction(state)
        })
        
        connect(null, mapDispatch)`,
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
        }
    ]
});
