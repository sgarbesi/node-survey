/**
*
* Loads all of the native modules required by the project.
*
* @author Salvatore Garbesi <sal@dolox.com>
* @module bootstrap/native
*
**/
module.exports = !function(global) {
	'use strict';

	// Load the native file system module.
	global.fs = require('fs');

	// URI path parser and manipulation.
	global.path = require('path');
}(global);
