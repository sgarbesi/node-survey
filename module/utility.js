/**
*
* Loads all of the utility libraries required by the project.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module bootstrap/utility
*
**/
module.exports = !function(global) {
	'use strict';

	// Lodash utility library.
	global._ = require('lodash');

	// Async handles functional processing.
	global.async = require('async');

	// Matches files on the system using patterns.
	global.glob = require('glob');
}(global);
