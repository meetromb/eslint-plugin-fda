/**
 * @fileoverview This plugin provides a rules for correct using FDA
 * @author meetromb
 */
'use strict'

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = {
	'no-direct-reducer-use': require('./rules/no-direct-reducer-use'),
}

module.exports.configs = {
	recommended: {
		rules: {
			'fda/no-direct-reducer-use': 2,
		},
	},
}
