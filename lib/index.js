/**
 * @fileoverview This plugin provides a rules for correct using 
 * Feature Driven Architecture
 * @author meetromb
 */
'use strict'

module.exports.rules = {
	'no-direct-use-rematch-state': require('./rules/no-direct-use-rematch-state'),
}

module.exports.configs = {
	recommended: {
		rules: {
			'fda/no-direct-use-rematch-state': 2,
		},
	},
}
